import axios from "axios"
import axios2 from '..';
import { GetLocationInfo, location } from "../types/map"

export const getLocation = async (param: location) => {
    try {
        const {data} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${param.latitude},${param.longitude}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`)

        const addressComponent = data.results[0].address_components;
        const { lat, lng} = data.results[0].geometry.location;
        const result: GetLocationInfo = {
            latitude: lat,
            longitude: lng,
            country: addressComponent[4].long_name,
            city: addressComponent[3].long_name,
            district: addressComponent[2].long_name,
            streetAddress: `${addressComponent[1].long_name}${addressComponent[0].long_name}`,
            detailAddress: '',
            postcode: addressComponent[5].long_name
        }

        return result;
    } catch(err) {
        console.log(err);
        const result: GetLocationInfo = {
            latitude: 0,
            longitude: 0,
            country: "",
            city: "",
            district: "",
            streetAddress: "",
            detailAddress: "",
            postcode: ""
        }
        return result;
    }
}

export const getLocationInfo = async (param: string) => {
    return axios2.get(`/place/getInfo?keyword=${encodeURI(param)}`);
}

export const getLocationInfoByPlaceId = async (param: string) => {
    return axios2.get(`/place/getInfoByPlaceId?placeId=${param}`);
}