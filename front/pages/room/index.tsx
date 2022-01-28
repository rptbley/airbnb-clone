import { NextPage } from "next";
import RoomMain from "../../components/room/main/RoomMain";
import { getRoomList } from "../../lib/api/room";
import { SearchParam } from "../../lib/api/types/room";
import { wrapper } from "../../store";
import { errrorActions } from "../../store/errors";
import { roomActions } from "../../store/room";


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