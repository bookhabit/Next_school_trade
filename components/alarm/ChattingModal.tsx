import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useRouter } from 'next/router';
import { messagePayload } from '../../pages/user/chatting/room/[id]';
import { useSocket } from '../../context/socket.context';
import axios from '../../lib/api';
import { productListType } from '../../types/product/product';
import { getUserName } from '../../lib/api/user';
import { chattingAlarmActions } from '../../store/chattingAlarm';

const Container = styled.div`
    @media only screen and (min-width: 430px) {
	    width:390px;
    }
    width:100%;
    height:50px;
    margin:0px 20px;
    padding:0px 20px;
    background-color:${palette.main_color};
    opacity:80%;
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor: pointer;
    .chatting-alarm{
        font-size:16px;
        color:${palette.main_text_color};
    }
    .opponent_name{
        font-size:18px;
        font-weight:bold;
    }
`

const ChattingModal = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {socket} = useSocket();

    // 채팅방 페이지에서는 모달창 x
    if(router.pathname === '/user/chatting/room/[id]'){
        return <div></div>;
    }

    const roomInfo = useSelector((state:RootState)=>state.chattingAlarm.chattingRoom)
    const chattingUserName = useSelector((state:RootState)=>state.chattingAlarm.chatting_user_name)
    const chattingMessage = useSelector((state:RootState)=>state.chattingAlarm.chatting_message)
    const productTitle = useSelector((state:RootState)=>state.chattingAlarm.chatting_product_title)
    const productPrice = useSelector((state:RootState)=>state.chattingAlarm.chatting_product_price)

    const goToChattingRoom = async ()=>{
        if(roomInfo && productTitle && productPrice){
            // 알림 디스패치 - false로 
            dispatch(chattingAlarmActions.setChatting(false));
            dispatch(chattingAlarmActions.setChattingModal(false));
            // join_room 이벤트 연결하기
            await socket?.emit("join_room",roomInfo)
            router.push({
                pathname: `/user/chatting/room/${roomInfo.id}`,
                query: { 
                    title:productTitle,
                    price:productPrice},
            })
        }
    }

    return (
        <Container onClick={goToChattingRoom}>
            <div className='chatting-alarm'>
                {chattingUserName && (
                    <p className='opponent_name'>{chattingUserName}: {chattingMessage}</p>
                )}
            </div>
        </Container>
    );
};

export default ChattingModal;