import { AppProps } from "next/app";
import Header from "../components/header/Header";
import GlobalStyle from "../styles/GlobalStyle";


const app = ({ Component, pageProps}: AppProps) => {
    return (
        <>
        <GlobalStyle/>
        <Header/>
        <Component {...pageProps}/>
        <div id="root-modal"/>
        </>
    )
}

export default app;