import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div`
  @media only screen and (min-width: 430px) {
	    min-height:100vh;
  }
  display:flex;
  justify-content:center;
  align-items:center;
  .data-fetch-fail-box{
    display:flex;
    justify-content:center;
    align-items:center;
    p{
        color:${palette.errorPage};
        font-size:25px;
        font-weight:bold;
    }
  }
`
const FailFetchData = () => {
    return (
        <Container>
            <div className='data-fetch-fail-box'>
                <p>데이터를 불러오는 데 실패하였습니다</p>
            </div>
        </Container>
    );
};

export default FailFetchData;