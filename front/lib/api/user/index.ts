import { UserState } from "../../../types/reduxState";
import axios from "../index";
import { loginUserType, StoredUserType } from "../types/user";

export const resgisterUser = async (param: StoredUserType) => {
    return await axios.post<UserState>("/user/register", param)
}

export const loginUser = async (param: loginUserType) => {
    return await axios.post<UserState>("/user/login", param);
}