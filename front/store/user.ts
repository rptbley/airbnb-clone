import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { returnUserType } from "../lib/api/types/user";
import { UserState } from "../types/reduxState";


const initialState: UserState = {
    isLogged: false,
    msg: "",
    userInfo: {
        id: 0,
        email: "",
        lastname: "",
        firstname: "",
        birthday: "",
        profileImage: ""
    }
};

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        initUser(state) {
            state = initialState;
            return state;
        },
        setLoggedUser(state, action: PayloadAction<UserState>) {
            state = action.payload;
            return state;
        }
    }
})

export const userActions = { ...user.actions };

export default user;