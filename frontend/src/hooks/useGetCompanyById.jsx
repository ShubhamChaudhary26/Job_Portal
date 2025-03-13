import { SetSingleCompany } from "@/redux/companySlice";
import {  SINGLECOMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyID) => {
  const dispatch = useDispatch();
   useEffect(() => {
    const FetchSingleCompany = async () => {
        try {
          const res = await axios.get(`${SINGLECOMPANY_API_END_POINT}/get/${companyID}`, { withCredentials: true });
          if (res.data.success) {
            dispatch(SetSingleCompany(res.data.company));
          }
        } catch (error) {
          console.log(error);
        }
      };
    FetchSingleCompany();
  },[companyID, dispatch]);
};

export default useGetCompanyById;
