import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body
        
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            })
        }

                //Cloudinary aayega iDher 
                const file = req.file;
                const fileUri = getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User Already Exits with this email.",
                success: false,
            })
        }
        const HashPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: HashPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        })
        return res.status(201).json({
            message: "Account Created Successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        // Check Karega Kuch Chut to nahi gaya he
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something Is Missing",
                success: false
            })
        }
        //Check Karega Email sahi he ya nahi
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password",
                success: false
            })
        }
        //Check karega Password Sahi he ya nahi
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return res.status(401).json({
                message: "Invalid Email or Password",
                success: false
            })
        }
        //Check Karega Role sahi he ya nahi
        
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account Dosen't Exist With Current Role.",
                success: false
            })
        }
        //Token Bana Rahe he 
        // Stores userId in the token payload.
        const tokenData = {
            userId: user._id
        }
        // Id De rahe he jo JWT ke through 1 din me expire ho jayega
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" })

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile:user.profile,
            resume:user.profile.resume
        }

        // Cookie Bana raha he 1 din me expire ho jayega 
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: "strict" }).json({
            message: `Welcome Back ${user.fullname}`,
            user,
            success: true
        })



    } catch (error) {
        console.log(error);

    }

}

export const logout = async (req,res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })

    } catch (error) {
        console.log(error);


    }
}

export const updateprofile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body
        
        //Cloudinary aayega iDher 
        const file = req.file
        if (!file) {
            return res.status(400).json({ message: "File is missing", success: false });
        }
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",")
        }
        const userId = req.id //MiddleWare Athentication
        let user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                message: "User Not Authenticated",
                success: false
            })
        }
        // Update Kar rahe he Data Ko 
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        
        // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }
        
        await user.save()
        //user ko Update Karne ke bad 

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: "Profile Updated Successfully.",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
        // console.log(error(error.response.data.message))

    }
}