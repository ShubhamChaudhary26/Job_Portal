import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"

export const applyJobs = async (req, res) => {
    try {
        const userId = req.id
        const jobId = req.params.id
        if (!jobId) {
            return res.status(401).json({
                message: "Not Found",
                success: false
            })
        }
        //userID jo hame Authentication ke bad mil raha he aur jobId jo hame milega paramiters ke through
        const existingAplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existingAplication) {
            return res.status(400).json({
                message: "Already Applied For this Role",
                success: false
            })
        }
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(400).json({
                message:"Job Not Found",
                success:true
            })
        }
        //create New Job
        const NewApplication = await Application.create({
            job:jobId,
            applicant:userId
        })
        
        job.applications.push(NewApplication._id)
        await job.save()
        return res.status(200).json({
            message:"Job Applied Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAppliedJob = async (req,res) =>{
    try {
        const userId = req.id
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            // Job ke ander company ko find kar rahe he 
            populate:{
                path:"company",
                option:{sort:{createdAt:-1}}
            }
        })   
        if(!application){
            return res.status(400).json({
                message:"Not Application",
                success:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}

// Kitne logo ne Apply Kiya he vo dekhne ke liye
export const  getApplicants = async(req,res)=>{
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path:"applications",
            // Sorts the populated application documents by createdAt in descending order (newest first).
            options:{sort:{createdAt:-1}},
            // populate kar raha he q ki sirf id dikhayega nahi kiya 
            // populate ke baje se data dikhayega pura
            populate:{
                path:"applicant"
            }
        })
        if(!job){
            return res.status(404).json({
                message:"Job Not Found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
            })
        
    } catch (error) {
        console.log(error);        
    }
}

export const UpdateStatus =async (req,res)=>{
    try {
        // Status Janne ke liye Exact Id janna padega tab ham status ko update kar denge 
        const status = req.body.status
        const applicantId = req.params.id
        if(!status){
        return res.status(400).json({
            message:"Status is Required",
            success:false
        })}
        //Find the appplication by applicant iD
        const application = await Application.findOne({_id:applicantId})
        if(!application){
            return res.status(404).json({
                messsage:"Application not found",
                succes:false
            })
        }
        //update the status
        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message:"Status Updated Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}