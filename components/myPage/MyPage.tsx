import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import BuyListIcon from "../../public/static/svg/myPage/buyListIcon.svg"
import HeartIcon from "../../public/static/svg/myPage/heartIcon.svg"
import UniversityHatIcon from "../../public/static/svg/myPage/universityHat.svg"
import SellListIcon from "../../public/static/svg/myPage/sellListIcon.svg"
import UniversityAuthIcon from "../../public/static/svg/myPage/universityAuthIcon.svg"
import PassWordIcon from "../../public/static/svg/myPage/passWordIcon.svg"
import MarkerIcon from "../../public/static/svg/myPage/marker.svg"
import useModal from '../../hooks/useModal';
import SetPosition from '../map/SetPosition';
import { useSelector } from 'react-redux';

const Container = styled.div`

    .myUniversity{
        background-color:#F9F8F8;
        width:100%;
        height:130px;
        display:felx;
        justify-content:center;
        align-items:center;
        p{
            font-size:30px;
            font-weight:bold;
        }
        border-bottom:1px solid ${palette.divistion_color};
    }

    .myPageBody{
        width:100%;
        height:auto;
        padding:15px 10px;
        border-bottom:1px solid ${palette.divistion_color};
    }

    .myPageTitle{
        font-size:20px;
        font-weight:bold;
        margin-left:5px;
        margin-bottom:15px;
    }

    .myPage-list{
        display:felx;
        margin-bottom:15px;
        .myPageIcon{
            margin:0px 10px;
            
        }
        p{
            font-size:18px;
            font-weight:600;
            cursor: pointer;
            display:inline-block;
        }
        .sellListIcon{
            margin-left:12px;
            margin-right:15px;
        }
        .markerIcon{
            margin-left:15px;
            margin-right:15px;
        }
        .buyListIcon{
            margin-right:13px;
        }
        .myPage-etcIcon{
            margin-right:13px;
        }
        .profileIcon{
            margin-right:18px;
        }
    }
`

const MyPage = () => {
    const {openModal,ModalPortal,closeModal} = useModal();
    const userId = useSelector((state:any)=>state.user.id)
    
    // 관심목록 라우팅
    const goToFavorite = `/user/favorite/${userId}`
    return (
        <Container>
            <div className='myUniversity'>
                <p>한서대학교</p>
            </div>
            <div className='myTradeList myPageBody'>
                <p className='myPageTitle'>거래목록</p>
                <Link href={goToFavorite} className='myPage-list'>
                    <HeartIcon className='myPageIcon'/>
                    <p>관심목록</p>
                </Link>
                <Link href="/user/sellList/[id]" className='myPage-list'>
                    <SellListIcon className='myPageIcon sellListIcon'/>
                    <p>판매내역</p>
                </Link>
                <Link href="/user/buyList" className='myPage-list'>
                    <BuyListIcon className='myPageIcon buyListIcon'/>
                    <p>구매내역</p>
                </Link>
            </div>
            <div className='myTradeEvaluation myPageBody'>
                <p className='myPageTitle'>거래 평가</p>
                <Link href="/user/tradeReview" className='myPage-list'>
                    <UniversityHatIcon className='myPageIcon'/>
                    <p>나의 거래후기</p>
                </Link>
            </div>
            <div className='myPage-etc myPageBody'>
            <p className='myPageTitle'>기타</p>
                <Link href="/universityAuth" className='myPage-list'>
                    <UniversityAuthIcon className='myPageIcon myPage-etcIcon'/>
                    <p>학교 인증하기</p>
                </Link>
                
                <Link href="/user/profile" className='myPage-list'>
                    <PassWordIcon className='myPageIcon profileIcon'/>
                    <p>프로필 정보</p>
                </Link>
                <div className='myPage-list'>
                    <MarkerIcon className='myPageIcon markerIcon' />
                    <p onClick={openModal}>주 거래 위치 설정하기</p>
                </div>
            </div>
            <ModalPortal>
                <SetPosition closeModal={closeModal}/>
            </ModalPortal>
        </Container>
    );
};

export default MyPage;