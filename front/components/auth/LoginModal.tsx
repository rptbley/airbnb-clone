import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useValidateMode from "../../hooks/useValidateMode";
import { loginUserType } from "../../lib/api/types/user";
import { loginUser } from "../../lib/api/user";
import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
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
    const { setValidateMode } = useValidateMode();

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

    const login = async () => {
        setValidateMode(true);

        if(email && password) {
            try {
                const param: loginUserType = {
                    email: email,
                    password: password
                }
        
                const {data: data} = await loginUser(param);
                dispatch(userActions.setLoggedUser(data));
                closeModal();
            } catch(err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        return () => {
            setValidateMode(false);
        }
    }, [])

    return (
        <Container>
            <CustomImage subClassName="mordal-close-x-icon" src="/modal/modal_close_x_icon.svg" onClick={closeModal}/>
            <div className="login-input-wrapper">
                <Input
                    placeholder="이메일 주소"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    icon={<CustomImage src="/auth/mail.svg"/>}
                    onChange={onChange}
                    isValid={email !== ""}
                    errorMsg="이메일이 필요합니다."
                />
            </div>
            <div className="login-input-wrapper login-password-input-wrapper">
                <Input
                    placeholder="비밃번호 설정하기"
                    icon={<CustomImage
                            subClassName="image-wrapper"
                            src={isPwHided ? "/auth/closed_eye.svg" : "/auth/opened_eye.svg"}
                            onClick={() => setIsPwHided(!isPwHided)}
                        />}
                    type={isPwHided ? "password" : "text"}
                    id="password"
                    value={password}
                    onChange={onChange}
                    isValid={password !== ""}
                    errorMsg="비밀번호를 입력하세요."
                />
            </div>
            <div className="login-modal-submit-button-wrapper">
                <Button
                    type="button"
                    color="bittersweet"
                    onClick={login}
                >로그인</Button>
            </div>
            <p>
                혹시 에어비앤비 계정이 없으신가요? 
                <span className="login-modal-set-signup" onClick={changeToSignupModal}>회원가입</span>
            </p>
        </Container>
    )
}

export default LoginModal;