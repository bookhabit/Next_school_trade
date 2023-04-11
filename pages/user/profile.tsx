import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import Profile from '../../components/myPage/Profile';
import styled from 'styled-components';

const Container = styled.div`
    min-height:100vh;
`

const profile = () => {
    return (
        <Container>
            <Profile/>
            <LinkFooter/>
        </Container>
    );
};

export default profile;