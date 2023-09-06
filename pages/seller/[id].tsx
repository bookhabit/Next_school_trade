import React from "react";
import LinkFooter from "../../components/footer/LinkFooter";
import SubHeader from "../../components/header/SubHeader";
import { useState } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import SellerProfileImg from "../../public/static/svg/seller/seller_profileImage.svg";
import ReviewerProfileImg from "../../public/static/svg/seller/reviewer_profileImg.svg";
import { useRouter } from "next/router";
import SellerStarIcon from "../../public/static/svg/product/sellerStarIcon.svg";
import palette from "../../styles/palette";
import { Division } from "../../components/common/Division";
import ReviewCard from "../../components/seller/ReviewCard";
import { GetReviewList } from "../../lib/api/review";
import { reviewListResponseType } from "../../types/review";
import { isEmpty } from "lodash";
import DataNull from "../../components/common/DataNull";
import FailFetchData from "../../components/common/FailFetchData";
import { Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";

const Container = styled.div`
  margin: 40px 35px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items:center;
  
  .seller-profile {
    width: 320px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .seller-name-wrap {
      display: flex;
      align-items: center;
      p {
        font-size: 20px;
        font-weight: bold;
        margin-left: 15px;
      }
    }
    .seller-grade {
      font-size: 20px;
    }
  }
  .seller-profile-link {
    margin-top: 60px;
    div {
      min-width: 310px;
      min-height: 50px;
      background-color: #f5f2f2;
      border-radius: 20px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: #dddddd;
        cursor: pointer;
      }
      p {
        font-size: 18px;
        font-weight: bold;
        line-height: 40px;
      }
    }
  }
`;

const profile: NextPage = ({ data }: any) => {
  console.log("판매자프로필 data", data);
  const reviewList: reviewListResponseType[] = data;
  if (isEmpty(reviewList)) {
    return <FailFetchData />;
  }
  const preViewList = reviewList.slice(0, 2);
  const sellerGrade: number = data[0].seller.grade;
  const sellerName: string = data[0].seller.nickname;
  const sellerId: number = data[0].seller.id;
  const sellerProfileImg = data[0].seller.profileImage.path;

  const router = useRouter();

  //  판매자 별점 개수에 따라서 별점아이콘 출력하기
  const starLoop = () => {
    let starCount = [];
    for (let i = 0; i < sellerGrade; i++) {
      starCount.push(i);
    }
    return starCount;
  };

  return (
    <>
      <Container>
        <div className="seller-profile">
          <div className="seller-name-wrap">
            <Avatar
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${sellerProfileImg}`}
              alt="판매자 프로필"
              sx={{ width: 35, height: 35, bgcolor: grey[50] }}
            />
            <p className="seller-name">{sellerName}</p>
          </div>
          <div className="seller-grade">
            {reviewList &&
              starLoop().map((index) => <SellerStarIcon key={index} />)}
          </div>
        </div>
        <div className="seller-profile-link">
          <div
            className="goToWriteReview"
            onClick={() => router.push(`/seller/${sellerId}/writeReview`)}
          >
            <p>거래후기 작성하기</p>
          </div>
          <div
            className="goToSellingProducts"
            onClick={() => router.push(`/seller/${sellerId}/sellingProducts`)}
          >
            <p>{sellerName}님의 판매상품</p>
          </div>
          <div
            className="goToSellerReview"
            onClick={() => router.push(`/seller/${sellerId}/sellerReview`)}
          >
            <p>{sellerName}님의 거래후기</p>
          </div>
        </div>
        <div className="seller-review-preview">
          <Division />
          {preViewList ? (
            preViewList.map((review, index) => (
              <ReviewCard key={index} reviewList={review} />
            ))
          ) : (
            <DataNull text="아직 거래후기가 없습니다" />
          )}
        </div>
      </Container>
      <LinkFooter />
    </>
  );
};

profile.getInitialProps = async ({ query }) => {
  const { id } = query;
  const userId = Number(id);
  try {
    const { data } = await GetReviewList(userId);
    return { data: data };
  } catch (e) {
    console.log(e);
  }

  return {};
};
export default profile;
