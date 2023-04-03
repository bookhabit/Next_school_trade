import React from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import TradeReview from '../../../components/reivew/TradeReview';
import { GetServerSideProps, NextPage } from 'next';
import { GetReviewList } from '../../../lib/api/review';
import { reviewListResponseType } from '../../../types/review';

const tradeReview:NextPage = ({data}:any) => {
    const userReviewList = data
    const ownerName = data[0].seller.nickname
    return (
        <>
            <TradeReview reviewList={userReviewList} ownerName={ownerName} />
            <LinkFooter/>
        </>
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