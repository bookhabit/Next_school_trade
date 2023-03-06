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
        cursor: pointer;
        svg{
            margin-right:5px;
        }
        .true_main_color{
            path{
                fill: ${palette.main_color};
            }
        }
        
}
`



const GradeReview = () => {
    // 별점 기본값 설정
    const [clicked, setClicked] = useState([false, false, false, false, false]);

    // 별점 체크 최종 설정
    const array = [0,1,2,3,4]

    const handleStarClick = (index:any) => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
          clickStates[i] = i <= index ? true : false;
        }
         setClicked(clickStates);
    };

    // 별점 계산
    let score = clicked.filter(Boolean).length;
    

    return (
        <Container>
            <div className='star-title'>
                <h2>평점</h2>
            </div>
            <div className='review-star-box'>
                {array.map((index:any)=>(
                    <StarIcon
                        key={index}
                        onClick={()=>handleStarClick(index)}
                        className={`${clicked[index]}_main_color`}
                        />
                ))}
            </div>
        </Container>
    );
};

export default GradeReview;