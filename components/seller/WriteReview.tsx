import React from 'react';
import WriteGradeReview from './WriteGradeReview';
import styled from 'styled-components';

const Container = styled.div`
    padding:40px 20px;
    height:90vh;
    

`

const WriteReview = () => {
    return (
        <Container>
            <WriteGradeReview/>
        </Container>
    );
};

export default WriteReview;