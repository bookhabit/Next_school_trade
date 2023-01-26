import { AppProps } from "next/app";
import Auth from "../components/Auth";
import GlobalStyle from "../styles/GlobalStyle";

const MyApp = ({Component,pageProps}:AppProps)=>{
    return(
        <>
            <Auth/>
            <GlobalStyle/>
            <Component {...pageProps}/>
            <div id="root-modal"/>
        </>
    )
}

export default MyApp;