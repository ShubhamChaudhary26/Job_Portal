import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminjobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const Companies = () => {
  useGetAllAdminjobs()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, SetInput] = useState();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => SetInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </>
  );
};

export default Companies;
