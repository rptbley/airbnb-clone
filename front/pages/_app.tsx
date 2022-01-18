import { AppContext, AppProps } from "next/app";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "../components/header/Header";
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";
import { cookieParser } from "../lib/utils";
import { wrapper } from "../store";
import { userActions } from "../store/user";
import GlobalStyle from "../styles/GlobalStyle";


const app = ({ Component, pageProps}: AppProps) => {
    const [queryClient] = React.useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalStyle/>
            <Header/>
            <Component {...pageProps}/>
            <ReactQueryDevtools />
            <div id="root-modal"/>
        </QueryClientProvider>
    )
}

app.getInitialProps = wrapper.getInitialPageProps(store => async context => {
    const { ctx, Component } = context;
    const cookieObject = cookieParser(ctx.req?.headers.cookie);
    const { isLogged } = store.getState().user;

    try {
        if(!isLogged && cookieObject.access_token) {
            axios.defaults.headers.cookie = cookieObject.access_token;
            const { data } = await meAPI();
            store.dispatch(userActions.setLoggedUser(data));
        }
    } catch(err) {
        console.log(err)
    }
    let pageProps = {};

    if(Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return {
        ...pageProps,
    }
})

export default wrapper.withRedux(app);