import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import CustomImage from "../image/CustomImage";


const Container = styled.p<{ isValid: boolean }>`
    color: ${({ isValid }) => (isValid ? palette.davidson_orange : palette.green)};
    display: flex;
    align-items: center;
    image-wrapper {
        margin-right: 8px;
    }
`;

interface IProps {
    isValid: boolean;
    text: string;
}

const PasswordWarning: React.FC<IProps> = ({ isValid, text }) => {
    return(
        <Container
            isValid={isValid}
        >
            <CustomImage subClassName="image-wrapper" src={isValid ? "static/svg/auth/red_x_icon.svg" : "static/svg/auth/green_check_icon.svg"}/>
            {text}
        </Container>
    )
}

export default PasswordWarning;