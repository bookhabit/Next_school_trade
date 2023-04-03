import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import BeforeIcon from "../../public/static/svg/header/commonHeader/beforeIcon.svg"
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../store';

const Conatainer = styled.div`
    position:sticky;
    top:0;
    width:100%;
    height:90px;
    background-color: ${palette.main_color};
    display:flex;
    align-items:center;

    .headerDiv{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:0px 20px;
        width:100%;
        height:45px;
        color:${palette.main_text_color};
        font-size:25px;
        font-weight:bold;

        .headerLeft{
            display:flex;
            align-items:center;
            img{
              width:35px;
              height:35px;
              color:${palette.main_text_color};
              margin-right:10px;
            }
        }
        .headerLeftIcon{
            margin-right:15px;
        }
    }
`
interface IProps {
    pathName: string;
  }
  

const CommonHeader:React.FC<IProps> = ({pathName}) => {
    // 알림페이지,카테고리페이지,채팅방페이지 는 편집 버튼 생성
    const showEditBtn = pathName=== "/user/alarm" || pathName==="/user/chatting" || pathName === "/user/favorite/[id]"; 
    
    const LoggedUser = useSelector((state:RootState)=>state.user)
    
    const goToBackpage = ()=>{
        window.history.back();
    }
    
    const router = useRouter();
    // 이 sellerId 값으로 유저정보를 불러오는 api호출하고 유저의 이름으로 바꿔준다
    const sellerId = router.query.id 
    // case "/seller/[id]":
    const testSellerNameForProfile = "이너런"

    // case "/user/chatting/[id]":
    const testSellerNameForChatting = "이너런"

    const changeURLName = () => {
        switch (pathName) {
          case "/auth":
            return "로그인/회원가입";
          case "/product/register":
            return "상품 등록하기";
          case "/product/correct":
            return "상품 수정하기";
          case "/setPosition":
            return "거래 위치 설정하기";
          case "/category":
            return "카테고리";
          case "/user":
            return `${LoggedUser.name}`
          case "/user/alarm":
            return "알림";
          case "/user/favorite/[id]":
            return "관심목록";
          case "/user/sellList/[id]":
            return "판매내역";
          case "/user/buyList":
            return "구매내역";
          case "/user/chatting":
            return "채팅";
          case "/user/chatting/[id]":
            return `${testSellerNameForChatting}`;
          case "/user/tradeReview/[id]":
            return "거래후기";
          case "/user/profile":
            return "프로필 정보 수정";
          case "/seller/[id]":
            return `${testSellerNameForProfile} 님의 프로필`;
          case "/seller/[id]/sellerReview":
            return `${testSellerNameForProfile} 님의 거래후기`;
          case "/seller/[id]/writeReview":
            return `거래후기 작성`;
          case "/seller/[id]/sellingProducts":
              return `${testSellerNameForProfile} 님의 판매상품`;
          default:
            return "지정된 페이지 없음";
        }
      };
    
    return (
        <Conatainer>
            <div className='headerDiv'>
                <div className='headerLeft'>
                    <BeforeIcon className="headerLeftIcon" onClick={goToBackpage}/>
                    {pathName=== "/user" ? <img src={LoggedUser.profileImage} alt="프로필이미지"/>:null}
                    <p>{changeURLName()}</p>
                </div>
                <div className='headerRight'>
                    {showEditBtn ?<p>편집</p> :null}
                </div>
            </div>
        </Conatainer>
    );
};

export default CommonHeader;