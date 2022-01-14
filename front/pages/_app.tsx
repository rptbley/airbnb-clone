import { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "../components/header/Header";
import { wrapper } from "../store";
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

export default wrapper.withRedux(app);