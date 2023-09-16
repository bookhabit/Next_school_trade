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
import { alarmActions } from '../../store/alarm';

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
    const {socket} = useSocket();
    const [message,setMessage] = useState<messagePayload>()
    const [chattingUserName,setChattingUserName] = useState();
    const dispatch = useDispatch();

    const goToChattingRoom = async ()=>{
        const productResponse = await axios.get(`/content/read/${message?.room.content_id}`);
        const product = productResponse.data as productListType;
        // 알림 디스패치 - false로 
        dispatch(alarmActions.setChatting(false));
        dispatch(alarmActions.setChattingModal(false));
        router.push({
            pathname: `/user/chatting/room/${message?.room.id}`,
            query: { 
                title:product?.title,
                price:product?.price},
        })
    }

    const getChattingUserName = async (userId:number)=>{
        const response = await axios.get(`/user/find/nickName/${userId}`);
        setChattingUserName(response.data)
    }

    // TODO : 채팅알림 
    useEffect(()=>{
        socket?.on('chat_notification', (message:messagePayload) => {
            console.log('chat_notification 모달창 수신',message)
            setMessage(message)
            getChattingUserName(message.send_id)
        });          
    },[socket])
    console.log('chattingUserName',chattingUserName)

    return (
        <Container>
            <p className='chatting-alarm' onClick={goToChattingRoom}>
                {chattingUserName && (
                    <p className='opponent_name'>{chattingUserName}에게서</p>
                )} 채팅이 왔습니다
            </p>
        </Container>
    );
};

export default ChattingModal;