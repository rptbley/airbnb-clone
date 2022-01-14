export type StoredUserType = {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    birthday: string;
    profileImage?: string;
}

export type returnUserType = {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    birthday: string;
    profileImage?: string;
}