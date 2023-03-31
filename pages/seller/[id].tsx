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

const Container = styled.div`
  margin:40px 35px;
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
        font-size:25px;
        font-weight:bold;
        margin-left:15px;
      }
    }
    .seller-grade{
      font-size:20px;
    }
  }
  .seller-profile-link{
    div{
      width:320px;
      height:50px;
    }
  }
  .seller-review-preview{

  }
`

const profile:NextPage = ({id}:any) => {
    console.log('seller의 userId',id)
    const sellerId = id
    const sellerGrade = 4
    // seller의 유저정보를 받아서 데이터를 SellerProfile에 넘겨주고 그에 맞게 정보를 렌더링해준다

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
        <Container>
          <div className='seller-profile'>
            <div className='seller-name-wrap'>
              <div className='profile-icon'>
                <SellerProfileImg/>
              </div>
              <p className='seller-name'>이너런</p>
            </div>
            <div className='seller-grade'>
            {starLoop().map((index)=>(
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
            <div className='seller-review-list'>
              <div className='reviewer-name-wrap'>
                <ReviewerProfileImg/>
                <p className='reviewer-name'>이너런</p>
              </div>
              <div className='review-content'>
                <p>시간약속을 잘 지켜서 너무 좋았어요!</p>
              </div>
            </div>
            <div className='seller-review-list'>
              <div className='reviewer-name-wrap'>
                <ReviewerProfileImg/>
                <p className='reviewer-name'>이너런</p>
              </div>
              <div className='review-content'>
                <p>시간약속을 잘 지켜서 너무 좋았어요!</p>
              </div>
            </div>
            <div className='seller-review-list'>
              <div className='reviewer-name-wrap'>
                <ReviewerProfileImg/>
                <p className='reviewer-name'>이너런</p>
              </div>
              <div className='review-content'>
                <p>시간약속을 잘 지켜서 너무 좋았어요!</p>
              </div>
            </div>
          </div>
          <LinkFooter/>  
        </Container>
    );
};

profile.getInitialProps = async ({query})=>{
  const {id} = query;
  // 이 id값은 seller의 userId를 뜻한다  
  // 이 userId에 해당하는 유저 정보를 받아오는 api를 호출하고 응답받은 데이터를 클라이언트로 넘겨준다
  return {id}
}
export default profile;