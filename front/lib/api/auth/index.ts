import axios from ".."
import { UserState } from "../../../types/reduxState"


export const meAPI = async () => {
    return axios.get<UserState>("/user/me");
}

export const logoutAPI = async () => {
    return await axios.delete("/user/logout");
}