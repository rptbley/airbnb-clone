import React from "react";
import styled from "styled-components";
import { useSelector } from "../../../store";
import CustomImage from "../../image/CustomImage";


const Container = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 50%;
    border-radius: 12px;
    overflow: hidden:
    display: flex;
    max-height: 465px;
    margin-bottom: 48px;

    .room-detail-one-photo {
        .img {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
    }

    .room-detail-photos-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
    }

    .room-detail-three-photos-first {
        position: relative;
        margin-right: 8px;
        width: 66.66%;
        .img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .room-detail-three-photos-second {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        width: 33.33%;
        .img {
            height: calc((100% - 8px) / 2);
        }
    }

    .room-detail-five-photos-first {
        position: relative;
        margin-right: 8px;
        width: 50%;
        .img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .room-detail-five-photos-second {
        position: relative;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-wrap: wrap;
        .img {
            width: calc((100% - 8px) / 2);
            height: calc((100% - 8px) / 2);
            &:first-child {
                margin-right: 8px;
            }
        }
    }
`;

const RoomDetailPhotos: React.FC = () => {
    const roomTitle = useSelector(state => state.room.detail?.roominfo.title);
    const photos = useSelector(state => state.room.detail?.roominfo.photos);

    if(!photos) {
        return null;
    }

    if(photos.length === 1) {
        return (
            <Container>
                <div className="room-detail-one-photo">
                    <CustomImage type="img" subClassName="img" src={`/${photos[0]}.jpg`} alt={roomTitle}/>
                </div>
            </Container>
        )
    }

    if(photos.length <= 4) {
        return (
            <Container>
                <div className="room-detail-photos-wrapper">
                    <div className="room-detail-three-photos-first">
                        <CustomImage type="img" subClassName="img" src={`/${photos[0]}.jpg`} alt={roomTitle}/>
                    </div>
                    <div className="room-detail-three-photos-second">
                        <CustomImage type="img" subClassName="img" src={`/${photos[1]}.jpg`} alt={roomTitle}/>
                        <CustomImage type="img" subClassName="img" src={`/${photos[2]}.jpg`} alt={roomTitle}/>
                    </div>
                </div>
            </Container>
        )
    }

    if(photos.length > 4) {
        return (
            <Container>
                <div className="room-detail-photos-wrapper">
                    <div className="room-detail-five-photos-first">
                        <CustomImage type="img" subClassName="img" src={`/${photos[0]}.jpg`} alt={roomTitle}/>
                    </div>
                    <div className="room-detail-five-photos-second">
                    <CustomImage type="img" subClassName="img" src={`/${photos[1]}.jpg`} alt={roomTitle}/>
                    <CustomImage type="img" subClassName="img" src={`/${photos[2]}.jpg`} alt={roomTitle}/>
                    <CustomImage type="img" subClassName="img" src={`/${photos[3]}.jpg`} alt={roomTitle}/>
                    <CustomImage type="img" subClassName="img" src={`/${photos[4]}.jpg`} alt={roomTitle}/>
                    </div>
                </div>
            </Container>
        )
    }
    return <></>
}

export default RoomDetailPhotos;