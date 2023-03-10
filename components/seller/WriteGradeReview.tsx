import React from 'react';
import styled from 'styled-components';
import StarIcon from "../../public/static/svg/review/star.svg"
import Emtpy_starIcon from "../../public/static/svg/review/emtpy_star.svg"
import { useState } from 'react';
import palette from '../../styles/palette';

const Container = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .grade-box{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        height:125px;
        .star-title{
            background-color:#F5F2F2;
            width:120px;
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
            margin-top:10px;
            svg{
                margin-right:5px;
            }
            .true_main_color{
                path{
                    fill: ${palette.main_color};
                }
            }
        }
    }
 /* 거래후기   */
    .write-review-box{
        width:350px;
        padding:0px 20px;
        margin-top:30px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        .trade-review-title{
            background-color:#F5F2F2;
            width:160px;
            height:40px;
            border-radius:10px;
            display:flex;
            justify-content:center;
            align-items:center;
            margin-bottom:30px;
            h2{
                display:inline-block;
                font-size:25px;
                font-weight:bold;
            }
        }
        .write-review-content{
            width:300px;
            background-color:#F5F2F2;
            padding:10px 20px;
            border-radius:10px;
            textarea{
                width:100%;
                min-height:200px;
                background-color:#F5F2F2;
                border:none;
                font-size:14px;
                &:focus{
                    border:none;
                    outline:none;
                }
            }
        }
        .submit-btn{
            width:300px;
            height:55px;
            background-color:${palette.main_color};
            margin-top:50px;
            border-radius:30px;
            p{
                font-size:25px;
                font-weight:bold;
                color:${palette.main_text_color};
                text-align:center;
                padding-top:15px;
            }
        }
    }

`



const WriteGradeReview = () => {
    // 별점이랑 작성한 거래후기 text를 모아서 판매자의 리뷰정보에 글작성하는 api호출

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
            <div className='grade-box'>
                <div className='star-title'>
                    <h2>평점부여</h2>
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
            </div>
            <div className='write-review-box'>
                    <div className='trade-review-title'>
                        <h2>거래후기 작성</h2>
                    </div>
                    <div className='write-review-content'>
                        <textarea placeholder='거래후기를 남겨주세요'/>
                    </div>
                    <div className='submit-btn'>
                        <p>완료</p>
                    </div>
            </div>
        </Container>
    );
};

export default WriteGradeReview;