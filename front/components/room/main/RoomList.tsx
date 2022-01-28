import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "../../../store";
import RoomCard from "./RoomCard";


const Container = styled.ul<{ showMap: boolean }>`
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    width: 100%;

    ${({ showMap }) =>
        showMap && css`
            flex-direction: column;
        `
    }
`;

interface IProps {
    showMap: boolean;
}

const RoomList: React.FC<IProps> = ({ showMap }) => {
    const rooms = useSelector(state => state.room.rooms);
    const err = useSelector(state => state.error.error);

    const [roomChk, setRoomChk] = useState(false);

    useEffect(() => {
        if(!err) {
            setRoomChk(true);
        }
    }, [rooms])

    return (
        <Container showMap={showMap}>
            {roomChk && rooms.map((room) => (
                <RoomCard room={room} key={room.no} showMap={showMap}/>
            ))}
            {!roomChk && (
                <div>{err}</div>
            )}
        </Container>
    )
}

export default RoomList;