import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import BeforeIcon from "../../public/static/svg/header/commonHeader/beforeIcon.svg"
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

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
    const showEditBtn = pathName=== "/user/alarm" || pathName==="/user/chatting" || pathName === "/user/favorite"; 
    const LoggedUser = useSelector((state:any)=>state.user)
    
    const goToBackpage = ()=>{
        window.history.back();
    }

    // 상품 상세페이지 router.query.id로 상품을 불러와서 title제목을 추가해준다 (header에 text로)
    const router= useRouter();
    console.log('commonHeader router',router.query.id)


    const changeURLName = () => {
        switch (pathName) {
          case "/auth":
            return "로그인/회원가입";
          case "/product/register":
            return "상품 등록하기";
          case `/product/[id]`:
            return "상품상세페이지 (게시글제목으로 바꾸기-id값)";
          case "/product/correct":
            return "상품 수정하기";
          case "/setPosition":
            return "거래 위치 설정하기";
          case "/category":
            return "카테고리";
          case "/user":
            return `${LoggedUser.userName}`
          case "/user/alarm":
            return "알림";
          case "/user/favorite":
            return "관심목록";
          case "/user/sellList":
            return "판매내역";
          case "/user/buyList":
            return "구매내역";
          case "/user/chatting":
            return "채팅";
          case "/user/chatting/chattingRoom":
            return "채팅하는 상대방 이름";
          case "/user/tradeReview":
            return "거래후기";
          case "/user/profile":
            return "프로필 정보 수정";
          case "/seller/profile":
            return "판매자이름";
          default:
            return "지정된 페이지 없음";
        }
      };
    
    return (
        <Conatainer>
            <div className='headerDiv'>
                <div className='headerLeft'>
                    <BeforeIcon className="headerLeftIcon" onClick={goToBackpage}/>
                    {pathName==="/user"? <img src={LoggedUser.profileImage} alt="프로필이미지"/>:null}
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