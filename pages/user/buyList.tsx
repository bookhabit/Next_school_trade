import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import BuyList from '../../components/myPage/BuyList';
import styled from 'styled-components';

const Container = styled.div`
	@media only screen and (min-width: 430px) {
	    min-height:100vh;
    }
`

const buyList = () => {
    return (
        <Container>
            <BuyList/>
            <LinkFooter/>        
        </Container>
    )
};

export default buyList;