import React from 'react';
import styled from 'styled-components';
import { reviewListResponseType, reviewListType } from '../../types/review';
import ReviewCard from '../seller/ReviewCard';
import { Division } from '../common/Division';
import FailFetchData from '../common/FailFetchData';

const Container = styled.div`
    padding:0px 20px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .trade-review-title{
        background-color:#F5F2F2;
        width:320px;
        height:50px;
        border-radius:10px;
        display:flex;
        justify-content:center;
        align-items:center;
        margin-bottom:30px;
        h2{
            display:inline-block;
            font-size:20px;
            font-weight:bold;
        }
    }
    .seller-review-preview{
        width:320px;
    }
`
interface IProps{
    reviewList:reviewListResponseType[];
    ownerName:string;
}

const ShowReview:React.FC<IProps> = ({reviewList,ownerName}) => {    
    console.log('ownerName',ownerName)
    return (
        <Container>
            <div className='trade-review-title'>
                <h2>{ownerName} 님의 거래후기</h2>
            </div>
            <div className='seller-review-preview'>
                <Division/>
                {reviewList ? 
                reviewList.map((review,index)=>(
                    <ReviewCard key={index} reviewList={review}/>    
                ))
                : <FailFetchData/>}
            </div>
        </Container>
    );
};

export default ShowReview;