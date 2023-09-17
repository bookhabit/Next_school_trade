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
    background-color:${palette.bittersweet};
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    .chatting-alarm{
        font-size:16px;
        color:${palette.main_text_color};
        cursor: pointer;
    }
    .opponent_name{
        font-size:18px;
        font-weight:bold;
    }
`

const ChattingModal = () => {
    const router = useRouter();
    const [message,setMessage] = useState<messagePayload>()
    const dispatch = useDispatch();

    const chattingUserName = useSelector((state:RootState)=>state.chattingAlarm.chatting_user_name)
    const chattingMessage = useSelector((state:RootState)=>state.chattingAlarm.chatting_message)
    const productTitle = useSelector((state:RootState)=>state.chattingAlarm.chatting_product_title)
    const productPrice = useSelector((state:RootState)=>state.chattingAlarm.chatting_product_price)

    // useSelect로 

    const goToChattingRoom = async ()=>{
        if(productTitle && productPrice){
            // 알림 디스패치 - false로 
            dispatch(chattingAlarmActions.setChatting(false));
            dispatch(chattingAlarmActions.setChattingModal(false));
            router.push({
                pathname: `/user/chatting/room/${message?.room.id}`,
                query: { 
                    title:productTitle,
                    price:productPrice},
            })
        }
    }

    return (
        <Container>
            <div className='chatting-alarm' onClick={goToChattingRoom}>
                {chattingUserName && (
                    <p className='opponent_name'>{chattingUserName}: {chattingMessage}</p>
                )}
            </div>
        </Container>
    );
};

export default ChattingModal;