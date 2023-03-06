import React from 'react';
import styled from 'styled-components';
import UserReivewList from './UserReviewList';

const Container = styled.div`
    padding:0px 20px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .trade-review-title{
        background-color:#F5F2F2;
        width:120px;
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
`
const ShowReview = () => {
    // 내 정보에서 거래후기를 남긴 거래후기글들을 받는 api를 요청한다
    const testReview = [
        {
            id:1,
            reviewerProfileImage:"/static/svg/review/userIcon.svg",
            reviewerName:"이성범",
            reviewContent:"시간약속을 잘 지켜서 좋았고 너무 친절했어요!!"
        },
        {
            id:2,
            reviewerProfileImage:"/static/svg/review/userIcon.svg",
            reviewerName:"차민재",
            reviewContent:"중고인데 물품이 깨끗해서 좋아요!"
        },
        {
            id:3,
            reviewerProfileImage:"/static/svg/review/userIcon.svg",
            reviewerName:"이성범",
            reviewContent:"믿을만한 사람입니다."
        },
        {
            id:4,
            reviewerProfileImage:"/static/svg/review/userIcon.svg",
            reviewerName:"조우제",
            reviewContent:"사람이 착합니다.."
        }
    ]

    return (
        <Container>
            <div className='trade-review-title'>
                <h2>거래후기</h2>
            </div>
            {testReview.map((review:any)=>(
                <UserReivewList key={review.id} reviewList={review} />
            ))}
        </Container>
    );
};

export default ShowReview;