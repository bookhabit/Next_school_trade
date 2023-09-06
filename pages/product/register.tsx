import React from 'react';
import RegisterProduct from '../../components/product/RegisterProduct';
import styled from 'styled-components';

const Container = styled.div`
`

const register = () => {
    return (
        <Container>
            <RegisterProduct/>
        </Container>
    );
};

export default register;