import { returnUserType } from "../lib/api/types/user"

export type UserState = {
    isLogged: boolean;
    msg: string;
    userInfo: returnUserType;
}