import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is Missing ",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLeval: experience,
            position,
            company: companyId,
            created_by: userId
        })
        return res.status(200).json({
            message: "New Job Created successfully",
            job,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// Student Jobs
export const GetAllJobs = async (req, res) => {
    try {
        const userId = req.id

        //Keyword ko le lenge aur uske uper se Filter Karenge 
        // req.query.keyword: Gets the keyword from the query string (e.g., ?keyword=developer).
        const keyword = req.query.keyword || ""
        const query = {
            // Using $or, we make the search:
            // ✅ Flexible (matches either title or description).
            $or: [
                // $regex: keyword → Uses Regular Expressions (Regex) to match partial words.
                // $options: "i" → Makes the search case-insensitive.
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }
        // The populate method is used to replace the ObjectId of the company field with the actual company details from the related Company collection
        const jobs = await Job.find(query).populate({
            path: "company"
        // This sorts the results based on the createdAt field in descending order (-1 means newest first).
        }).sort({ createdAt: -1 })

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not Found",
                success: false
            })
        }
        return res.status(200).json({
            // message: "Job created successfully",
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// Student Jobs
export const GetjobById = async (req, res) => {
    try {
        const JobId = req.params.id
        const job = await Job.findById(JobId).populate({
            path:"applications"
        })
        if (!job) {
            return res.status(401).json({
                message: "Jobs Not Found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })

    } catch (error) {
        console.log(error);


    }
}

// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id
        //Populate ke baje se hamko company ki sari details mil jayegi
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:"company",
            createdAt:-1
        })
                
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs Not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
        
    } catch (error) {
        console.log(error);
    }
}