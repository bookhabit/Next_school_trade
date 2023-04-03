import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import SubHeader from '../../components/header/SubHeader';
import { useState } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import SellerProfileImg from "../../public/static/svg/seller/seller_profileImage.svg"
import ReviewerProfileImg from "../../public/static/svg/seller/reviewer_profileImg.svg"
import { useRouter } from 'next/router';
import SellerStarIcon from "../../public/static/svg/product/sellerStarIcon.svg"
import palette from '../../styles/palette';
import { Division } from '../../components/common/Division';
import ReviewCard from '../../components/seller/ReviewCard';
import { GetReviewList } from '../../lib/api/review';
import { reviewListResponseType } from '../../types/review';

const Container = styled.div`
  margin:40px 35px;
  padding-bottom:30px;
  .seller-profile{
    width:320px;
    height:50px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    .seller-name-wrap{
      display:flex;
      align-items:center;
      .profile-icon{
        width:50px;
        height:50px;
        background-color:${palette.main_color};
        border-radius:50%;
        display:flex;
        justify-content:center;
        align-items:center;
      }
      p{
        font-size:20px;
        font-weight:bold;
        margin-left:15px;
      }
    }
    .seller-grade{
      font-size:20px;
    }
  }
  .seller-profile-link{
    margin-top: 60px;
    div{
      width:310px;
      height:50px;
      background-color:#F5F2F2;
      border-radius:20px;
      margin-bottom:30px;
      display:flex;
      align-items:center;
      justify-content:center;
      p{
        font-size:25px;
        font-weight:bold;
        line-height:40px;
      }
    }
  }
`

const profile:NextPage = ({data}:any) => {
    const reviewList:reviewListResponseType[] = data
    const preViewList = reviewList.slice(0,2)
    const sellerGrade:number = data[0].seller.grade
    const sellerName:string = data[0].seller.nickname
    const sellerId :number = data[0].seller.id

    const router = useRouter();

    //  판매자 별점 개수에 따라서 별점아이콘 출력하기
    const starLoop = () => {
      let starCount = []
      for (let i = 0; i < sellerGrade; i++) {
          starCount.push(i)
      }
      return starCount
    };

    return (
      <>
        <Container>
          <div className='seller-profile'>
            <div className='seller-name-wrap'>
              <div className='profile-icon'>
                <SellerProfileImg/>
              </div>
              <p className='seller-name'>{sellerName}</p>
            </div>
            <div className='seller-grade'>
            {reviewList && starLoop().map((index)=>(
                  <SellerStarIcon key={index}/>
              ))}
            </div>
          </div>
          <div className='seller-profile-link'>
            <div className='goToWriteReview' onClick={()=>router.push(`/seller/${sellerId}/writeReview`)}>
              <p>거래후기 작성하기</p>
            </div>
            <div className='goToSellingProducts' onClick={()=>router.push(`/seller/${sellerId}/sellingProducts`)}>
              <p>이너런 님의 판매상품</p>
            </div>
            <div className='goToSellerReview' onClick={()=>router.push(`/seller/${sellerId}/sellerReview`)}>
              <p>이너런 님의 거래후기</p>
            </div>
            </div>
          <div className='seller-review-preview'>
            <Division/>
            {preViewList ? 
              preViewList.map((review,index)=>(
                <ReviewCard key={index} reviewList={review}/>    
              ))
             : <h2>거래후기가 없습니다.</h2>}
          </div>
        </Container>
        <LinkFooter/>  
      </>
    );
};

profile.getInitialProps = async ({query})=>{
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
export default profile;