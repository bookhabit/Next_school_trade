import { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import { RootState, wrapper } from "../store";
import { useSelector } from "react-redux";
import App from "next/app";
import { cookieStringToObject } from "./../lib/utils";
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
import styled from "styled-components";
import Introduce from "../components/introduce/Introduce";
import UserColor from "../components/introduce/UserColor";
import { UserState } from "../types/reduxState";
import { getUserInfo, meAPI } from "./../lib/api/user";
import Script from "next/script";
import { SocketProvider } from "../context/socket.context";
import Layout from "../components/Layout";
import ChattingModal from "../components/alarm/ChattingModal";

interface BackgroundColor {
  firstColor: string;
  secondColor: string;
}

const Container = styled.div<BackgroundColor>`
  display: flex;
  justify-content: center;
  height: 100%;
  html,body,#root {
    height: 100%;
    margin: 0;
  }
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
    margin-left: 240px;
  }
  /* 채팅목록 모달창 */
  .chatting-modal {
    position: fixed;
    width:100%;
    bottom: 80px !important;
  }
`;

// const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps, ...data }: AppProps) => {
  // 유저정보를 받아서 리덕스 스토어에 저장하기
  const clientData = Object(data).userData as UserState;
  const dispatch = useDispatch();
  const [queryClient] = useState(() => new QueryClient());
  const loggedUserId = useSelector((state: RootState) => state.user.id);

  // 사용자가 배경색 지정하기
  const firstColor = useSelector(
    (state: RootState) => state.userBackground.firstColor
  );
  const secondColor = useSelector(
    (state: RootState) => state.userBackground.secondColor
  );

  // 채팅알림 색깔
  const chattingModal = useSelector((state:RootState)=>state.chattingAlarm.chattingModal)

  useEffect(() => {
    if (clientData) {
      dispatch(userActions.setLoggedUser(clientData));
    }
  }, []);

  return (
    <Container firstColor={firstColor} secondColor={secondColor}>
      <Script
        strategy="beforeInteractive"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`}
      />
      <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyle />
            <PcContainer className="pc-style">
              <Introduce />
            </PcContainer>
            <MobileContainer className="mobile-style">
              <SocketProvider>
                <Layout>
                  <Header />
                  <Component {...pageProps} />
                  {chattingModal ? (
                    <div className="chatting-modal">
                      <ChattingModal />
                    </div>
                  ) : null}
                </Layout>
                <div id="root-modal" />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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
  
  let userData;
  if (cookieObject.access_token) {
    try {
      const response = await getUserInfo(cookieObject.access_token);
      userData = response.data;
    } catch (e) {
      console.log('토큰(로그인) 유저정보 불러오기 실패',e);
    }
  }
  
  return { ...appInitialProps, userData };
};

export default wrapper.withRedux(MyApp);
