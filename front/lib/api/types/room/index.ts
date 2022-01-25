import { RegisterRoomState } from "../../../../store/registerRoom";


export type StoredRoomType = {
    hostId: number;
    roomInfo: RegisterRoomState;
    createdAt: Date;
    updatedAt?: Date;
}