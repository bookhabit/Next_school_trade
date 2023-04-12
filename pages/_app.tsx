import { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import {  RootState, wrapper } from "../store";
import { useSelector } from 'react-redux';
import App from "next/app";
import { cookieStringToObject } from './../lib/utils';
import axios from "../lib/api";
import { getUserInfo, meAPI } from "../lib/api/auth";
import { useEffect, useState } from "react";
import { userActions } from "../store/user";
import { useDispatch } from "react-redux";
import Header from "../components/header/Header";
import { Hydrate, QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LoggedUserType } from "../types/user";
import styled from "styled-components";
import Introduce from "../components/introduce/Introduce";
import palette from "../styles/palette";
import LinkFooter from "../components/footer/LinkFooter";
import UserColor from "../components/introduce/UserColor";

interface BackgroundColor{
    firstColor:string;
    secondColor:string;
}

const Container = styled.div<BackgroundColor>`
    display:flex;
    justify-content:center;
    height:auto;
    .pc-style{
        display:none;
    }

    @media only screen and (min-width: 430px) {
        background: linear-gradient(${(props)=>props.firstColor}, ${(props)=>props.secondColor});
    }
    @media only screen and (min-width: 1023px) {
        .pc-style{
            display:block;
        }
    }
`

const PcContainer = styled.div`
    width:430px;
`

const MobileContainer = styled.div`
    width:430px;
    background-color:white;
    @media only screen and (max-width: 430px) {
        width:100%;
    }
    @media only screen and (min-width: 1023px) {
        margin-left:80px;
    }
`

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
    
    // 사용자가 배경색 지정하기
    const firstColor = useSelector((state:RootState)=>state.userBackground.firstColor)
    const secondColor = useSelector((state:RootState)=>state.userBackground.secondColor)

    return(
        <Container firstColor={firstColor} secondColor={secondColor}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <GlobalStyle/>
                    <PcContainer className="pc-style">
                        <Introduce/>
                    </PcContainer>
                    <MobileContainer className="mobile-style">
                        <Header/>
                        <Component {...pageProps}/>
                        <div id="root-modal"/>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </MobileContainer>
                    <UserColor/>
                </Hydrate>
            </QueryClientProvider>
        </Container>
    )
}

MyApp.getInitialProps = async (context:AppContext)=>{
    const appInitialProps = await App.getInitialProps(context);
    const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie)
    
    let data
    // try{
    //     if(cookieObject.access_token){
    //         axios.defaults.headers.cookie = cookieObject.access_token;
    //         data = await (await getUserInfo()).data;
    //         console.log('meAPI - data',data)
    //     }
    // }catch(e){
    //     console.log(e)
    // }
    
    return {...appInitialProps,data}
}

export default wrapper.withRedux(MyApp);