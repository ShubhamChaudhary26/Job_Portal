import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetAllApplicant } from "@/redux/applicationSlice";

const Applicants = () => {
  const param = useParams()
  const paramID = param.id
  const dispatch = useDispatch()
  const {Applicant} = useSelector(store=>store.application)
  useEffect(()=>{
    const fetchAllApplicants = async()=>{
      try {
        const res =await axios.get(`${APPLICATION_API_END_POINT}/${paramID}/applicants` , {withCredentials: true} )
        
        if(res.data.success){
        dispatch(SetAllApplicant(res.data.job))
        }
        
      } catch (error) {
        console.log(error)      
      }
    }
    fetchAllApplicants()
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
      <h1 className='font-bold text-xl my-5'>Applications {Applicant?.applications.length || 0 }</h1>
        <ApplicantsTable/>
      </div>
    </div>
  );
};

export default Applicants;
