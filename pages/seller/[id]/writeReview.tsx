import React from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import WriteReview from '../../../components/seller/WriteReview';
import styled from 'styled-components';

const Container = styled.div`
    @media only screen and (min-width: 1023px) {
	    min-height:100vh;
    }
`

const writeReview = () => {
    return (
        <Container>
            <WriteReview/>
            <LinkFooter/>  
        </Container>
    );
};

export default writeReview;