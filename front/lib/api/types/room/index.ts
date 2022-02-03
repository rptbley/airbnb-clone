import { RegisterRoomState } from "../../../../store/registerRoom";
import { SearchRoomState } from "../../../../types/reduxState";
import { returnUserType } from "../user";


export type StoredRoomType = {
    hostId: number;
    roomInfo: RegisterRoomState;
    createdAt: Date;
    updatedAt?: Date;
}

export type RoomType = {
    no: number;
    hostid: number;
    host: returnUserType;
    roominfo: RegisterRoomState;
    createdAt?: Date;
    updatedAt?: Date;
}

export type SearchParam = {
    location?: string | string[];
    latitude?: string | string[];
    longitude?: string | string[];
    checkInDate?: string | string[];
    checkOutDate?: string | string[];
    adultCount?: string | string[];
    childrenCount?: string | string[];
    infantsCount?: string | string[];
    limit?: number;
    page: number;
}

export type StoredReservationParam = {
    userId: number;
    roomId: number;
    checkInDate: string;
    checkOutDate: string;
    adultCount: number;
    childrenCount: number;
    infantsCount: number;
}