import { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import { RootState, wrapper } from "../store";
import { useSelector } from "react-redux";
import App from "next/app";
import { cookieStringToObject } from "./../lib/utils";
import axios from "../lib/api";
import { useEffect, useState } from "react";
import { userActions } from "../store/user";
import { useDispatch } from "react-redux";
import Header from "../components/header/Header";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LoggedUserType, Users } from "../types/user";
import styled from "styled-components";
import Introduce from "../components/introduce/Introduce";
import palette from "../styles/palette";
import LinkFooter from "../components/footer/LinkFooter";
import UserColor from "../components/introduce/UserColor";
import { UserState } from "../types/reduxState";
import { getUserInfo, meAPI } from "./../lib/api/user";
import { getFavoriteList } from "../lib/api/product";
import { ThemeProvider, createTheme } from "@mui/material";
import Script from "next/script";
import { SocketProvider } from "../context/socket.context";

interface BackgroundColor {
  firstColor: string;
  secondColor: string;
}

const Container = styled.div<BackgroundColor>`
  display: flex;
  justify-content: center;
  height: auto;
  .pc-style {
    display: none;
  }

  @media only screen and (min-width: 430px) {
    background: linear-gradient(
      ${(props) => props.firstColor},
      ${(props) => props.secondColor}
    );
  }
  @media only screen and (min-width: 1023px) {
    .pc-style {
      display: block;
    }
  }
`;

const PcContainer = styled.div`
  width: 430px;
`;

const MobileContainer = styled.div`
  width: 430px;
  background-color: white;
  @media only screen and (max-width: 430px) {
    width: 100%;
  }
  @media only screen and (min-width: 1023px) {
    margin-left: 80px;
  }
`;

// const queryClient = new QueryClient();
const KAKAO_API_KEY = "0292e60416960470863fce8c75ff0a78";
const MyApp = ({ Component, pageProps, ...data }: AppProps) => {
  // 유저정보를 받아서 리덕스 스토어에 저장하기
  const clientData = Object(data).userData as UserState;

  const dispatch = useDispatch();
  const [queryClient] = useState(() => new QueryClient());

  // 사용자가 배경색 지정하기
  const firstColor = useSelector(
    (state: RootState) => state.userBackground.firstColor
  );
  const secondColor = useSelector(
    (state: RootState) => state.userBackground.secondColor
  );

  useEffect(() => {
    if (clientData) {
      dispatch(userActions.setLoggedUser(clientData));
    }
  }, []);

  return (
    <Container firstColor={firstColor} secondColor={secondColor}>
      <Script
        strategy="beforeInteractive"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false&libraries=services`}
      />
      <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyle />
            <PcContainer className="pc-style">
              <Introduce />
            </PcContainer>
            <MobileContainer className="mobile-style">
              <SocketProvider>
                <Header />
                <Component {...pageProps} />
                <div id="root-modal" />
                <ReactQueryDevtools initialIsOpen={false} />
              </SocketProvider>
            </MobileContainer>
            <UserColor />
          </Hydrate>
      </QueryClientProvider>
    </Container>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  console.log(context.ctx.req?.headers.cookie)
  let userData;
  try {
    console.log(cookieObject,'쿠키')
    if (cookieObject.access_token) {
      console.log('user/isLogin 요청')
      const response = await getUserInfo(cookieObject.access_token);
      console.log('클라이언트데이터',response.data)
      userData = response.data;
    }
  } catch (e) {
    console.log(e);
  }
  return { ...appInitialProps, userData };
};

export default wrapper.withRedux(MyApp);
