import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useValidateMode from "../../hooks/useValidateMode";
import { StoredUserType } from "../../lib/api/types/user";
import { resgisterUser } from "../../lib/api/user";
import { dayList, monthList, yearList } from "../../lib/staticData";
import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
import palette from "../../styles/palette";
import Button from "../common/Button";
import Input from "../common/Input";
import Selector from "../common/Selector";
import CustomImage from "../image/CustomImage";
import PasswordWarning from "./PasswordWarning";


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

    .sign-up-modal-set-login {
        color: ${palette.dark_cyan};
        margin-left: 8px;
        cursor: pointer;
    }
`;

const PASSWORD_MIN_LENGTH = 8;

const disabledMonths = ["???"]
const disabledDays = ["???"]
const disabledYears = ["???"]

interface IProps {
    closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [password, setPassword] = useState("");

    const [year, setYear] = useState<string | undefined>();
    const [month, setMonth] = useState<string | undefined>();
    const [day, setDay] = useState<string | undefined>();

    const [togglePw, setTogglePw] = useState(false);
    const [pwFocused, setPwFocused] = useState(false);

    const dispatch = useDispatch();
    const { setValidateMode } = useValidateMode();

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

    const passwordView = () => {
        setTogglePw(!togglePw);
    }

    const onFocusPw = () => {
        setPwFocused(true);
    }

    const isPwHasNameOrEmail = useMemo(() =>
        !password ||
        !lastname ||
        password.includes(lastname) ||
        password.includes(email.split("@")[0]),
        [password, lastname, email]
    )

    const isPwOverMinLength = useMemo(() =>
        !!password && password.length >= PASSWORD_MIN_LENGTH,
        [password]
    )

    const isPwhasNumberOrSymbol = useMemo(() => 
        !(
            /[{}[\]/?.,;:|)*~!^\-_+<>@#$%&\\]/g.test(password) ||
            /[0-9]/g.test(password)
        ),
        [password]
    );

    const validateSignUpFrom = () => {
        if(!email || !lastname || !firstname || !password) {
            return false;
        }

        if(
            isPwHasNameOrEmail ||
            !isPwOverMinLength ||
            isPwhasNumberOrSymbol) {
                return false;
        }

        if(!day || !month || !year) {
            return false;
        }

        return true;
    }

    const test = async () => {
        setValidateMode(true);

        if(validateSignUpFrom()) {
            try {
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
                closeModal();
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        return () => {
            setValidateMode(false);
        }
    }, []);

    const changeToLoginModal = () => {
        dispatch(authActions.setAuthMode("login"));
    }

    return (
        <Container>
            <CustomImage subClassName="modal-close-x-icon" src="/modal/modal_close_x_icon.svg" onClick={closeModal}/>
            <div className="input-wrapper">
                <Input
                    id="email"
                    placeholder="????????? ??????"
                    type="email"
                    value={email}
                    onChange={onChange}
                    icon={<CustomImage src="/auth/mail.svg"/>}
                    useValidation
                    isValid={!!email}
                    errorMsg="???????????? ???????????????."
                />
            </div>
            <div className="input-wrapper">
                <Input
                    id="lastname"
                    value={lastname}
                    placeholder="??????(???: ??????)"
                    onChange={onChange}
                    icon={<CustomImage src="/auth/person.svg"/>}
                    useValidation
                    isValid={!!lastname}
                    errorMsg="????????? ???????????????."
                />
            </div>
            <div className="input-wrapper">
                <Input
                    id="firstname"
                    value={firstname}
                    placeholder="???(???: ???)"
                    onChange={onChange}
                    icon={<CustomImage src="/auth/person.svg"/>}
                    useValidation
                    isValid={!!firstname}
                    errorMsg="?????? ???????????????."
                />
            </div>
            <div className="input-wrapper">
                <Input
                    id="password"
                    value={password}
                    placeholder="???????????? ????????????"
                    type={ togglePw ? "text" : "password" }
                    onChange={onChange}
                    onFocus={onFocusPw}
                    icon={
                        <CustomImage
                            subClassName="password-toggle"
                            onClick={passwordView}
                            src={ togglePw ? "/auth/opened_eye.svg" : "/auth/closed_eye.svg" }
                        />}
                    useValidation
                    isValid={
                        !isPwHasNameOrEmail &&
                        isPwOverMinLength &&
                        !isPwhasNumberOrSymbol
                    }
                    errorMsg="??????????????? ???????????????."
                />
                <br/>
                {pwFocused && (
                    <>
                        <PasswordWarning
                            isValid={isPwHasNameOrEmail}
                            text="??????????????? ?????? ???????????? ????????? ????????? ????????? ??? ????????????."
                        />
                        <PasswordWarning
                            isValid={!isPwOverMinLength}
                            text="?????? 8???"
                        />
                        <PasswordWarning
                            isValid={isPwhasNumberOrSymbol}
                            text="????????? ????????? ???????????????."
                        />
                    </>
                )}
            </div>
            <p className="sign-up-birthday-label">??????</p>
            <p className="sign-up-modal-birthday-info">
                ??? 18??? ????????? ????????? ???????????? ????????? ??? ????????????.<br/>????????? ?????? ??????????????? ??????????????? ???????????? ????????????.
            </p>
            <div className="sign-up-modal-birthday-selectors">
                <div className="sign-up-modal-birthday-month-selector">
                    <Selector
                        id="month"
                        options={monthList}
                        disabledOptions={disabledMonths}
                        defaultValue="???"
                        onChange={onChangeBirth}
                        isValid={!!month}
                    />
                </div>
                <div className="sign-up-modal-birthday-day-selector">
                    <Selector
                        id="day"
                        options={dayList}
                        disabledOptions={disabledDays}
                        defaultValue="???"
                        onChange={onChangeBirth}
                        isValid={!!day}
                    />
                </div>
                <div className="sign-up-modal-birthday-year-selector">
                    <Selector
                        id="year"
                        options={yearList}
                        disabledOptions={disabledYears}
                        defaultValue="???"
                        onChange={onChangeBirth}
                        isValid={!!year}
                    />
                </div>
            </div>
            <div className="sign-up-modal-submit-button-wrapper">
                <Button type="submit" color="bittersweet" onClick={test}>????????????</Button>
            </div>
            <div>
            <p>
                ?????? ??????????????? ????????? ??????????
                <span
                    className="sign-up-modal-set-login"
                    role="presentation"
                    onClick={changeToLoginModal}
                >
                    ?????????
                </span>
            </p>
            </div>
        </Container>
    )
}

export default SignUpModal;