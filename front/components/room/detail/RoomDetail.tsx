import { isEmpty } from "lodash";
import React from "react";
import styled from "styled-components";
import { useSelector } from "../../../store";
import palette from "../../../styles/palette";
import CustomImage from "../../image/CustomImage";
import RoomAmentityIcon from "./RoomAmentityIcon";
import RoomDetailPhotos from "./RoomDetailPhotos";
import RoomDetailReservation from "./RoomDetailReservation";


const Container = styled.div`
    width: 1120px;
    padding-top: 26px;
    padding-bottom: 100px;
    padding-left: 30px;

    .room-detail-title {
        font-size: 26px;
        font-weight: 800;
        margin-bottom: 15px;
    }

    .room-detail-location {
        font-size: 14px;
        font-weight: 600;
        text-decoration: underline;
        color: ${palette.gray_71};
        margin-bottom: 24px;
    }

    .room-detail-contents {
        display: flex;
        justify-content: space-between;
    }

    .room-detail-infos {
        width: 644px;

        .room-detail-room-type {
            font-size: 22px;
            font-weight: 800;
            margin-bottom: 8px;
        }

        .room-detail-space-counts {
            font-size: 14px;
        }

        .room-detail-divider {
            width: 100%;
            height: 1px;
            background-color: ${palette.gray_dd};
            margin: 32px 0;
        }

        .room-detail-description {
            white-space: break-spaces;
            word-break: keep-all;
        }

        .room-detail-bed-type-label {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 24px;
        }

        .room-detail-bed-type-list {
            display: flex;

            .room-detail-bedroom-card {
                padding: 26px 24px;
                width: 204px;
                margin-right: 16px;
                border: 1px solid ${palette.gray_dd};
                border-radius: 12px;
                .svg {
                    margin-bottom: 20px;
                }

                .room-detail-bed-card-number {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 12px;
                }
            }
        }
        .room-detail-conveniences-label {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 24px;
        }

        .room-detail-conveniences-list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            li {
                display: flex;
                align-items: center;
                width: 50%;
                margin-bottom: 16px;
                .svg {
                    margin-right: 16px;
                }
            }
        }
    }
`;

const RoomDetail: React.FC = () => {
    const room = useSelector(state => state.room.detail);
    if(!room) {
        return null;
    }

    const translatedRoomType = () => {
        switch(room.roominfo.roomType) {
            case "entrie":
                return "??? ??????"
            case "privaate":
                return  "?????????"
            case "public":
                return "??????"
            default:
                return "";
        }
    }

    const getBedTypesText = (
        beds: {
            type: any;
            count: number;
        }[]
    ) => {
        const bedTypesText = beds.map((bed) => `${bed.type} ${bed.count}???,`).join("").slice(0, -1);
        return bedTypesText;
    }

    return (
        <Container>
            <h1 className="room-detail-title">{room.roominfo.title}</h1>
            <p className="room-detail-location">
                {room.roominfo.location.district}, {room.roominfo.location.city}, {room.roominfo.location.country}
            </p>
            <RoomDetailPhotos/>
            <section className="room-detail-contents">
                <div className="room-detail-infos">
                    <p className="room-detail-room-type">
                        {room.host.lastname}?????? ??????????????? {translatedRoomType()}
                    </p>
                    <p className="room-detail-space-counts">
                        ?????? {room.roominfo.maximumGuestCount}??? ??? ?????? {room.roominfo.bedroomCount}??? ??? ?????? {room.roominfo.bedCount}??? ??? ?????? {room.roominfo.bathroomCount}???
                    </p>
                    <div className="room-detail-divider"/>
                    <p className="room-detail-description">{room.roominfo.description}</p>
                    <div className="room-detail-divider"/>
                    {!isEmpty(room.roominfo.bedList) && (
                        <>
                            <p className="room-detail-bed-type-label">??????/?????? ??????</p>
                            <ul className="room-detail-bed-type-list">
                                {room.roominfo.bedList.map((bedroom) => (
                                    <li className="room-detail-bedroom-card" key={bedroom.id}>
                                        <CustomImage src="/room/detail/bed.svg"/>
                                        <p className="room-detail-bed-card-number">
                                            {bedroom.id}??? ??????
                                        </p>
                                        <p>{getBedTypesText(bedroom.beds)}</p>
                                    </li>
                                ))}
                                {room.roominfo.publicBedList.map((bedroom, index) => (
                                    <li className="room-detail-bedroom-card" key={index}>
                                        <CustomImage src="/room/detail/bed.svg"/>
                                        <p className="room-detail-bed-card-number">?????? ??????</p>
                                        <p>{getBedTypesText([bedroom])}</p>
                                    </li>
                                ))}
                            </ul>
                            <div className="room-detail-divider"/>
                        </>
                    )}
                    {!isEmpty(room.roominfo.conveniences) && (
                        <>
                            <p className="room-detail-conveniences-label">????????????</p>
                            <ul className="room-detail-conveniences-list">
                                {room.roominfo.amentities.map((amentity, index) => (
                                    <li key={index}>
                                        <RoomAmentityIcon amentity={amentity}/>
                                        {amentity}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
                <RoomDetailReservation/>
            </section>
        </Container>
    )
}

export default RoomDetail;