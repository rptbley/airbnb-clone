import { useEffect, useState } from "react";
import CustomImage from "../../image/CustomImage";


interface IProps {
    amentity: string;
}

const RoomAmentityIcon: React.FC<IProps> = ({ amentity }) => {
    const [icon, setIcon] = useState(amentity);

    useEffect(() => {
        switch(icon) {
            case "TV":
                return setIcon("tv");
            case "무선 인터넷":
                return setIcon("wifi");
            case "난방":
                return setIcon('thermometer');
            case "에어컨":
                return setIcon("ice");
            case "다리미":
                return setIcon("iron");
            case "샴푸":
                return setIcon("shampoo");
            case "헤어 드라이어":
                return setIcon("hair-dryer");
            case "조식, 커피, 차":
                return setIcon("coffee");
            case "업무 가능 공간/책상":
                return setIcon("notebook");
            case "벽난로":
                return setIcon("fireplace");
            case "옷장/서랍장":
                return setIcon("closet");
            case "게스트 전용 출입문":
                return setIcon("door");
            default:
                return setIcon("");
        }
    }, [])
    return (
        <CustomImage subClassName="svg" src={`/room/detail/${icon}.svg`}/>
    )
}

export default RoomAmentityIcon;