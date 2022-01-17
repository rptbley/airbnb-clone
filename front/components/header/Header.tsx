import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useModal from "../../hooks/useModal";
import { useSelector } from "../../store";
import { authActions } from "../../store/auth";
import palette from "../../styles/palette";
import AuthModal from "../auth/AuthModal";
import CustomImage from "../image/CustomImage";

const Container = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 80px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
    z-index: 10;

    .header-logo-wrapper {
        display: flex;
        align-items: center;

        .header-logo {
            margin-right: 6px;
        }
    }

    .header-auth-buttons {
        .header-sign-up-button {
            height: 42px;
            margin-right: 8px;
            padding: 0 16px;
            border: 0;
            border-radius: 21px;
            background-color: white;
            cursor: pointer;
            outline: none;
            &:hover {
                background-color: ${palette.gray_f7};
            }
        }

        .header-login-button {
            height: 42px;
            padding: 0 16px;
            border: 0;
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
            border-radius: 21px;
            background-color: white;
            cursor: pointer;
            outline: none;
            &:hover {
                box-shaodw: 0px 2px 8px rgba(0, 0, 0, 0.12);
            }
        }
    }

    .header-user-profile {
        display: flex;
        align-items: center;
        height: 42px;
        padding: 0 6px 0 16px;
        border: 0;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
        border-radius: 21px;
        background-color: white;
        cursor: pointer;
        outline: none;
        &:hover {
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
        }

        .header-user-profile-image {
            margin-left: 8px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
    }
`;

const Header: React.FC = () => {
    const user = useSelector(state => state.user);

    const { openModal, ModalPortal, closeModal } = useModal();

    const router = useRouter();
    const dispatch = useDispatch();

    const goHome = () => {
        router.push({pathname: "/"})
    }
    return (
        <Container>
            <div className="header-logo-wrapper" onClick={goHome}>
                <CustomImage className="header-logo" src={"static/svg/logo/logo.svg"}/>
                <CustomImage src="static/svg/logo/logo_text.svg"/>
            </div>
            {!user.isLogged && (
                <div className="header-auth-buttons">
                <button
                    type="button"
                    className="header-sign-up-button"
                    onClick={() => {
                        dispatch(authActions.setAuthMode("signup"));
                        openModal();
                    }}    
                >
                    회원가입
                </button>
                <button
                    type="button"
                    className="header-login-button"
                    onClick={() => {
                        dispatch(authActions.setAuthMode("login"));
                        openModal();
                    }}
                >
                    로그인
                </button>
            </div>
            )}
            {user.isLogged && (
                <button
                    className="header-user-profile"
                    type="button"
                >
                    <CustomImage src="static/svg/header/hamburger.svg"/>
                    <img
                        src={user.userInfo.profileImage}
                        className="header-user-profile-image"
                        alt=""
                    />
                </button>
            )}
            <ModalPortal>
                <AuthModal closeModal={closeModal}/>
            </ModalPortal>
        </Container>
    )
}

export default Header;