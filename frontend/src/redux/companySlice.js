import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies:[],
        searchCompanyByText:""
    },
    reducers: {
        //Actions Functions
        SetSingleCompany: (state, action) => {
            state.singleCompany = action.payload
        },
        SetCompanies:(state,action)=>{
            state.companies = action.payload
        },
        setsearchCompanyByText:(state,action)=>{
            state.searchCompanyByText = action.payload
        }
    }
})
export const { SetSingleCompany, SetCompanies , setsearchCompanyByText } = companySlice.actions
export default companySlice.reducer 