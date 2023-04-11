import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { userBackgroundActions } from '../../store/userBackground';

const Container = styled.div`
    position:fixed;
    right:0;
    bottom:0;
    display:flex;
    justify-content:center;
    align-items:center;
    label{
        font-weight:bold;
        font-size:14px;
    }
    input{
        width:30px;
        height:30px;
        &:hover{
            width:40px;
            height:40px;
        }
    }
`
const UserColor = () => {
    // 리덕스 스토어에 있는 값을 가져옴
    const firstColor = useSelector((state:RootState)=>state.userBackground.firstColor)
    const secondColor = useSelector((state:RootState)=>state.userBackground.secondColor)

    const dispatch = useDispatch();
    
    dispatch(userBackgroundActions.setSecondColor)

    return (
        <Container className="pc-style">
                <label htmlFor="color-picker">배경색</label>
                <input type="color" id="color-picker" name="color-picker" value={firstColor} onChange={(e)=>dispatch(userBackgroundActions.setFirstColor(e.target.value))} />
                <input type="color" id="color-picker" name="color-picker" value={secondColor} onChange={(e)=>dispatch(userBackgroundActions.setSecondColor(e.target.value))} />
        </Container>
    );
};

export default UserColor;