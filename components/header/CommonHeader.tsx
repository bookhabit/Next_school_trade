import React, { useEffect, useState } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import BeforeIcon from "../../public/static/svg/header/commonHeader/beforeIcon.svg";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../store";
import ProfileUserIcon from "../../public/static/svg/myPage/ProfileUserIcon.svg";
import { getUserName } from "../../lib/api/user";
import { Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSocket } from "../../context/socket.context"
import axios from "../../lib/api";
import { RoomType } from "../../pages/user/chatting/[id]";

const Conatainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  max-width: 430px;
  height: 100px;
  background-color: ${palette.main_color};
  display: flex;
  align-items: center;
  .headerDiv {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    width: 100%;
    height: 45px;
    color: ${palette.main_text_color};
    font-size: 25px;
    font-weight: bold;

    .headerLeft {
      display: flex;
      align-items: center;
      .profile-image-wrapper {
        /* background: ${palette.main_text_color};
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px; */
      }
    }
    .headerLeftIcon {
      margin-right: 10px;
      cursor: pointer;
    }
  }
`;
interface IProps {
  pathName: string;
}

const CommonHeader: React.FC<IProps> = ({ pathName }) => {
  // 알림페이지,카테고리페이지,채팅방페이지 는 편집 버튼 생성
  const showEditBtn =
    pathName === "/user/alarm" ||
    pathName === "/user/chatting" ||
    pathName === "/user/favorite/[id]";

  const LoggedUser = useSelector((state: RootState) => state.user);

  const goToBackpage = () => {
    window.history.back();
  };

  const router = useRouter();
  const {socket} = useSocket();

  // sellerName 가져오기
  const [sellerName, setSellerName] = useState<string>("");
  const [chatOpponentName,setChatOpponentName] = useState("");

  useEffect(()=>{
    // 판매자 페이지의 sellerName가져오기
    const sellerId = Number(router.query.id);
    const getSellerNameAPI = async () => {
      // sellerId로 api호출
      const response = await getUserName(sellerId);
      setSellerName(response.data);
    };
    if (
      pathName === "/seller/[id]" ||
      pathName === "/seller/[id]/sellerReview" ||
      pathName === "/seller/[id]/sellingProducts"
    ) {
      getSellerNameAPI();
    }
  },[])

  useEffect(()=>{
    // 채팅방 페이지의 상대방 이름 가져오기
    const getCahttingOpponentNameAPI = async () => {
      const roomId = router.query.id
      const roomInfo:RoomType = await axios.get(`/room/${roomId}`).then((response)=>response.data)
      // seller_id 와 loggin_Id 가 일치하다면 (판매자라면 구매자 이름 보여주기)
      
      if(LoggedUser.id === Number(roomInfo.seller_id)){
        const response = await getUserName(Number(roomInfo.buyer_id));
        setChatOpponentName(response.data);
      }
      if(LoggedUser.id === Number(roomInfo.buyer_id)){
        const response = await getUserName(Number(roomInfo.seller_id));
        setChatOpponentName(response.data);
      }
    };

    if(pathName === "/user/chatting/room/[id]"){
      getCahttingOpponentNameAPI();
    }

  },[LoggedUser,socket,router.query.id])

  const changeURLName = () => {
    switch (pathName) {
      case "/auth":
        return "로그인/회원가입";
      case "/oauth/callback/kakao":
        return "카카오 로그인 중";
      case "/product/register":
        return "상품 등록하기";
      case "/product/modify":
        return "상품 수정하기";
      case "/setPosition":
        return "거래 위치 설정하기";
      case "/category":
        return "카테고리";
      case "/user":
        return `${LoggedUser.name}`;
      case "/user/alarm":
        return "알림";
      case "/user/favorite/[id]":
        return "관심목록";
      case "/user/sellList/[id]":
        return "판매내역";
      case "/user/buyList/[id]":
        return "구매내역";
      case "/user/chatting/[id]":
        return "채팅";
      case "/user/chatting/room/[id]":
        return `${chatOpponentName}`;
      case "/user/tradeReview/[id]":
        return "거래후기";
      case "/user/profile":
        return "프로필 정보 수정";
      case "/seller/[id]":
        return `${sellerName} 님의 프로필`;
      case "/seller/[id]/sellerReview":
        return `${sellerName} 님의 거래후기`;
      case "/seller/[id]/writeReview":
        return `거래후기 작성`;
      case "/seller/[id]/sellingProducts":
        return `${sellerName} 님의 판매상품`;
      default:
        return "페이지를 찾을 수 없습니다";
    }
  };

  return (
    <Conatainer>
      <div className="headerDiv">
        <div className="headerLeft">
          <BeforeIcon className="headerLeftIcon" onClick={goToBackpage} />
          {pathName === "/user" ? (
            LoggedUser.profileImage?.path?
            <Avatar
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${LoggedUser.profileImage?.path}`}
              alt="판매자 프로필"
              sx={{ width: 35, height: 35, bgcolor: grey[50], mr: 1 }}
            />
             :
            null
          ) : null}
          <p>{changeURLName()}</p>
        </div>
        <div className="headerRight">{showEditBtn ? <p>편집</p> : null}</div>
      </div>
    </Conatainer>
  );
};

export default CommonHeader;
