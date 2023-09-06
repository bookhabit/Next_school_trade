import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import Profile from '../../components/myPage/Profile';
import styled from 'styled-components';

const Container = styled.div`
    height:80vh;
    display: flex; /* 부모 컨테이너를 Flex 컨테이너로 설정 */
    flex-direction: column; /* 자식 컴포넌트를 세로로 나열 */
    justify-content: center; /* 수직 방향으로 가운데 정렬 */
    align-items: center; /* 수평 방향으로 가운데 정렬 */
`;

const profile = () => {
    return (
        <Container>
            <Profile/>
            <LinkFooter/>
        </Container>
    );
};

export default profile;