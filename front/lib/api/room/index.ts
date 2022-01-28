import axios from "..";
import { RoomType, SearchParam, StoredRoomType } from "../types/room";


export const addRoom = async (param: StoredRoomType) => {
    return axios.post("/register/registerRoom", param);
}

export const getRoomList = async (param: SearchParam) => {
    return axios.post("/room/roomList", param);
}