import React from 'react'
import { AppContext, AppProps,AppInitialProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import {  wrapper } from "../store";
import { useSelector } from 'react-redux';
import { cookieStringToObject } from './../lib/utils';
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";
import { useEffect } from "react";
import { userActions } from "../store/user";
import { useDispatch } from "react-redux";
import Header from "../components/header/Header";
import { QueryClient,QueryClientProvider,Hydrate } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const MyApp = ({Component,pageProps,...data}:AppProps)=>{
    // 리액트쿼리 하이드레이션
    const queryClientRef = React.useRef<QueryClient>()
    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient()
    }
    // 로그인유지 - 유저정보 받아오기
    // const clientData = Object(data).data
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     if(clientData){
    //         dispatch(userActions.setLoggedUser(clientData))
    //     }
    // },[])
    
    // const LoggedUser = useSelector((state:any)=>state.user)

    return(
        <>
            <QueryClientProvider client={queryClientRef.current}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Header/>
                    <GlobalStyle/>
                    <Component {...pageProps}/>
                    <div id="root-modal"/>
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    )
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps>=>{
    let pageProps = {}

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }
    // const appInitialProps = await App.getInitialProps(context);
    // const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie)
    // let data
    // try{
    //     if(cookieObject.access_token){
    //         axios.defaults.headers.cookie = cookieObject.access_token;
    //         data = await (await meAPI()).data;
    //     }
    // }catch(e){
    //     console.log(e)
    // }
    
    return {pageProps }
}

export default wrapper.withRedux(MyApp);