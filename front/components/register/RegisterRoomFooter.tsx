import Link from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import CustomImage from "../image/CustomImage";
import Button from "../common/Button";
import useValidateMode from "../../hooks/useValidateMode";


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
    border-top: 1px soild ${palette.gray_dd};

    .register-room-footer-back {
        display: flex;
        align-items: center;
        color: ${palette.dark_cyan};
        cursor: pointer;

        image-wrapper {
            margin-right: 8px;
        }
        
        span {
            margin-top: 1px;
            margin-left: 6px;
        }
    }
`;

interface IProps {
    prevHref?: string;
    nextHref?: string;
    isValid?: boolean;
}

const RegisterRoomFooter: React.FC<IProps> = ({ prevHref, nextHref, isValid = true }) => {
    const { setValidateMode } = useValidateMode();

    useEffect(() => {
        return () => {
            setValidateMode(false)
        }
    }, [])

    const onClickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!isValid) {
            e.preventDefault();
            setValidateMode(true);
        }
    }

    return (
        <Container>
            <Link href={prevHref || ""}>
                <a className="register-room-footer-back">
                    <CustomImage src="/register/register_room_back_arrow.svg" subClassName="image-wrapper"/>
                    <span>뒤로</span>
                </a>
            </Link>
            <Link href={nextHref || ""}>
                <a>
                    <Button color="dark_cyan" onClick={onClickNext}>
                        계속
                    </Button>
                </a>
            </Link>
        </Container>
    )
}

export default RegisterRoomFooter;