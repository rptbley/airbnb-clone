import { useState } from "react";
import styled from "styled-components";
import { monthList } from "../../lib/staticData";
import palette from "../../styles/palette";
import Input from "../common/Input";
import Selector from "../common/Selector";
import CustomImage from "../image/CustomImage";


const Container = styled.div`
    width: 568px;
    padding: 32px;
    background-color: white;
    z-index: 11;

    .modal-close-x-icon {
        cursor: pointer;
        display: block;
        margin: 0 0 40px auto;
    }

    .input-wrapper {
        position: relative;
        margin-bottom: 16px;

        .password-toggle {
            cursor: pointer;
        }
    }

    .sign-up-birthday-label {
        font-size: 16px;
        font-weight: 600;
        margin-top: 16px;
        margin-bottom: 8px;
    }

    .sign-up-modal-birthday-info {
        margin-bottom: 16px;
        color: ${palette.charcoal};
    }
`;

const SignUpModal: React.FC = () => {
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let id = e.target.id;
        let value = e.target.value;
        switch(id) {
            case "email":
                return setEmail(value);
            case "lastname":
                return setLastname(value);
            case "firstname":
                return setFirstname(value);
            case "password":
                return setPassword(value);
            default:
                return;
        }
    }

    const [togglePw, setTogglePw] = useState(false);
    const passwordView = () => {
        setTogglePw(!togglePw);
    } 
    return (
        <Container>
            <CustomImage subClassName="modal-close-x-icon" src="static/svg/modal/modal_close_x_icon.svg"/>
            <div className="input-wrapper">
                <Input
                    id="email"
                    placeholder="이메일 주소"
                    type="email"
                    value={email}
                    onChange={onChange}
                    icon={<CustomImage src="static/svg/auth/mail.svg"/>}
                />
            </div>
            <div className="input-wrapper">
                <Input
                    id="lastname"
                    value={lastname}
                    placeholder="이름(예: 길동)"
                    onChange={onChange}
                    icon={<CustomImage src="static/svg/auth/person.svg"/>}
                />
            </div>
            <div className="input-wrapper">
                <Input
                    id="firstname"
                    value={firstname}
                    placeholder="성(예: 홍)"
                    onChange={onChange}
                    icon={<CustomImage src="static/svg/auth/person.svg"/>}
                />
            </div>
            <div className="input-wrapper">
                <Input
                    id="password"
                    value={password}
                    placeholder="비밀번호 설정하기"
                    type={ togglePw ? "text" : "password" }
                    onChange={onChange}
                    icon={
                        <CustomImage
                            subClassName="password-toggle"
                            onClick={passwordView}
                            src={ togglePw ? "static/svg/auth/opened_eye.svg" : "static/svg/auth/closed_eye.svg" }
                        />}
                />
            </div>
            <p className="sign-up-birthday-label">생일</p>
            <p className="sign-up-modal-birthday-info">
                만 18세 이상의 성인만 회원으로 가입할 수 있습니다.<br/>생일은 다른 에어비앤비 이용자에게 공개되지 않습니다.
            </p>
            <Selector options={monthList}/>
        </Container>
    )
}

export default SignUpModal;