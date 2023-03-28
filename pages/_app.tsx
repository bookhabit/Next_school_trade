import { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import {  wrapper } from "../store";
import { useSelector } from 'react-redux';
import App from "next/app";
import { cookieStringToObject } from './../lib/utils';
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";
import { useEffect } from "react";
import { userActions } from "../store/user";
import { useDispatch } from "react-redux";
import Header from "../components/header/Header";
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

const MyApp = ({Component,pageProps,...data}:AppProps)=>{
    // 로그인유지 - 유저정보 받아오기
    const clientData = Object(data).data
    const dispatch = useDispatch();
    useEffect(()=>{
        if(clientData){
            dispatch(userActions.setLoggedUser(clientData))
        }
    },[])
    
    const LoggedUser = useSelector((state:any)=>state.user)

    return(
        <>
            <QueryClientProvider client={queryClient}>
                <Header/>
                <GlobalStyle/>
                <Component {...pageProps}/>
                <div id="root-modal"/>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
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