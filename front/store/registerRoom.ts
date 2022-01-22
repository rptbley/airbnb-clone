import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GetLocationInfo } from "../lib/api/types/map";
import { BedType } from "../types/room";


type RegisterRoomState = {
    largeBuildingType: string | null;
    buildingType: string | null;
    roomType: string | null;
    isSetUpForGuest: boolean | null;
    maximumGuestCount: number;
    bedroomCount: number;
    bedCount: number;
    bedList: {
        id: number;
        beds: {
            type: BedType;
            count: number;
        }[]
    }[];
    publicBedList: {
        type: BedType;
        count: number;
    }[];
    bathroomCount: number;
    bathroomType: "private" | "public" | null;
    location: {
        country: string;
        city: string;
        district: string;
        streetAddress: string;
        detailAddress: string;
        postcode: string;
        latitude: number;
        longitude: number;
    }
    amentities: string[];
    conveniences: string[];
    photos: string[];
}

const initialState: RegisterRoomState = {
    largeBuildingType: null,
    buildingType: null,
    roomType: null,
    isSetUpForGuest: null,
    maximumGuestCount: 0,
    bedroomCount: 0,
    bedCount: 0,
    bedList: [],
    publicBedList: [],
    bathroomCount: 0,
    bathroomType: null,
    location: {
        country: "",
        city: "",
        district: "",
        streetAddress: "",
        detailAddress: "",
        postcode: "",
        latitude: 0,
        longitude: 0
    },
    amentities: [],
    conveniences: [],
    photos: []
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
        },
        setMaximumGuestCount(state, action: PayloadAction<number>) {
            state.maximumGuestCount = action.payload
        },
        setBedroomCount(state, action: PayloadAction<number>) {
            const bedroomCount = action.payload;
            let { bedList } = state;

            state.bedroomCount = bedroomCount;

            if(bedroomCount < bedList.length) {
                bedList = state.bedList.slice(0, bedroomCount);
            } else {
                for(let i = bedList.length + 1; i < bedroomCount + 1; i += 1) {
                    bedList.push({ id: i, beds: [] });
                }
            }

            state.bedList = bedList;

            return state;
        },
        setBedCount(state, action: PayloadAction<number>) {
            state.bedCount = action.payload;
        },
        setBedTypeCount(
            state,
            action: PayloadAction<{ bedroomId: number; type: BedType; count: number}>
        ) {
            const { bedroomId, type, count } = action.payload;
            const bedroom = state.bedList[bedroomId - 1];
            const prevBeds = bedroom.beds;
            const index = prevBeds.findIndex((bed) => bed.type === type);
            if(index === -1) {
                state.bedList[bedroomId - 1].beds = [ ...prevBeds, { type, count }];
                return state;
            }

            if(index === 0) {
                state.bedList[bedroomId - 1].beds.splice(index, 1);
            } else {
                state.bedList[bedroomId - 1].beds[index].count = count;
            }
            return state;
        },
        setPublicBedTypeCount(
            state,
            action: PayloadAction<{ type: BedType; count: number; }>
        ) {
            const { type, count } = action.payload;

            const index = state.publicBedList.findIndex((bed) => bed.type === type);
            if(index === -1) {
                state.publicBedList = [ ...state.publicBedList, { type, count }];
                return state;
            }

            if(count === 0) {
                state.publicBedList.splice(index, 1);
            } else {
                state.publicBedList[index].count = count;
            }
            return state;
        },
        setBathroomCount(state, action: PayloadAction<number>) {
            state.bathroomCount = action.payload;
        },
        setBathroomType(state, action: PayloadAction<"private" | "public">) {
            state.bathroomType = action.payload;
        },
        setCountry(state, action: PayloadAction<string>) {
            state.location.country = action.payload
        },
        setCity(state, action: PayloadAction<string>) {
            state.location.city = action.payload
        },
        setDistrict(state, action: PayloadAction<string>) {
            state.location.district = action.payload
        },
        setStreetAddress(state, action: PayloadAction<string>) {
            state.location.streetAddress = action.payload
        },
        setDetailAddress(state, action: PayloadAction<string>) {
            state.location.detailAddress = action.payload
        },
        setPostcode(state, action: PayloadAction<string>) {
            state.location.postcode = action.payload
        },
        setLatitude(state, action: PayloadAction<number>) {
            state.location.latitude = action.payload
        },
        setLongitude(state, action: PayloadAction<number>) {
            state.location.longitude = action.payload
        },
        setLocation(state, action: PayloadAction<GetLocationInfo>) {
            state.location = action.payload
        },
        setAmentities(state, action: PayloadAction<string[]>) {
            state.amentities = action.payload;
        },
        setConveniences(state, action: PayloadAction<string[]>) {
            state.conveniences = action.payload;
        },
        setPhotos(state, action: PayloadAction<string[]>) {
            state.photos = action.payload
        }
    }
})

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;