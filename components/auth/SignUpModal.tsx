import React from 'react';
import styled from 'styled-components';

const Container = styled.form`
    width:568px;
    height:614px;
    background-color:white;
    z-index:11;
`

const SignUpModal = () => {
    return (
        <Container>
            <h1>Sign Up</h1>
        </Container>
    );
};

export default SignUpModal;