import { SetCompanies } from "@/redux/companySlice";
import {  SINGLECOMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
   useEffect(() => {
    const FetchCompanies = async () => {
        try {
          const res = await axios.get(`${SINGLECOMPANY_API_END_POINT}/get`, { withCredentials: true });
          if (res.data.success) {
            dispatch(SetCompanies(res.data.companies));
          }
        } catch (error) {
          console.log(error);
        }
      };
    FetchCompanies();
  },[]);
};

export default useGetAllCompanies;
