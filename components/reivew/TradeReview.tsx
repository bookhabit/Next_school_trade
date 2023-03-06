import React from 'react';
import GradeReview from './GradeReview';
import ShowReview from './ShowReview';
import styled from 'styled-components';

const Container = styled.div`
    padding:40px 20px;
`

const TradeReview = () => {

    return (
        <Container>
            <GradeReview/>
            <ShowReview/>
        </Container>
    );
};

export default TradeReview;