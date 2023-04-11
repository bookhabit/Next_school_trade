import React from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import TradeReview from '../../../components/reivew/TradeReview';
import { GetServerSideProps, NextPage } from 'next';
import { GetReviewList } from '../../../lib/api/review';
import { reviewListResponseType } from '../../../types/review';
import styled from 'styled-components';

const Container = styled.div`
    min-height:100vh;
`

const tradeReview:NextPage = ({data}:any) => {
    let userReviewList = data
    let ownerName 
    if(!data){
        userReviewList = data
        ownerName = data[0].seller.nickname
    }
    return (
        <Container>
            <TradeReview reviewList={userReviewList} ownerName={ownerName} />
            <LinkFooter/>
        </Container>
    );
};

tradeReview.getInitialProps = async ({query})=>{
    const {id} = query;
    const userId = Number(id)
    try{
        const {data} = await GetReviewList(userId);
        return {data:data}
    }catch(e){
        console.log(e)
    }
    
    return {}
  }

export default tradeReview;