import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomType } from "../lib/api/types/room";
import { RoomState } from "../types/reduxState";


const initialState: RoomState = {
    rooms: []
}

const room = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRooms(state, action: PayloadAction<RoomType[]>) {
            state.rooms = action.payload;
        }
    }
})

export const roomActions = { ...room.actions };

export default room;