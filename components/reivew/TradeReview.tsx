import React from 'react';
import GradeReview from './GradeReview';
import ShowReview from './ShowReview';
import styled from 'styled-components';

const Container = styled.div`
    padding:40px 20px;
`

const TradeReview = () => {
// 내 정보에서 거래후기를 남긴 거래후기글들을 받는 api를 요청한다
const testReview = [
    {
        id:1,
        reviewerProfileImage:"/static/svg/review/userIcon.svg",
        reviewerName:"이성범",
        reviewContent:"시간약속을 잘 지켜서 좋았고 너무 친절했어요!!",
        starCount:5
    },
    {
        id:2,
        reviewerProfileImage:"/static/svg/review/userIcon.svg",
        reviewerName:"차민재",
        reviewContent:"중고인데 물품이 깨끗해서 좋아요!",
        starCount:3
    },
    {
        id:3,
        reviewerProfileImage:"/static/svg/review/userIcon.svg",
        reviewerName:"이성범",
        reviewContent:"믿을만한 사람입니다.",
        starCount:4
    },
    {
        id:4,
        reviewerProfileImage:"/static/svg/review/userIcon.svg",
        reviewerName:"조우제",
        reviewContent:"사람이 착합니다..",
        starCount:2
    }
]
    return (
        <Container>
            <GradeReview reviewList={testReview}/>
            <ShowReview reviewList={testReview}/>
        </Container>
    );
};

export default TradeReview;