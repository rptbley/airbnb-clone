import { NextPage } from "next";
import RoomMain from "../../components/room/main/RoomMain";
import { getRoomList } from "../../lib/api/room";
import { SearchParam } from "../../lib/api/types/room";
import { wrapper } from "../../store";
import { errrorActions } from "../../store/errors";
import { roomActions } from "../../store/room";
import { searchRoomActions } from "../../store/searchRoom";
import { SearchRoomState } from "../../types/reduxState";
import moment from "moment";


const index: NextPage = () => {
    return <RoomMain/>
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query, req}): Promise<any> => {
    const page: number = store.getState().searchRoom.page;
    const param: SearchParam = {
        ...query,
        limit: Number(query.limit),
        page
    }

    const SearchParam: SearchRoomState = {
        adultCount: Number(query.adultCount ? query.adultCount : 0),
        childrenCount: Number(query.childrenCount ? query.childrenCount : 0),
        infantsCount: Number(query.infantsCount ? query.infantsCount : 0),
        checkInDate: moment(query.checkInDate).format("YYYY-MM-DD"),
        checkOutDate: moment(query.checkOutDate).format("YYYY-MM-DD"),
        location: query.location ? (query.location).toString() : "",
        latitude: Number(query.latitude ? query.latitude : 0),
        longitude: Number(query.longitude ? query.longitude : 0),
        limit: Number(query.limit),
        page
    }

    store.dispatch(searchRoomActions.setAll(SearchParam));

    try {
        const {data} = await getRoomList(param);
        if(data.msg) {
            store.dispatch(errrorActions.setError(data.msg));
        } else {
            store.dispatch(roomActions.setRooms(data));
        }
    } catch (e) {
        console.log(e)
    }

    return {};
})

export default index;