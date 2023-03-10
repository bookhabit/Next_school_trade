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
import SetPosition from '../map/setPosition';

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
    return (
        <Container>
            <div className='myUniversity'>
                <p>???????????????</p>
            </div>
            <div className='myTradeList myPageBody'>
                <p className='myPageTitle'>????????????</p>
                <Link href="/user/favorite" className='myPage-list'>
                    <HeartIcon className='myPageIcon'/>
                    <p>????????????</p>
                </Link>
                <Link href="/user/sellList" className='myPage-list'>
                    <SellListIcon className='myPageIcon sellListIcon'/>
                    <p>????????????</p>
                </Link>
                <Link href="/user/buyList" className='myPage-list'>
                    <BuyListIcon className='myPageIcon buyListIcon'/>
                    <p>????????????</p>
                </Link>
            </div>
            <div className='myTradeEvaluation myPageBody'>
                <p className='myPageTitle'>?????? ??????</p>
                <Link href="/user/tradeReview" className='myPage-list'>
                    <UniversityHatIcon className='myPageIcon'/>
                    <p>?????? ????????????</p>
                </Link>
            </div>
            <div className='myPage-etc myPageBody'>
            <p className='myPageTitle'>??????</p>
                <Link href="/universityAuth" className='myPage-list'>
                    <UniversityAuthIcon className='myPageIcon myPage-etcIcon'/>
                    <p>?????? ????????????</p>
                </Link>
                
                <Link href="/user/profile" className='myPage-list'>
                    <PassWordIcon className='myPageIcon profileIcon'/>
                    <p>????????? ??????</p>
                </Link>
                <div className='myPage-list'>
                    <MarkerIcon className='myPageIcon markerIcon' />
                    <p onClick={openModal}>??? ?????? ?????? ????????????</p>
                </div>
            </div>
            <ModalPortal>
                <SetPosition closeModal={closeModal}/>
            </ModalPortal>
        </Container>
    );
};

export default MyPage;