import { RoomType } from "../lib/api/types/room"
import { returnUserType } from "../lib/api/types/user"

export type UserState = {
    isLogged: boolean;
    msg: string;
    userInfo: returnUserType;
}

export type CommonState = {
    validateMode: boolean;
}

export type SearchRoomState = {
    location: string;
    latitude: number;
    longitude: number;
    checkInDate: string | null;
    checkOutDate: string | null;
    adultCount: number;
    childrenCount: number;
    infantsCount: number;
    limit: number;
    page: number;
}

export type RoomState = {
    rooms: RoomType[];
}

export type ErrorState = {
    error?: string;
}