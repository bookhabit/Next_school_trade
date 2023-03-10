import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import BeforeIcon from "../../public/static/svg/header/commonHeader/beforeIcon.svg"
import HeartIcon from "../../public/static/svg/product/detail_heartIcon.svg"
import DivisionIcon from "../../public/static/svg/product/divisionIcon.svg"
import ModalClickIcon from "../../public/static/svg/product/modal_click_icon.svg"
import DownArrowIcon from "../../public/static/svg/product/down_arrow.svg"
import PositionIcon from "../../public/static/svg/product/position.svg"
import SellerStarIcon from "../../public/static/svg/product/sellerStarIcon.svg"
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Selector from '../common/Selector';
import { makeMoneyString } from '../../lib/utils';
import Slider from "react-slick";
import Item from './Item';
import Slick from './Slick';


const Container = styled.div`
    /* 헤더 css */
    .detail-header{
        position:fixed;
        top:0;
        width:100%;
        height:90px;
        background-color: ${palette.main_color};
        display:flex;
        align-items:center;
        .detail-header-left{
            display:flex;
            align-items:center;
            padding:0px 20px;
            width:100%;
            height:45px;
            p{
                color:${palette.main_text_color};
                font-size:25px;
                font-weight:bold;
            }
            .detail-header-left-icon{
                margin-right:15px;
            }
        }
    }

    .detail-body{
        width:100%;
        padding-top:90px;
        padding-bottom:70px;
        /* 이미지 슬라이드 부분 css */
        .detail-product-image{
            width:100%;
            height:230px;
            border-bottom:1px solid ${palette.divistion_color};
            
            .slick-slider{
                .slick-arrow{
                    display:none !important;
                }
                .slick-list{
                    width:100%;
                    height:230px;
                    .slick-track{
                        width:100%;
                        height:230px;
                        div{
                            width:100%;
                            height:230px;
                            img{
                                width:100%;
                                height:230px;
                                object-fit:fill;
                            }
                        }
                    }
                    img{
                        width:100%;
                        height:auto;
                    }
                }
                .slick-dots{
                    bottom:15px !important;
                }
            } 
        }
        
        /* 판매자 정보 or 셀렉터 및 수정,삭제 */
        .detail-seller-info{
            width:100%;
            height:64px;
            padding:0px 20px;
            display:flex;
            align-items:center;
            justify-content:space-between;
            background-color:#EAEAEA;
            border-bottom:1px solid ${palette.divistion_color};
            .seller-info-left{
                width:110px;
                display:flex;
                align-items:center;
                /* 작성자가 아닐 경우 */
                img{
                    width:30px;
                    height:30px;
                    background-color:${palette.main_text_color};
                    border-radius:50px;
                    margin-right:5px;
                }
                p{
                    font-size:20px;
                    font-weight:bold;
                }
                /* 작성자일경우 */
                select{
                    width: 100%;
                    height: 20px;
                    padding: 0 11px;
                    background-color:#EAEAEA;
                    border:none;
                    outline: none;
                    -webkit-appearance: none;
                    background-image: url("/static/svg/common/selector/selector_down_arrow.svg");
                    background-position: right center;
                    background-repeat: no-repeat;
                    font-size:20px;
                    font-weight:bold;
                    option{
                        font-size:15px;
                        font-weight:bold;
                    }
                }
            }
            .seller-info-right{
             .correct-remove-modal{
                width:80px;
                height:60px;
                background-color:white;
                font-size:13px;
                color:${palette.updatedDate};
                text-align:center;
                padding:15px;
                position:absolute;
                right:40px;
                top: 322px;
                p{
                    margin-bottom:10px;
                }
             }   
            }
        }

        /* 상품 상세 정보 css */
        .detail-product-info{
            width:100%;
            padding:20px;
            .detail-product-title{
                width:100%;
                height:40px;
                background-color:#FBFBFB;
                margin-bottom:10px;
                padding:10px;
                p{
                    font-size:20px;
                    font-weight:bold;
                }
            }
            .detail-product-sub-info{
                display:flex;
                align-items:center;
                justify-content:space-between;
                width:100%;
                height:35px;
                background-color:#FBFBFB;
                margin-bottom:10px;
                padding:0px 10px;
                
                p{
                    font-size:15px;
                    font-weight:bold;
                    color:${palette.updatedDate};
                }
            }
            .detail-product-desc{
                width:100%;
                min-height:180px;
                background-color:#FBFBFB;
                margin-bottom:10px;
                padding:10px;
                p{
                    font-size:16px;
                    line-height:25px;
                }
            }
            .detail-product-position{
                display:flex;
                align-items:center;
                width:100%;
                min-height:55px;
                background-color:#FBFBFB;
                .detail-product-positionIcon{
                    margin:0px 10px;
                }
                p{
                    font-size:15px;
                    font-weight:bold;
                }
            }
        }
    }
    
    /* 푸터 css */
    .detail-footer{
        position:fixed;
        bottom:0;   
        background-color:${palette.main_color};
        width:100%;
        height:70px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        .detail-footer-icon{
            margin-left:20px;
            margin-right:20px;
            .detail-heartIcon{
                margin-right:10px;
            }
        }

        .detail-footer-price{
            font-size:30px;
            font-weight:bold;
            color:${palette.main_text_color};
            flex-grow:1;
        }



        button{
            float:right;
            margin:15px 20px;
            width:100px;
            height:45px;
            background-color:${palette.orange_btn};
            border-radius:50px;
            color:${palette.main_text_color};
            font-size:20px;
            font-weight:bold;
            text-align:center;
            padding:5px;
            line-height: 18px;
        }
    }
`

