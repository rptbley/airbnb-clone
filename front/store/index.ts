import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { combineReducers } from "redux";
import auth from "./auth";
import common from "./common";
import registerRoom from "./registerRoom";
import user from "./user";
import searchRoom from "./searchRoom";
import room from "./room";
import error from "./errors";


const rootReducer = combineReducers({
    user: user.reducer,
    common: common.reducer,
    auth: auth.reducer,
    registerRoom: registerRoom.reducer,
    searchRoom: searchRoom.reducer,
    room: room.reducer,
    error: error.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
    if(action.type === HYDRATE) {
        const data = { ...action.payload };
        let nextState = {
            ...state,
            user: {
                ...data.user
            },
            common: {
                ...data.common
            },
            auth:{
                ...data.auth
            },
            registerRoom: {
                ...data.registerRoom
            },
            searchRoom: {
                ...data.searchRoom
            },
            room: {
                ...data.room
            },
            error: {
                ...data.error
            }
        }
        return nextState;
    }
    return rootReducer(state, action);
}

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore<any> = () => {
    const store = configureStore({
        reducer,
        devTools: process.env.NODE_ENV !== "production"
    })
    initialRootState = store.getState();
    return store;
}

export const wrapper = createWrapper(initStore);