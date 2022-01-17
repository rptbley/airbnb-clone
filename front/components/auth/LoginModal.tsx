import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { authActions } from "../../store/auth";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";
import CustomImage from "../image/CustomImage";


const Container = styled.form`
    width: 568px;
    padding: 32px;
    background-color: white;
    z-index: 11;

    .mordal-close-x-icon {
        cursor: pointer;
        display: block;
        margin: 0 0 40px auto;
    }

    .login-input-wrapper {
        position: relative;
        margin-bottom: 16px;
    }

    .login-password-input-wrapper {
        .image-wrapper {
            cursor: pointer;
        }
    }

    .login-modal-submit-button-wrapper {
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid ${palette.gray_eb};
    }

    .login-modal-set-signup {
        color: ${palette.dark_cyan};
        margin-left: 8px;
        cursor: pointer;
    }
`;

interface IProps {
    closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPwHided, setIsPwHided] = useState(true);

    const dispatch = useDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.target;
        let value = e.target.value;

        switch(target.id) {
            case "email":
                return setEmail(value);
            case "password":
                return setPassword(value);
            default:
                return ;
        }
    }

    const changeToSignupModal = () => {
        dispatch(authActions.setAuthMode("signup"));
    }
    return (
        <Container>
            <CustomImage subClassName="mordal-close-x-icon" src="static/svg/modal/modal_close_x_icon.svg" onClick={closeModal}/>
            <div className="login-input-wrapper">
                <Input
                    placeholder="이메일 주소"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    icon={<CustomImage src="static/svg/auth/mail.svg"/>}
                    onChange={onChange}
                />
            </div>
            <div className="login-input-wrapper login-password-input-wrapper">
                <Input
                    placeholder="비밃번호 설정하기"
                    icon={<CustomImage
                            subClassName="image-wrapper"
                            src={isPwHided ? "static/svg/auth/closed_eye.svg" : "static/svg/auth/opened_eye.svg"}
                            onClick={() => setIsPwHided(!isPwHided)}
                        />}
                    type={isPwHided ? "password" : "text"}
                    id="password"
                    value={password}
                    onChange={onChange}
                />
            </div>
            <div className="login-modal-submit-button-wrapper">
                <Button type="submit">로그인</Button>
            </div>
            <p>
                혹시 에어비앤비 계정이 없으신가요? 
                <span className="login-modal-set-signup" onClick={changeToSignupModal}>회원가입</span>
            </p>
        </Container>
    )
}

export default LoginModal;