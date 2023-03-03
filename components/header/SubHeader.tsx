import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { useState, useRef } from 'react';

const Container = styled.div<{currentLeft:boolean}>`
    width:100%;
    height:50px;
    display:flex;
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
        cursor: pointer;
        background-color:${props=>props.currentLeft? "#FFFFFF" :"#D9D9D9"}
    }
    .subHeader-right{
        width:195px;
        height:50px;
        display:flex;
        justify-content:space-evenly;
        align-items:center;
        cursor: pointer;
        background-color:${props=>props.currentLeft?"#D9D9D9" :"#FFFFFF" }
    }
    .active{
        background-color:white;
    }
`

const SubHeader = () => {
    // currentLeft에 따라서 UI가 바뀌고 다른 정보를 가져오면 된다
    const [currentLeft,setCurrentLeft] = useState(true);
    const changeCurrent = ()=>{
        setCurrentLeft(!currentLeft)
    }
    console.log(currentLeft)
    return (
        <Container currentLeft={currentLeft}>
            <div className='subHeader-left' onClick={changeCurrent}>
                <p>로그인</p>
            </div>
            <div className='subHeader-right' onClick={changeCurrent}>
                <p>회원가입</p>
            </div>
        </Container>
    );
};

export default SubHeader;