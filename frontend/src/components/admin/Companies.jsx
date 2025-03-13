import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setsearchCompanyByText } from "@/redux/companySlice";
import { useDispatch } from "react-redux";

const Companies = () => {
  useGetAllCompanies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, SetInput] = useState();
  useEffect(() => {
    dispatch(setsearchCompanyByText(input));
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
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </>
  );
};

export default Companies;
