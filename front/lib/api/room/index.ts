import axios from "..";
import { StoredRoomType } from "../types/room";


export const addRoom = async (param: StoredRoomType) => {
    return axios.post("/register/registerRoom", param);
}