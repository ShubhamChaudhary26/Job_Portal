import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

// const CompanyArray = [];

const PostJob = () => {
  const [input, setinput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
//   const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const selectChangeHandler = (value) => {
    const SelectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setinput({ ...input, companyId: SelectedCompany._id });
  };
  const submitHandler =async (e) => {
    e.preventDefault();
       try {
        setLoading(true)        
        const res = await axios.post(`${JOB_API_END_POINT}/post` , input,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        } )
        if(res.data.success){
            toast.success(res.data.message)
            navigate('/admin/jobs')
            // dispatch()
        }

       } catch (error) {
        console.log(error)        
        toast.error(error.response.data.message)
       }finally{
        setLoading(false)
       }

  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-6">
        <form
          onSubmit={submitHandler}
          className="p-12 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>title</Label>
              <Input
                name="title"
                type="text"
                onChange={changeEventHandler}
                value={input.title}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>description</Label>
              <Input
                name="description"
                type="text"
                onChange={changeEventHandler}
                value={input.description}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>requirements</Label>
              <Input
                name="requirements"
                type="text"
                onChange={changeEventHandler}
                value={input.requirements}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>salary</Label>
              <Input
                name="salary"
                type="text"
                onChange={changeEventHandler}
                value={input.salary}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>location</Label>
              <Input
                name="location"
                type="text"
                onChange={changeEventHandler}
                value={input.location}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>jobType</Label>
              <Input
                name="jobType"
                type="text"
                onChange={changeEventHandler}
                value={input.jobType}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>experience</Label>
              <Input
                name="experience"
                type="text"
                onChange={changeEventHandler}
                value={input.experience}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>position</Label>
              <Input
                name="position"
                type="number"
                onChange={changeEventHandler}
                value={input.position}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem value={company?.name?.toLowerCase()}>
                          {company?.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please Register Company before Posting a Job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
