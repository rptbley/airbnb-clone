import { createSlice, PayloadAction } from "@reduxjs/toolkit"


type RegisterRoomState = {
    largeBuildingType: string | null;
    buildingType: string | null;
    roomType: string | null;
    isSetUpForGuest: boolean | null;
}

const initialState: RegisterRoomState = {
    largeBuildingType: null,
    buildingType: null,
    roomType: null,
    isSetUpForGuest: null
}


const registerRoom = createSlice({
    name: "registerRoom",
    initialState,
    reducers: {
        setLargeBuildingType(state, action: PayloadAction<string>) {
            state.largeBuildingType = action.payload;
        },
        setBuildingType(state, action: PayloadAction<string>) {
            if(action.payload === "") {
                state.buildingType = null;
                return state;
            }
            state.buildingType = action.payload;
        },
        setRoomType(state, action: PayloadAction<"entire" | "private" | "public">) {
            state.roomType = action.payload;
        },
        setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
            state.isSetUpForGuest = action.payload;
        }
    }
})

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;