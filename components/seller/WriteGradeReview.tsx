import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import StarIcon from "../../public/static/svg/review/star.svg"
import Emtpy_starIcon from "../../public/static/svg/review/emtpy_star.svg"
import { useState } from 'react';
import palette from '../../styles/palette';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from '../common/Button';

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
            margin-top:50px;
        }
    }

`

type registerForm = {
    grade:number;
    review:string;
}

const WriteGradeReview = () => {
    // sellerId 구하기
    const router = useRouter();
    const sellerId = Number(router.query.id)

    // 거래후기
    const [review,setReview] = useState<string>('')
    
    const onChangeReview = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        setReview(e.target.value)
    }
    
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
    let score:number = clicked.filter(Boolean).length;

    // 최종 폼데이터
    const submitData:registerForm = {
        grade:score,
        review:review
    }

    const createReview = async ()=>{
        // 폼 검증
        if(score<=0 || review==''){
            return false
        }
        // 리뷰작성 api 호출
        try{
            const res = await axios.post(`http://localhost:4000/review/create/${sellerId}`, 
            submitData,
            {
                withCredentials: true,
            }
            );
            console.log('res데이터',res)
            // 라우팅 - 리뷰리스트 페이지로 
            if(res.status===201){
                Swal.fire({
                    title: res.statusText,
                    text: '리뷰가 작성되었습니다',
                    icon: 'success',
                })
                router.push(`/seller/${sellerId}`)
            }
        }catch(e){
            console.log(e)
        }
    }

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
                        <textarea 
                            placeholder='거래후기를 남겨주세요'
                            value={review}
                            onChange={onChangeReview}
                        />
                    </div>
                    <div className='submit-btn' onClick={createReview}>
                        <Button width='300px' height='55px' radius='30px'>작성하기</Button>
                    </div>
            </div>
        </Container>
    );
};

export default WriteGradeReview;