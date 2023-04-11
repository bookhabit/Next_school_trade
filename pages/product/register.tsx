import React from 'react';
import RegisterProduct from '../../components/product/RegisterProduct';
import styled from 'styled-components';

const Container = styled.div`
    @media only screen and (min-width: 430px) {
	    min-height:100vh;
    }
`

const register = () => {
    return (
        <Container>
            <RegisterProduct/>
        </Container>
    );
};

export default register;