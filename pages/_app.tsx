import { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import {  RootState, wrapper } from "../store";
import { useSelector } from 'react-redux';
import App from "next/app";
import { cookieStringToObject } from './../lib/utils';
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";
import { useEffect, useState } from "react";
import { userActions } from "../store/user";
import { useDispatch } from "react-redux";
import Header from "../components/header/Header";
import { Hydrate, QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LoggedUserType } from "../types/user";

// const queryClient = new QueryClient();

const MyApp = ({Component,pageProps,...data}:AppProps)=>{
    // 로그인유지 - 유저정보 받아오기
    const clientData = Object(data).data as LoggedUserType
    const dispatch = useDispatch();
    console.log('_app.tsx',clientData)
    useEffect(()=>{
        if(clientData){
            dispatch(userActions.setLoggedUser(clientData.user))
        }
    },[])
    const LoggedUser = useSelector((state:RootState)=>state.user)

    const [queryClient] = useState(() => new QueryClient());
    

    return(
        <>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Header/>
                    <GlobalStyle/>
                    <Component {...pageProps}/>
                    <div id="root-modal"/>
                    <ReactQueryDevtools initialIsOpen={false} />
                </Hydrate>
            </QueryClientProvider>
        </>
    )
}

MyApp.getInitialProps = async (context:AppContext)=>{
    const appInitialProps = await App.getInitialProps(context);
    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie)
    console.log('cookieObject',cookieObject)
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