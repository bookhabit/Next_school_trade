import React from 'react';
import GradeReview from './GradeReview';
import ShowReview from './ShowReview';
import styled from 'styled-components';
import { reviewListResponseType } from '../../types/review';

const Container = styled.div`
    padding:40px 20px;
`

interface IProps{
    reviewList:reviewListResponseType[];
    ownerName:string
}

const TradeReview:React.FC<IProps> = ({reviewList,ownerName}) => {
    return (
        <Container>
            <GradeReview reviewList={reviewList}/>
            <ShowReview reviewList={reviewList} ownerName={ownerName}/>
        </Container>
    );
};

export default TradeReview;