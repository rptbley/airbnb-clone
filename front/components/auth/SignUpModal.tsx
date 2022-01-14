import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { StoredUserType } from "../../lib/api/types/user";
import { resgisterUser } from "../../lib/api/user";
import { dayList, monthList, yearList } from "../../lib/staticData";
import { userActions } from "../../store/user";
import palette from "../../styles/palette";
import Button from "../common/Button";
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

    .sign-up-modal-birthday-selectors {
        display: flex;
        margin-bottom: 24px;

        .sign-up-modal-birthday-month-selector {
            margin-right: 16px;
            flex-grow: 1;
        }
        .sign-up-modal-birthday-day-selector {
            margin-right: 16px;
            width: 25%;
        }
        .sign-up-modal-birthday-year-selector {
            width: 33.3333%;
        }
    }

    .sign-up-modal-submit-button-wrapper {
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid ${palette.gray_eb};
    }
`;

const SignUpModal: React.FC = () => {
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [password, setPassword] = useState("");

    const [year, setYear] = useState<string | undefined>();
    const [month, setMonth] = useState<string | undefined>();
    const [day, setDay] = useState<string | undefined>();

    const dispatch = useDispatch();

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

    const onChangeBirth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let id = e.target.id;
        let value = e.target.value;
        switch(id) {
            case "year":
                return setYear(value);
            case "month":
                return setMonth(value);
            case "day":
                return setDay(value);
            default:
                return;
        }
    }

    const [togglePw, setTogglePw] = useState(false);
    const passwordView = () => {
        setTogglePw(!togglePw);
    }

    const test = async () => {
        const param: StoredUserType = {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            birthday: `${year} -${month}-${day}`,
            profileImage: ""
        }

        const {data: data} = await resgisterUser(param);
        dispatch(userActions.setLoggedUser(data));
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
            <div className="sign-up-modal-birthday-selectors">
                <div className="sign-up-modal-birthday-month-selector">
                    <Selector
                        id="month"
                        options={monthList}
                        disabledOptions={["월"]}
                        defaultValue="월"
                        onChange={onChangeBirth}
                    />
                </div>
                <div className="sign-up-modal-birthday-day-selector">
                    <Selector
                        id="day"
                        options={dayList}
                        disabledOptions={["일"]}
                        defaultValue="일"
                        onChange={onChangeBirth}
                    />
                </div>
                <div className="sign-up-modal-birthday-year-selector">
                    <Selector
                        id="year"
                        options={yearList}
                        disabledOptions={["년"]}
                        defaultValue="년"
                        onChange={onChangeBirth}
                    />
                </div>
            </div>
            <div className="sign-up-modal-submit-button-wrapper">
                <Button type="submit" onClick={test}>가입하기</Button>
            </div>
        </Container>
    )
}

export default SignUpModal;