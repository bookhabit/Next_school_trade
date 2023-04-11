import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import MyPage from '../../components/myPage/MyPage';
import styled from 'styled-components';

const Container = styled.div`
	@media only screen and (min-width: 430px) {
	    min-height:100vh;
    }
`

const myPage = () => {
    return (
        <Container>
            <MyPage/>
            <LinkFooter/>
        </Container>
    );
};

export default myPage;