import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div`
    /* 이미지 css */
    

    /* 제목 css */


    /* 가격 css */

    /* 설명 css */


    /* 카테고리 css */

    /* 지도 모달창 연결 css */

    /* 위치 인풋받기 css */


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

const CorrectProduct = () => {
    return (
        <Container>
            <div className='register-image'></div>
            <div className='register-input-title'></div>
            <div className='register-input-price'></div>
            <div className='register-input-desc'></div>
            <div className='register-select-category'></div>
            <div className='register-setPosition-modal'></div>
            <div className='register-setPosition-input'></div>
            <div className='register-footer'>
                <button>수정하기</button>
            </div>
        </Container>
    );
};

export default CorrectProduct;