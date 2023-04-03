import React from 'react';
import styled from 'styled-components';
import UserReivewList from './UserReviewList';
import { reviewListType } from '../../types/review';
import ReviewCard from '../seller/ReviewCard';
import { Division } from '../common/Division';

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
    .seller-review-preview{
        width:320px;
    }
`
interface IProps{
    reviewList:reviewListType[];
}

const ShowReview:React.FC<IProps> = ({reviewList}) => {    
    console.log('reviewList',reviewList)
    return (
        <Container>
            <div className='trade-review-title'>
                <h2>판매자 님의 거래후기</h2>
            </div>
            <div className='seller-review-preview'>
                <Division/>
                {reviewList ? 
                reviewList.map((review,index)=>(
                    <ReviewCard key={index} reviewList={review}/>    
                ))
                : <h2>거래후기가 없습니다.</h2>}
            </div>
        </Container>
    );
};

export default ShowReview;