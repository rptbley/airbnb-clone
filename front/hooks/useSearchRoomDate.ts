import { useDispatch } from "react-redux";
import { useSelector } from "../store"
import { searchRoomActions } from "../store/searchRoom";


const useSearchRoomDate = () => {
    const checkInDate = useSelector(state => state.searchRoom.checkInDate);
    const checkOutDate = useSelector(state => state.searchRoom.checkOutDate);

    const dispatch = useDispatch();

    const setCheckInDateDispatch = (date: Date | null) => {
        if(date) {
            dispatch(searchRoomActions.setStartDate(date.toISOString()));
        } else {
            dispatch(searchRoomActions.setStartDate(null))
        }
    }

    const setCheckOutDateDispatch = (date: Date | null) => {
        if(date) {
            dispatch(searchRoomActions.setEndDate(date.toISOString()));
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