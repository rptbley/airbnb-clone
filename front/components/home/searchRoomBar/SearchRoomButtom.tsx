import Link from "next/link"
import { makeQueryString } from "../../../lib/utils"
import { useSelector } from "../../../store"
import Button from "../../common/Button"
import CustomImage from "../../image/CustomImage"


const SearchRoomButton: React.FC = () => {
    const searchRoom = useSelector(state => state.searchRoom);

    const roomListHref = makeQueryString("/room", searchRoom);

    return (
        <Link href={roomListHref}>
            <a>
                <Button
                    icon={<CustomImage src="/search/white_search.svg"/>}
                    color="amaranth"
                    width="89px"
                >
                    검색
                </Button>
            </a>
        </Link>
    )
}

export default SearchRoomButton;