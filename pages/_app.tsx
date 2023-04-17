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
import { LoggedUserType, Users } from "../types/user";
import styled from "styled-components";
import Introduce from "../components/introduce/Introduce";
import palette from "../styles/palette";
import LinkFooter from "../components/footer/LinkFooter";
import UserColor from "../components/introduce/UserColor";
import { UserState } from "../types/reduxState";

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

const MyApp = ({Component,pageProps}:AppProps)=>{
    const dispatch = useDispatch();
    const [queryClient] = useState(() => new QueryClient());

    const getCookieUser = async ()=>{
        try{
            const response = await meAPI() as UserState
            return response
        }catch(e){
            console.log('meAPI실패')
            console.log(e)
        }
    }
    
    // 사용자가 배경색 지정하기
    const firstColor = useSelector((state:RootState)=>state.userBackground.firstColor)
    const secondColor = useSelector((state:RootState)=>state.userBackground.secondColor)

    useEffect(()=>{
        getCookieUser().then((data) => {
            if (data) { // Add a check for undefined values
              dispatch(userActions.setLoggedUser(data as UserState)) // Cast data to UserState
            }
          }).catch((e) => {
            console.log('meAPI실패')
            console.log(e)
          })
    },[])

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
    
    return {...appInitialProps}
}

export default wrapper.withRedux(MyApp);