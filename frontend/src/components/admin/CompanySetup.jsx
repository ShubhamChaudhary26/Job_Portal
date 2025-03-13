import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { SINGLECOMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const param = useParams();
  const ParamId = param.id;
  useGetCompanyById(ParamId)
  const {singleCompany} = useSelector(store=>store.company)
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();
  const [input, SetInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const changeEventHandler = (e) => {
    SetInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    SetInput({ ...input, file });
  };
  const SubmitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      SetLoading(true);
      const res =await axios.put(
        `${SINGLECOMPANY_API_END_POINT}/update/${ParamId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      SetLoading(false);
    }
  };
  useEffect(()=>{
    SetInput({
        name: singleCompany.name || "",
        description : singleCompany.description || "",
        website:singleCompany.website || "",
        location:singleCompany.location || "",
        file:singleCompany.file || null
    })
  },[singleCompany])

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={SubmitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              variant="outline"
              onClick={()=> navigate("/admin/companies")}
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span  >Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                placeholder="Enter Your Company Name"
                type="text"
                name="name"
                onChange={changeEventHandler}
                value={input.name}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                placeholder="Enter Your description "
                type="text"
                name="description"
                onChange={changeEventHandler}
                value={input.description}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                placeholder="Enter Your Website Name"
                type="text"
                name="website"
                onChange={changeEventHandler}
                value={input.website}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                placeholder="Enter Your Location"
                type="text"
                name="location"
                onChange={changeEventHandler}
                value={input.location}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
