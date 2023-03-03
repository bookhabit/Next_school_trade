import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div`
    width:100%;
    height:50px;
    display:flex;
    background-color:#D9D9D9;
    p{
        font-size:20px;
        font-weight:bold;
    }
    .subHeader-left{
        width:195px;
        height:50px;
        display:flex;
        justify-content:space-evenly;
        align-items:center;
    }
    .subHeader-right{
        width:195px;
        height:50px;
        display:flex;
        justify-content:space-evenly;
        align-items:center;
    }
    .active{
        background-color:white;
    }
`

const SubHeader = () => {
    return (
        <Container>
            <div className='subHeader-left active'>
                <p>로그인</p>
            </div>
            <div className='subHeader-right'>
                <p>회원가입</p>
            </div>
        </Container>
    );
};

export default SubHeader;