import { useRouter } from "next/router";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useModal from "../../hooks/useModal";
import { logoutAPI } from "../../lib/api/auth";
import { useSelector } from "../../store";
import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
import palette from "../../styles/palette";
import AuthModal from "../auth/AuthModal";
import CustomImage from "../image/CustomImage";
import HeaderAuths from "./HeaderAuths";
import HeaderUserProfile from "./HeaderUserProfile";

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
`;

const Header: React.FC = () => {
    const isLogged = useSelector(state => state.user.isLogged);

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
            {!isLogged && <HeaderAuths />}
            {isLogged && <HeaderUserProfile />}
            <ModalPortal>
                <AuthModal closeModal={closeModal}/>
            </ModalPortal>
        </Container>
    )
}

export default Header;