import { NextPage } from "next";
import RoomDetail from "../../components/room/detail/RoomDetail";
import { getRoomDetail } from "../../lib/api/room";
import { wrapper } from "../../store";
import { roomActions } from "../../store/room";


const roomDetail: NextPage = () => {
    return (
        <RoomDetail/>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }): Promise<any> => {
    const { id } = query;

    try {
        if(id) {
            const { data } = await getRoomDetail(Number(id));
            store.dispatch(roomActions.setDetail(data));
        }
    } catch (e) {
        console.log(e)
    }

    return {};
})

export default roomDetail;