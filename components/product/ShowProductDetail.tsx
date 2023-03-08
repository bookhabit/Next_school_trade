import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import BeforeIcon from "../../public/static/svg/header/commonHeader/beforeIcon.svg"
import HeartIcon from "../../public/static/svg/product/detail_heartIcon.svg"
import DivisionIcon from "../../public/static/svg/product/divisionIcon.svg"
import { useSelector } from 'react-redux';


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