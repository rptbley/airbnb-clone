import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchRoomState } from "../types/reduxState";


const initialState: SearchRoomState = {
    location: '',
    latitude: 0,
    longitude: 0,
    checkInDate: null,
    checkOutDate: null,
    adultCount: 0,
    childrenCount: 0,
    infantsCount: 0,
    limit: 20,
    page: 0
};

const searchRoom = createSlice({
    name: "searchRoom",
    initialState,
    reducers: {
        setLocation(state, action: PayloadAction<string>) {
            state.location = action.payload;
        },
        setStartDate(state, action: PayloadAction<string | null>) {
            state.checkInDate = action.payload;
        },
        setEndDate(state, action: PayloadAction<string | null>) {
            state.checkOutDate = action.payload;
        },
        setAdultCount(state, action: PayloadAction<number>) {
            state.adultCount = action.payload;
        },
        setChildCount(state, action: PayloadAction<number>) {
            state.childrenCount = action.payload;
        },
        setInfantsCount(state, action: PayloadAction<number>) {
            state.infantsCount = action.payload;
        },
        setLatitude(state, action: PayloadAction<number>) {
            state.latitude = action.payload;
        },
        setLongitude(state, action: PayloadAction<number>) {
            state.longitude = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        }
    }
})

export const searchRoomActions = { ...searchRoom.actions };

export default searchRoom;