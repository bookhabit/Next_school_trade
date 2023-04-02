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
        width:320px;
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
interface IProps{
    reviewList:Object[];
}

const ShowReview:React.FC<IProps> = ({reviewList}:any) => {    
    console.log(reviewList.reviewerName)
    return (
        <Container>
            <div className='trade-review-title'>
                <h2>{reviewList && reviewList.reviewerName} 님의 거래후기</h2>
            </div>
            {reviewList.map((review:any)=>(
                <UserReivewList key={review.id} reviewList={review} />
            ))}
        </Container>
    );
};

export default ShowReview;