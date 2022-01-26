import { isEmpty, result } from "lodash";
import { stringify } from "querystring";
import React, { useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useDebounce from "../../../hooks/useDebounce";
import { getLocationInfo, getLocationInfoByPlaceId } from "../../../lib/api/map";
import { useSelector } from "../../../store";
import searchRoom, { searchRoomActions } from "../../../store/searchRoom";
import palette from "../../../styles/palette";


const Container = styled.div`
    position: relative;
    width: 100%;
    height: 70px;
    border: 2px solid transparent;
    border-radius: 12px;
    &:hover {
        border-color: ${palette.gray_dd};
    }

    .search-room-bar-location-texts {
        position: absolute;
        width: calc(100% - 40px);
        top: 16px;
        left: 20px;

        .search-room-bar-location-label {
            font-size: 10px;
            font-weight: 800;
            margin-bottom: 4px;
        }

        input {
            width: 100%;
            border: 0;
            font-size: 14px;
            font-weight: 600;
            outline: none;
            overflow: ellipsis;
            white-space: nowrap;
            &::placeholder {
                font-size: 14px;
                opacity: 0.7;
            }
        }
    }

    .search-room-bar-location-results {
        position: absolute;
        background-color: white;
        top: 78px;
        width: 500px;
        padding: 16px 0;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        border-radius: 32px;
        cursor: default;
        overflow: hidden;
        z-index: 10;
        li {
            display: flex;
            align-items: center;
            height: 64px;
            padding: 8px 32px;
            cursor: pointer;
            &:hover {
                background-color: ${palette.gray_f7};
            }
        }
    }
`;

const SearchRoomBarLoctaion: React.FC = () => {
    const location = useSelector(state => state.searchRoom.location);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const [popupOpened, setPopupOpened] = useState(false);
    const [results, setResults] = useState<{
        description: string;
        placeId: string;
    }[]>([]);

    const dispatch = useDispatch();
    const searchKeyword = useDebounce(location, 200);

    const setLocationDispatch = (value: string) => {
        dispatch(searchRoom.actions.setLocation(value))
    }

    const setLatitudeDispatch = (value: number) => {
        dispatch(searchRoom.actions.setLatitude(value))
    }

    const setLongitudeDispatch = (value: number) => {
        dispatch(searchRoom.actions.setLongitude(value));
    }

    const onClickInput = () => {
        if(inputRef.current) {
            inputRef.current.focus();
        }
        setPopupOpened(true);
    }

    const onClickNearPlaces = () => {
        setPopupOpened(false);
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            setLocationDispatch("근처 추천 장소");
            setLatitudeDispatch(coords.latitude);
            setLongitudeDispatch(coords.longitude);
        }, (e) => {
            console.log(e)
        })
    }

    const onClickResult = async (placeId: string) => {
        const { data } = await getLocationInfoByPlaceId(placeId);
        const { formatted_address } = data.data.results[0];
        const { lat, lng } = data.data.results[0].geometry.location;
        setLocationDispatch(formatted_address);
        setLatitudeDispatch(lat);
        setLongitudeDispatch(lng);
        setPopupOpened(false);
    }

    const searchPlaces = async () => {
        const {data} = await getLocationInfo(location);
        const result = data.data.predictions.map((prediction: any) => ({
            description: prediction.description,
            placeId: prediction.place_id
        }))
        setResults(result);
    }

    useEffect(() => {
        if(!searchKeyword) {
            setResults([]);
        }
        if(searchKeyword) {
            searchPlaces();
        }
    }, [location])

    return (
        <Container onClick={onClickInput}>
            <OutsideClickHandler
                onOutsideClick={() => setPopupOpened(false)}
            >
                <div className="search-room-bar-location-texts">
                    <p className="search-room-bar-location-label">인원</p>
                    <input
                        value={location}
                        onChange={(e) => setLocationDispatch(e.target.value)}
                        placeholder="어디로 여행 가세요?"
                        ref={inputRef}
                    />
                </div>
                {popupOpened && location !== "근처 추천 장소" &&(
                    <ul className="search-room-bar-location-results">
                        {!location && (<li role="presentation" onClick={onClickNearPlaces}>근처 추천 장소</li>)}
                        {!isEmpty(results) && results.map((result, index) => (
                            <li key={index} onClick={() => onClickResult(result.placeId)}>{result.description}</li>
                        ))}
                        {location && isEmpty(results) && (<li>검색 결과가 없습니다.</li>)}
                    </ul>
                )}
            </OutsideClickHandler>
        </Container>
    )
}

export default SearchRoomBarLoctaion;