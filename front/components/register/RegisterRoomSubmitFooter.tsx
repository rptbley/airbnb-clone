import Link from "next/link";
import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Button from "../common/Button";
import CustomImage from "../image/CustomImage";
import {addRoom} from "../../lib/api/room/index";
import { useSelector } from "../../store";
import { StoredRoomType } from "../../lib/api/types/room";


const Container = styled.footer`
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 548px;
    height: 82px;
    padding: 14px 30px 20px;
    background-color: white;
    z-index: 10;
    border-top: 1px solid ${palette.gray_dd};

    .register-room-footer-back {
        display: flex;
        align-items: center;
        color: ${palette.dark_cyan};
        cursor: pointer;
        .image-wrapper {
            margin-right: 8px;
        }
    }
`;

const RegisterRoomSubmitFooter: React.FC = () => {
    const room = useSelector(state => state.registerRoom);
    const userId = useSelector(state => state.user.userInfo.id);


    const onClickReigsterRoom = async () => {
        const param: StoredRoomType = {
            roomInfo: room,
            hostId: userId,
            createdAt: new Date()
        }
        const {data} = await addRoom(param);
        if(data && data.msg) {
            alert(data.msg)
        }
    };

    return (
        <Container>
            <Link href="/room/register/date">
                <a className="register-room-footer-back">
                    <CustomImage src="/register/register_room_back_arrow.svg" subClassName="image-wrapper"/>
                    뒤로
                </a>
            </Link>
            <Button
                onClick={onClickReigsterRoom}
                color="bittersweet"
                width="102px"
            >
                등록하기
            </Button>
        </Container>
    )
}

export default RegisterRoomSubmitFooter;