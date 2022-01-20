import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getLocation } from "../../lib/api/map";
import { location } from "../../lib/api/types/map";
import { countryList } from "../../lib/staticData";
import { useSelector } from "../../store";
import { registerRoomActions } from "../../store/registerRoom";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";
import Selector from "../common/Selector";
import CustomImage from "../image/CustomImage";
import RegisterRoomFooter from "./RegisterRoomFooter";


const Container = styled.div`
    padding: 62px 30px 100px;

    h2 {
        font-size: 19px;
        font-weight: 800;
        margin-bottom: 56px;
    }

    h3 {
        font-weight: bold;
        color: ${palette.gray_76};
        margin-bottom: 6px;
    }

    .register-room-step-info {
        font-size: 14px;
        max-width: 400px;
        margin-bottom: 24px;
        max-width: 400px;
        word-break: keep-all;
    }

    .register-room-location-button-wrapper {
        width: 176px;
        margin-bottom: 24px;
    }
    .image {
        margin-right: 10px;
    }

    .register-room-location-country-selector-wrapper {
        width: 385px;
        margin-bottom: 24px;
    }

    .register-room-location-city-district {
        max-width: 285px;
        display: flex;
        margin-bottom: 24px;
        > div:first-child {
            margin-right: 24px;
        }
    }

    .register-room-location-street-address {
        max-width: 385px;
        margin-bottom: 24px;
    }

    .register-room-location-detail-address {
        max-width: 385px;
        margin-bottom: 24px;
    }

    .register-room-location-postcode {
        max-width: 385px;
    }
`;

const RegisterRoomLocation: React.FC = () => {
    const country = useSelector(state => state.registerRoom.location.country)
    const city = useSelector(state => state.registerRoom.location.city)
    const district = useSelector(state => state.registerRoom.location.district)
    const streetAddress = useSelector(state => state.registerRoom.location.streetAddress)
    const detailAddress = useSelector(state => state.registerRoom.location.detailAddress)
    const postcode = useSelector(state => state.registerRoom.location.postcode)

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const onChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(registerRoomActions.setCountry(e.target.value));
    }

    const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        let id = e.target.id;
        let value = e.target.value;

        switch(id) {
            case "city":
                return dispatch(registerRoomActions.setCity(value))
            case "district":
                return dispatch(registerRoomActions.setDistrict(value))
            case "streetAddress":
                return dispatch(registerRoomActions.setStreetAddress(value))
            case "detailAddress":
                return dispatch(registerRoomActions.setDetailAddress(value))
            case "postcode":
                return dispatch(registerRoomActions.setPostcode(value))
            default:
                return ;
        }
    }

    const onSuccessGetLocation = async ({ coords }: { coords: GeolocationCoordinates }) => {
        console.log("latitude", coords.latitude)
        console.log("longitude", coords.longitude);
        const param: location = {
            latitude: coords.latitude,
            longitude: coords.longitude
        }
        const result = await getLocation(param);
        if(result === null) {
            return alert('error')
        }
        dispatch(registerRoomActions.setLocation(result));
        setLoading(false);
    }

    const onClickGetCurrentLocation = () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
            console.log(e);
            alert(e?.message)
        })
    }

    return (
        <Container>
            <h2>숙소의 위치를 알려주세요.</h2>
            <h3>4단계</h3>
            <p className="register-room-step-info">정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개됩니다.</p>
            <div className="register-room-location-button-wrapper">
                <Button
                    color="dark_cyan"
                    colorReverse
                    icon={<CustomImage subClassName="image" src="/register/navigation.svg"/>}       
                    onClick={onClickGetCurrentLocation}
                >
                    {loading ? "Loading..." : "현재 위치 사용"}
                </Button>
            </div>
            <div className="register-room-location-country-selector-wrapper">
                <Selector
                    type="register"
                    options={countryList}
                    useValidation={false}
                    defaultValue="국가/지역 선택"
                    disabledOptions={["국가/지역 선택"]}
                    onChange={onChangeCountry}
                />
            </div>
            <div className="register-room-location-city-district">
                <Input id="city" label="시/도" value={city} onChange={onChangeLocation}/>
                <Input id="district" label="시/군/구" value={district} onChange={onChangeLocation}/>
            </div>
            <div className="register-room-location-street-address">
                <Input id="streetAddress" label="도로명주소" value={streetAddress} onChange={onChangeLocation}/>
            </div>
            <div className="register-room-location-detail-address">
                <Input id="detailAddress" label="동호수(선택 사항)" useValidation={false} value={detailAddress} onChange={onChangeLocation}/>
            </div>
            <div className="register-room-location-postcode">
                <Input id="postcode" label="우편번호" value={postcode} onChange={onChangeLocation}/>
            </div>
            <RegisterRoomFooter
                prevHref="/room/register/bathroom"
                nextHref="/room/register/geometry"
            />
        </Container>
    )
}

export default RegisterRoomLocation;