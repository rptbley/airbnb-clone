import { useDispatch } from "react-redux";
import { useSelector } from "../store"
import { searchRoomActions } from "../store/searchRoom";
import moment from "moment";


const useSearchRoomDate = () => {
    const checkInDate = useSelector(state => state.searchRoom.checkInDate);
    const checkOutDate = useSelector(state => state.searchRoom.checkOutDate);

    const dispatch = useDispatch();

    const setCheckInDateDispatch = (date: Date | null) => {
        if(date) {
            dispatch(searchRoomActions.setStartDate(moment(date).format("YYYY-MM-DD")));
        } else {
            dispatch(searchRoomActions.setStartDate(null))
        }
    }

    const setCheckOutDateDispatch = (date: Date | null) => {
        if(date) {
            dispatch(searchRoomActions.setEndDate(moment(date).format("YYYY-MM-DD")));
        } else {
            dispatch(searchRoomActions.setEndDate(null));
        }
    }

    return {
        checkInDate: checkInDate ? new Date(checkInDate) : null,
        checkOutDate: checkOutDate ? new Date(checkOutDate) : null,
        setCheckInDateDispatch,
        setCheckOutDateDispatch
    }
}

export default useSearchRoomDate;