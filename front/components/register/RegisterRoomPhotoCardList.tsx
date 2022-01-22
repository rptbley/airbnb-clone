import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { delFile, uploadFile } from "../../lib/api/image";
import { registerRoomActions } from "../../store/registerRoom";
import palette from "../../styles/palette";
import CustomImage from "../image/CustomImage";


const Container = styled.ul`
    width: 858px;
    margin: auto;

    .register-room-first-photo-wrapper {
        width: 858px;
        height: 433px;
        margin: 0 auto 24px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        overflow: hidden;
        &:hover {
            .register-room-photo-interaction-buttons {
                display: flex;
            }
        }
        input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
        .img {
            width: 100%;
            max-height: 100%;
        }
    }

    .register-room-photo-interaction-buttons {
        display: none;
        position: absolute;
        top: 8px;
        right: 8px;
        button {
            width: 48px;
            height: 48px;
            background-color: white;
            border-radius: 50%;
            cursor: pointer;
            border: 0;
            outline: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
            &:first-child {
                margin-right: 8px;
            }
        }
    }

    li:nth-child(3n + 1) {
        margin-right: 0;
    }

    .register-room-photo-card {
        position: relative;
        display: inline-block;
        width: calc((100% - 48px) / 3);
        height: 180px;
        border-radius: 6px;

        overflow: hidden;
        margin-right: 24px;
        margin-bottom: 24px;
        &:hover {
            .register-room-photo-interaction-buttons {
                display: flex;
            }
        }

        .img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }

    .register-room-add-more-photo-card {
        position: relative;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border: 2px dashed ${palette.gray_bb};
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
        margin-right: 24px;
        margin-bottom: 24px;
        display: flex;

        .image-wrapper {
            margin-bottom: 12px;
        }
    }
`;

interface IProps {
    photos: string[];
}

const RegisterRoomPhotoCardList: React.FC<IProps> = ({ photos }) => {

    const dispatch = useDispatch();

    const addPhoto = () => {
        const el = document.createElement('input');
        el.type = "file";
        el.accept = "image/*";
        el.onchange = async (e) => {
            const { files } = e.target as HTMLInputElement;
            if(files && files.length > 0) {
                const file = files[0];
                const formData = new FormData();
                formData.append("file",file);
                const { data } = await uploadFile(formData);
                if(data && data.parsedName) {
                    dispatch(registerRoomActions.setPhotos([ ...photos, data.parsedName ]));
                }
            }
        }
        el.click();
    }

    const delPhoto = async ({photoName, index}: {photoName: string; index: number}) => {
        const { data } = await delFile(photoName);

        const newPhotos = [ ...photos ];
        newPhotos.splice(index, 1);
        dispatch(registerRoomActions.setPhotos(newPhotos));
    }

    const editPhoto = async ({ photoName, index }: { photoName: string; index: number }) => {
        const el = document.createElement('input');
        el.type = "file";
        el.onchange = async (e) => {
            const file = (e.target as HTMLInputElement)?.files?.[0];
            if(file) {
                const formData = new FormData();
                formData.append("file", file);
                const { data } = await uploadFile(formData);
                if(data && data.parsedName) {
                    const newPhotos = [ ...photos ];
                    newPhotos[index] = data.parsedName;
                    dispatch(registerRoomActions.setPhotos(newPhotos));

                    const result = await delFile(photoName);
                }
            }
        }
        el.click();
    }

    return (
        <Container>
            {photos.map((photo, index) => (
                <React.Fragment key={index}>
                    {index === 0 && (
                        <li className="register-room-first-photo-wrapper">
                            <CustomImage type="img" subClassName="img" src={`/${photo}.jpg`}/>
                            <div className="register-room-photo-interaction-buttons">
                                <button type="button" onClick={() => {delPhoto({ photoName: photo, index: index })}}>
                                    <CustomImage src="/register/photo/trash_can.svg"/>
                                </button>
                                <button type="button" onClick={() => {editPhoto({ photoName: photo, index: index })}}>
                                    <CustomImage src="/register/photo/pencil.svg"/>
                                </button>
                            </div>
                        </li>
                    )}
                    {index !== 0 && (
                        <li className="register-room-photo-card">
                            <CustomImage type="img" subClassName="img" src={`/${photo}.jpg`}/>
                            <div className="register-room-photo-interaction-buttons">
                                <button type="button" onClick={() => {delPhoto({ photoName: photo, index: index })}}>
                                    <CustomImage src="/register/photo/trash_can.svg"/>
                                </button>
                                <button type="button" onClick={() => {editPhoto({ photoName: photo, index: index })}}>
                                    <CustomImage src="/register/photo/pencil.svg"/>
                                </button>
                            </div>
                        </li>
                    )}
                </React.Fragment>
            ))}
            <li
                className="register-room-photo-card"
                role="presentation"
                onClick={addPhoto}
            >
                <div className="register-room-add-more-photo-card">
                    <CustomImage subClassName="image-wrapper" src="/register/photo/gray_plus.svg"/>
                    추가하기
                </div>
            </li>
        </Container>
    )
}

export default RegisterRoomPhotoCardList;