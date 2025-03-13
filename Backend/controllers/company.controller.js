import {Company} from "../models/company.model.js"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyname } = req.body;
        
        if (!companyname) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyname });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyname,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async (req, res) => {
    try {
       const  userId = req.id //logged in User ID
        const companies = await Company.find({ userId })
        if (!companies) {
            return res.status(404).json({
                message: "Companies Not Found.",
                success: false
            })
        }
        
        return res.status(200).json({
            companies,
            success:true
        })

    } catch (error) {
        console.log(error);
    }

}

//get Comapny By ID
export const GetCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if (!company) {
            return res.status(400).json({
                message: "Company Not Found",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true,
        })


    } catch (error) {
        console.log(error);
    }
}

//Update Karna ho to Company
export const updateCompany =async (req, res) => {
    try {
        const { name, description, website, location } = req.body
        const file = req.file;
        //Idher Couldinary vala logic aaayega 
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;


        const UpdateData = { name, description, website, location ,logo}
        const company =await Company.findByIdAndUpdate(req.params.id, UpdateData, { new: true })

        if(!company){
            res.status(404).json({
                message:"company Not Found",
                success:false
            })
        }
        res.status(200).json({
            message:"Company information Updated Successfully",
            success:true
        })


    } catch (error) {
        console.log(error)
    }
}