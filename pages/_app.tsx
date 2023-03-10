import { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store";
import App from "next/app";
import { cookieStringToObject } from './../lib/utils';
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";
import { useEffect } from "react";
import { userActions } from "../store/user";
import { useDispatch } from "react-redux";
import Header from "../components/header/Header";

const MyApp = ({Component,pageProps,...data}:AppProps)=>{
    // getInitialProps에서 받아온 data를 받아서 리덕스 스토어에 저장하기
    const clientData = Object(data).data
    const dispatch = useDispatch();
    useEffect(()=>{
        if(clientData){
            dispatch(userActions.setLoggedUser(clientData))
        }
    },[])

    return(
        <>
            <Header/>
            <GlobalStyle/>
            <Component {...pageProps}/>
            <div id="root-modal"/>
        </>
    )
}

MyApp.getInitialProps = async (context:AppContext)=>{
    const appInitialProps = await App.getInitialProps(context);
    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie)
    let data
    try{
        if(cookieObject.access_token){
            axios.defaults.headers.cookie = cookieObject.access_token;
            data = await (await meAPI()).data;
        }
    }catch(e){
        console.log(e)
    }
    
    return {...appInitialProps,data}
}

export default wrapper.withRedux(MyApp);