import axios from "..";
import { SearchParam, StoredReservationParam, StoredRoomType } from "../types/room";


export const addRoom = async (param: StoredRoomType) => {
    return axios.post("/register/registerRoom", param);
}

export const getRoomList = async (param: SearchParam) => {
    return axios.post("/room/roomList", param);
}

export const getRoomDetail = async (param: number) => {
    return axios.get(`/room/detailRoom?roomNo=${param}`);
}

export const getReservation = async (param: StoredReservationParam) => {
    return axios.post("/room/reservation", param);
}