import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  @media only screen and (min-width: 430px) {
	    min-height:100vh;
  }
`
const FailFetchData = () => {
    return (
        <Container>
            데이터를 불러오는 데 실패하였습니다.
        </Container>
    );
};

export default FailFetchData;