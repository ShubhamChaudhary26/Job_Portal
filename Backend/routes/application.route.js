import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { applyJobs, getApplicants, getAppliedJob, UpdateStatus } from "../controllers/application.controller.js"


const router = express.Router()

router.route("/apply/:id").get(isAuthenticated,applyJobs)
router.route("/get").get(isAuthenticated,getAppliedJob)
router.route("/:id/applicants").get(isAuthenticated,getApplicants)
router.route("/status/:id/update").post(isAuthenticated,UpdateStatus)



export default router