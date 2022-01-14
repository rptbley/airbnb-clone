import { UserState } from "../../../types/reduxState";
import axios from "../index";
import { StoredUserType } from "../types/user";

export const resgisterUser = async (param: StoredUserType) => {
    return await axios.post<UserState>("/user/register", param)
}