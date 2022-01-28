import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorState } from "../types/reduxState";


const initialState: ErrorState = {
    error: ""
}

const error = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    }
})

export const errrorActions = { ...error.actions };

export default error;