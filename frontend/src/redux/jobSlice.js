import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminjobs:[],
        singleJob:null,
        searchJobByText : "",
        allAppliedJobs: [],
        searchQuerytext:""
    },
    reducers:{
        //Actions Functions
        SetAlljobs:(state,action)=>{
            state.allJobs = action.payload

        },
        SetSingleJob: (state,action)=>{
            state.singleJob = action.payload
        },
        SetAllAdminjobs:(state,action)=>{
            state.allAdminjobs = action.payload
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText = action.payload
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs = action.payload
        },
        setSearchQueryText:(state,action)=>{
            state.searchQuerytext = action.payload
        }
    }
})
export const {SetAlljobs,SetSingleJob ,SetAllAdminjobs, setSearchJobByText , setAllAppliedJobs, setSearchQueryText } = jobSlice.actions
export default jobSlice.reducer 