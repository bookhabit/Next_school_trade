import React from 'react';
import styled from 'styled-components';
import StarIcon from "../../public/static/svg/review/star.svg"
import Emtpy_starIcon from "../../public/static/svg/review/emtpy_star.svg"
import { useState } from 'react';
import palette from '../../styles/palette';

const Container = styled.div`
    width:100%;
    height:125px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .star-title{
        background-color:#F5F2F2;
        width:60px;
        height:40px;
        border-radius:10px;
        display:flex;
        justify-content:center;
        align-items:center;
        h2{
            display:inline-block;
            font-size:25px;
            font-weight:bold;
        }
    }
    .review-star-box{
        width:230px;
        height:55px;
        display:flex;
        justify-content:center;
        align-items:center;
        margin-top:10px;
        cursor: pointer;
        h2{
            font-size:30px;
            color:${palette.main_color}
        }
        
}
`
interface IProps{
    reviewList:Object[];
}


const GradeReview:React.FC<IProps> = ({reviewList}) => {
    // 전달받은 리스트에서 총 평점 점수를 렌더링한다
    const starCount = reviewList;
   
    return (
        <Container>
            <div className='star-title'>
                <h2>평점</h2>
            </div>
            <div className='review-star-box'>
                <h2>4.5 점</h2>
            </div>
        </Container>
    );
};

export default GradeReview;