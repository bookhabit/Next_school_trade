import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div`
    
    /* 푸터 css */
    .register-footer{
        position:fixed;
        bottom:0;   
        background-color:${palette.main_color};
        width:100%;
        height:70px;
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
    return (
        <Container>
            




            <div className='register-footer'>
                {/* 하트이콘,가격 푸터에 추가하기 - flex필요 */}
                <p>아이콘 넣기</p>
                {/* <p>{testProductDeatail.price}</p> */}
                <button>채팅하기</button>
            </div>
        </Container>
    );
};

export default ShowProductDetail;