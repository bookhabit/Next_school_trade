import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width:310px;
    min-height:90px;
    margin-bottom:30px;
    background-color:#F5F2F2;
    border-radius:10px;
    padding:10px;
    .list-header{
        display:flex;
        margin-top:10px;
        margin-left:10px;
        margin-bottom:5px;
        img{
            margin-right:5px;
        }
        p{
            display:flex;
            align-items:center;
        }
    }
    .list-content{
        padding:10px;
        width:290px;
        min-height:40px;
        background-color:#ECECEC;
        border-radius:10px;
        margin:0 auto;
        p{
            font-size:14px;
            line-height:18px;
        }
    }

`

interface IProps{
    reviewList:{
        id:number;
        reviewerProfileImage:string;
        reviewContent:string;
        reviewerName:string;
    };
}

const UserReivewList:React.FC<IProps> = ({reviewList}) => {
    console.log(reviewList.reviewerProfileImage)
    return (
        <Container>
            <div className='list-header'>
                <img src={reviewList.reviewerProfileImage} alt="리뷰작성자 프로필이미지"/>
                <p>{reviewList.reviewerName}</p>
            </div>
            <div className='list-content'>
                <p>{reviewList.reviewContent}</p>
            </div>
        </Container>
    );
};

export default UserReivewList;