const SliderItem = styled.div`
  width: 100%;
  img{
    max-width: 100%;
    height: auto;
  }
`

interface IProps{
    testProductDeatail:{
        id:number,
        title:string,
        price:number,
        body:string,
        chat_cnt:number,
        like_cnt:number,
        sellerId:number,
        category:string,
        created_at:string,
        position:string,
        images: itemsProps[],
    }
}

interface itemsProps {
    item: string,
    name: string
}

const ShowProductDetail:React.FC<IProps> = ({testProductDeatail}) => {
    const goToBackpage = ()=>{
        window.history.back();
    }
    // 판매자 정보를 클릭하면 판매자 정보 페이지로 이동하기 - sellerId로 넘기기
    const router= useRouter();
    const goToSellerProfile = ()=>{
        router.push({
            pathname:`/seller/${testProductDeatail.sellerId}`
        })
    }
    
    // 게시글 주인이 아닐 경우 채팅하기 클릭 
    const goToChattingRoom = ()=>{
        router.push({
            pathname:`/user/chatting/[id]`,
            query:{id:testProductDeatail.sellerId}
        })
    }

    // 게시글 주인일 경우 채팅방 클릭
    const goToChattinList = ()=>{
        router.push({
            pathname:`/user/chatting`
        })
    }

    // sellerId값을 통해서 판매자 정보를 받아오고 프로필이미지와 이름을 가져온다
    const testSellerInfo = {
        id:1,
        profileImage:"/static/image/user/default_user_profile_image.jpg",
        userNickname:"제리님",
        sellerStarCount:3,
    }
    
    // 로그인 - 현재 유저 id
    const userId = useSelector((state:any)=>state.user.id)
    // 로그인 되어 있는 사용자의 id와 sellerId를 비교하여 작성자인지 구분하는 변수
    const postOwner = userId === testProductDeatail.sellerId  

    // 수정,삭제 버튼 모달보이기 state
    const [showBtnModal,setShowBtnModal] = useState(false);
    const clickShowBtnModal = ()=>{
        setShowBtnModal(!showBtnModal)
    }

    //  판매자 별점 개수에 따라서 별점아이콘 출력하기
    const starLoop = () => {
        let starCount = []
        for (let i = 0; i < testSellerInfo.sellerStarCount; i++) {
            starCount.push(i)
        }
        return starCount
    };

    const selectOptions = ["판매중","거래완료"]

    return (
        <Container>
            {/* 헤더 */}
            <div className='detail-header'>
                <div className='detail-header-left'>
                    <div className="detail-header-left-icon">
                        <BeforeIcon onClick={goToBackpage}/>
                    </div>
                    <p>{testProductDeatail.title}</p>
                </div>
            </div>
            {/* 본문 */}
            <div className='detail-body'>
            
                <div className='detail-product-image'>
                    <Slick>
                        {testProductDeatail.images.map((item, index) => (
                            <SliderItem key={index}>
                            <img src={item.item} alt={item.name} />
                            </SliderItem>
                        ))}
                    </Slick>
                </div>
                
                <div className='detail-seller-info'>
                    <div className='seller-info-left'>
                        {postOwner
                        ? <>
                            <select name="sell-state" className='sell-state'>
                                <option value="selling">판매중</option>
                                <option value="completed">거래완료</option>
                            </select>
                            
                        </> 
                        : <>
                            <img src={testSellerInfo.profileImage} alt="판매자 프로필이미지"/>
                            <p onClick={goToSellerProfile}>{testSellerInfo.userNickname}</p>
                        </>}
                        
                    </div>
                    <div className='seller-info-right'>
                        {postOwner 
                        ? 
                        <>
                            <ModalClickIcon onClick={clickShowBtnModal}/>
                            {!showBtnModal? null : <div className='correct-remove-modal'>
                                <p className='correct-btn'>수정하기</p>
                                <p className='remove-btn'>삭제하기</p>
                            </div>
                            }
                        </> 
                        :<>{starLoop().map((index)=>(
                            <SellerStarIcon key={index}/>
                        ))}</>
                        }
                    </div>
                </div>
                <div className='detail-product-info'>
                    <div className='detail-product-title'>
                        <p>{testProductDeatail.title}</p>
                    </div>
                    <div className='detail-product-sub-info'>
                        <div className='detail-product-category'>
                            <p>{testProductDeatail.category}</p>
                        </div>
                        <div className='detail-product-updateDate'>
                            <p>{testProductDeatail.created_at}</p>
                        </div>
                    </div>
                    <div className='detail-product-desc'>
                        <p>
                        {testProductDeatail.body}
                        </p>
                    </div>
                    <div className='detail-product-position'>
                        <PositionIcon className="detail-product-positionIcon"/>
                        <p>거래희망장소 : <span>{testProductDeatail.position}</span></p>
                    </div>
                </div>

            </div>
            {/* 푸터 */}
            <div className='detail-footer'>
                <div className="detail-footer-icon">
                    <HeartIcon className="detail-heartIcon"/>
                    <DivisionIcon/>
                </div>
                <p className='detail-footer-price'>
                    {makeMoneyString(String(testProductDeatail.price))} 원
                </p>
                {postOwner ?<button onClick={goToChattinList}>채팅목록</button> :<button onClick={goToChattingRoom}>채팅하기</button> }
            </div>
        </Container>
    );
};

export default ShowProductDetail;