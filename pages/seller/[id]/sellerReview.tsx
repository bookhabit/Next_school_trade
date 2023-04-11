import React from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import TradeReview from '../../../components/reivew/TradeReview';
import { NextPage } from 'next';
import { GetReviewList } from '../../../lib/api/review';
import { reviewListResponseType } from '../../../types/review';
import styled from 'styled-components';

const Container = styled.div`
    @media only screen and (min-width: 430px) {
	    min-height:100vh;
    }
`

const sellerReview:NextPage = ({data}:any) => {
    const reviewList=data
    const ownerName = data[0].seller.nickname
    // if(!data){
    //     ownerName = data[0].seller.nickname
    // }

    return (
        <Container>
            <TradeReview reviewList={reviewList} ownerName={ownerName}/>
            <LinkFooter/>  
        </Container>
    );
};

sellerReview.getInitialProps = async ({query})=>{
    const {id} = query;
    const userId = Number(id)
    console.log(userId)
    try{
        const {data} = await GetReviewList(userId);
        return {data:data}
    }catch(e){
        console.log(e)
    }
    
    return {}
  }

export default sellerReview;