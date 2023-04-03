import React from 'react';
import GradeReview from './GradeReview';
import ShowReview from './ShowReview';
import styled from 'styled-components';

const Container = styled.div`
    padding:40px 20px;
    width:100%;
`

const TradeReview = () => {
// 내 정보에서 거래후기를 남긴 거래후기글들을 받는 api를 요청한다
const reviewList = [
    {
      reviewer_profileImg:"/static/svg/seller/reviewer_profileImg.svg",
      reviewer_name:"이너런",
      reviewer_content:"시간 약속을 잘 지켜서 너무 좋아요"
    },
    {
      reviewer_profileImg:"/static/svg/seller/reviewer_profileImg.svg",
      reviewer_name:"이현진",
      reviewer_content:"가격이 합리적이에요"
    },
    {
      reviewer_profileImg:"/static/svg/seller/reviewer_profileImg.svg",
      reviewer_name:"김상원",
      reviewer_content:"사람 좋아요"
    }
  ]
    return (
        <Container>
            <GradeReview reviewList={reviewList}/>
            <ShowReview reviewList={reviewList}/>
        </Container>
    );
};

export default TradeReview;