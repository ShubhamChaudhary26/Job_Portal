import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",  // Slice name (used in actions)
    initialState: {
        loading: false,  // Initial state for authentication
        user:null
        
    },
    reducers: {
        // Action Function to update loading state
        setLoading: (state, action) => {
            // action is an object dispatched by Redux that carries information about what should change.
            // payload contains the new value for loading (passed when dispatching the action).
            state.loading = action.payload  // Updates state with new loading value
        }, 
        SetUser:(state,action) =>{
            state.user = action.payload
        }
    }
});

// Exports setLoading action → Used in components to update loading state.
export const { setLoading , SetUser } = authSlice.actions
// Exports authSlice.reducer → Added to the Redux store.
export default authSlice.reducer 