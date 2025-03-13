import { createSlice } from "@reduxjs/toolkit";


const ApplicationSlice = createSlice({
    name: "application",
    initialState: {
        Applicant: []
    },
    reducers: {
        SetAllApplicant: (state, action) => {
            state.Applicant = action.payload
        }
    }
})
export const { SetAllApplicant } = ApplicationSlice.actions
export default ApplicationSlice.reducer