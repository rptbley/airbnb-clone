import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "../../../store";

const Container = styled.div`
    width: calc(100% - 840px);
    position: fixed;
    top: 80px;
    right: 0;
    height: calc(100vh - 80px);
    > div {
        width: 100%;
        height: 100%;
    }

    .gmnoprint .gm-style-mtc {
        display: none;
    }

    .gm-svpc {
        display: none;
    }

    .gm-fullscreen-control {
        display: none;
    }

    .gm-bundled-control {
        top: -40px;
        right: 55px !important;
    }

    .gmnoprint > div {
        border-radius: 8px !important;
        overflow: hidden;
    }

    .room-list-map-close-button {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background-color: white;
        outline: 0;
        border: 0;
        top: 40px;
        left: 40px;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
        background-image: url("${process.env.NEXT_PUBLIC_IMG_URL}/map/google_close.svg");
        background-repeat: no-repeat;
        background-position: center;
    }
`;

declare global {
    interface Window {
        google: any;
        initMap: () => void;
    }
}

const loadMapScript = () => {
    return new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
        script.defer = true;
        document.head.appendChild(script);
        script.onload = () => {
            resolve();
        }
    })
}

interface IProps {
    showMap: boolean;
    setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomListMap: React.FC<IProps> = ({ showMap, setShowMap }) => {
    const rooms = useSelector(state => state.room.rooms);
    const mapRef = useRef<HTMLDivElement>(null);

    const [currentLoctaion, setCurrentLocation] = useState({
        latitude: 37.5666784,
        longitude: 126.9778436
    });

    const loadMap = async () => {
        await loadMapScript();
    }

    window.initMap = () => {
        if(mapRef.current) {
            const map = new google.maps.Map(mapRef.current, {
                center: {
                    lat: currentLoctaion.latitude,
                    lng: currentLoctaion.longitude
                },
                zoom: 14
            })
            rooms.forEach((room) => {
                const marker = new google.maps.Marker({
                    position: { lat: room.roominfo.location.latitude, lng: room.roominfo.location.longitude },
                    map
                })
            })
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            setCurrentLocation({
                latitude: coords.latitude,
                longitude: coords.longitude
            })
        }, () => {
            console.log("위치 받기 에러")
        })
    }, [])

    useEffect(() => {
        loadMap();
    }, [rooms, currentLoctaion])

    return (
        <Container>
            <div ref={mapRef} id="map" />
            <button
                type="button"
                className="room-list-map-close-button"
                onClick={() => setShowMap(false)}
            />
        </Container>
    )
}

export default RoomListMap;