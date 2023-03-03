import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
interface IProps{
    currentLeft:boolean
    setCurrentLeft:Function
}

const SubHeader:React.FC<IProps> = ({currentLeft,setCurrentLeft}) => {
    // currentLeft에 따라서 UI가 바뀌고 다른 정보를 가져오면 된다
    const changeCurrent = ()=>{
        setCurrentLeft(!currentLeft)
    }
    // left,right를 페이지의 props마다 다른 text로 변경
    const router = useRouter();
    const pathname = router.pathname

    const setLeftHeaderName = () => {
        switch (pathname) {
            case "/auth":
                return "로그인"
            case "/user/sellList":
                return "판매중"
            case "/user/grade":
                return "평점"
            default:
                return "잘못된경로";
        }
    }
    const setRightHeaderName = () => {
        switch (pathname) {
            case "/auth":
                return "회원가입"
            case "/user/sellList":
                return "거래완료"
            case "/user/grade":
                return "리뷰"
            default:
                return "잘못된경로";
        }
    }

    return (
        <Container currentLeft={currentLeft}>
            <div className='subHeader-left' onClick={changeCurrent}>
                <p>{setLeftHeaderName()}</p>
            </div>
            <div className='subHeader-right' onClick={changeCurrent}>
                <p>{setRightHeaderName()}</p>
            </div>
        </Container>
    );
};

export default SubHeader;