import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import BeforeIcon from "../../public/static/svg/header/commonHeader/beforeIcon.svg"
import HeartIcon from "../../public/static/svg/product/detail_heartIcon.svg"
import DivisionIcon from "../../public/static/svg/product/divisionIcon.svg"
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';


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
        padding-top:90px;
        padding-bottom:70px;
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
        position:string
    }
}

const ShowProductDetail:React.FC<IProps> = ({testProductDeatail}) => {
    console.log('props data',testProductDeatail)
    const goToBackpage = ()=>{
        window.history.back();
    }
    // 로그인 되어 있는 사용자의 id와 sellerId를 비교하여 작성자인지 알 수 있다
    const userId = useSelector((state:any)=>state.user.id) // 로그인 - 현재 유저 id
    const postOwner = userId === testProductDeatail.sellerId  // 게시글 주인의 유저 id


    // 판매자 정보를 클릭하면 판매자 정보 페이지로 이동하기 - sellerId로 넘기기
    const router= useRouter();
    const goToSellerProfile = ()=>{
        router.push({
            pathname:`/seller/${testProductDeatail.sellerId}`
        })
    }

    return (
        <Container>
            <div className='detail-header'>
                <div className='detail-header-left'>
                    <div className="detail-header-left-icon">
                        <BeforeIcon onClick={goToBackpage}/>
                    </div>
                    <p>{testProductDeatail.title}</p>
                </div>
            </div>

            <div className='detail-body'>
                <div className='detail-product-image'></div>
                <div className='detail-seller-info'>
                    <div className='seller-info-left' onClick={goToSellerProfile}>
                        <p>아이콘</p>
                        <p>이현진</p>
                    </div>
                    <div className='seller-info-right'>
                        <p>별점</p>
                    </div>
                </div>
                <div className='detail-product-info'>
                    <div className='detail-product-title'></div>
                    <div className='detail-product-sub-info'>
                        <div className='detail-product-category'></div>
                        <div className='detail-product-updateDate'></div>
                    </div>
                    <div className='detail-product-desc'>
                        <textarea></textarea>
                    </div>
                    <div className='detail-product-position'>
                        <p>아이콘</p>
                        <p>거래희망장소 : </p>
                    </div>
                </div>

            </div>



            <div className='detail-footer'>
                <div className="detail-footer-icon">
                    <HeartIcon className="detail-heartIcon"/>
                    <DivisionIcon/>
                </div>
                <p className='detail-footer-price'>{testProductDeatail.price} 원</p>
                {postOwner ?<button>채팅방</button> :<button>채팅하기</button> }
                
            </div>
        </Container>
    );
};

export default ShowProductDetail;