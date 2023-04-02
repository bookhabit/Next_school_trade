import React from 'react';
import ReviewerProfileImg from "../../public/static/svg/seller/reviewer_profileImg.svg"
import styled from 'styled-components';
import palette from '../../styles/palette';
import { Division } from '../common/Division';

const Container = styled.div`
    .seller-review-list{
      width:100%;
      height:90px;
      margin:0px 20px;
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
type reviewListType = {
    reviewer_profileImg:string;
    reviewer_name:string;
    reviewer_content:string;
}

interface IProps{
    reviewList:reviewListType
}

const ReviewCard:React.FC<IProps> = ({reviewList}) => {
    return (
        <Container>
            <Division/>
            <div className='seller-review-list'>
              <div className='reviewer-name-wrap'>
                <div className='reviewer-profile-img'>
                    <img src={reviewList.reviewer_profileImg} alt="리뷰작성자 프로필 이미지"/>
                  {/* <ReviewerProfileImg/> */}
                </div>
                <p className='reviewer-name'>{reviewList.reviewer_name}</p>
              </div>
              <div className='review-content'>
                <p>{reviewList.reviewer_content}</p>
              </div>
            </div>
        </Container>
    );
};

export default ReviewCard;