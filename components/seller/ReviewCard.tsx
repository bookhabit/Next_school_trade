import React from 'react';
import ReviewerProfileImg from "../../public/static/svg/seller/reviewer_profileImg.svg"
import styled from 'styled-components';
import palette from '../../styles/palette';
import { Division } from '../common/Division';
import { reviewListResponseType, reviewListType } from '../../types/review';

const Container = styled.div`
    .seller-review-list{
      width:100%;
      height:auto;
      margin:20px;
      .reviewer-name-wrap{
        display:flex;
        align-items:center;
        /* 리뷰 작성자 프로필 이미지 */
        .reviewer-profile-img{
          width:25px;
          height:25px;
          background-color:${palette.main_color};
          border-radius:50%;
          display:flex;
          justify-content:center;
          align-items:center;
        }
        /* 리뷰 작성자 닉네임 */
        p{
          margin-left:5px;
          font-size:18px;
          font-weight:bold;
        }
      }
      .review-content{
        margin-top:20px;
        font-size:16px;
      }
    }
`

interface IProps{
    reviewList:reviewListResponseType
}

const ReviewCard:React.FC<IProps> = ({reviewList}) => {
    return (
        <Container>
            <div className='seller-review-list'>
              <div className='reviewer-name-wrap'>
                <div className='reviewer-profile-img'>
                    <img src={"/static/svg/seller/reviewer_profileImg.svg"} alt="리뷰작성자 프로필 이미지"/>
                </div>
                <p className='reviewer-name'>{reviewList.buyer.nickname}</p>
              </div>
              <div className='review-content'>
                <p>{reviewList.review}</p>
              </div>
            </div>
            <Division/>
        </Container>
    );
};

export default ReviewCard;