import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import HomeIcon from "../../public/static/svg/footer/home.svg"
import RegisterIcon from "../../public/static/svg/footer/register.svg"
import UserIcon from "../../public/static/svg/footer/user.svg"
import ChattingIcon from "../../public/static/svg/footer/chatting.svg"
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useSocket } from '../../context/socket.context';
import { messagePayload } from '../../pages/user/chatting/room/[id]';
import { chattingAlarmActions } from '../../store/chattingAlarm';
import { productListType } from '../../types/product/product';
import axios from '../../lib/api';

const Container = styled.div`
    @keyframes blink {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
    }

    position:fixed;
    bottom:0;      
    background-color:${palette.main_color};
    width:100%;
    max-width:430px;
    height:60px;
    
    .link-flex-wrap{
        display:flex;
        justify-content:space-evenly;
        .link-flex-item{
            cursor: pointer;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            padding:10px;
            &:hover{
                p{
                    font-size:15px;
                }
            }
            .selected{
                    color:${palette.currentPage};    
                    font-size:15px;
                    path{
                    fill:${palette.currentPage}
                }
            }
            .showAlarmBox{
                position:relative;
                .showAlarm{
                    cursor: pointer;
                    position:absolute;
                    top:-10px;
                    left:15px;
                    width:20px;
                    height:20px;
                    background-color:#f46430;
                    color:${palette.main_text_color};
                    font-size:15px;
                    font-weight:400px;
                    text-align:center;
                    align-items:center;
                    border-radius:50px;
                    padding-top:2px;
                    /* 애니메이션 적용 */
                    animation: blink 2s infinite;
                }
            }
            p{
                margin-top:5px;
                font-size:13px;
                font-weight:bold;
                color:${palette.main_text_color};
            }
        }
    }
`

const LinkFooter = () => {
    const router = useRouter();
    // 로그인 확인
    const loggedUserId = useSelector((state:RootState)=>state.user.id)
    const isLogged = useSelector((state:RootState)=>state.user.isLogged)
    
    // 알림 색깔
    const chattingAlarm = useSelector((state:RootState)=>state.chattingAlarm.chatting)
    
    const dispatch = useDispatch();
    const {socket} = useSocket();

    const getProductInfo = async (message:messagePayload)=>{
        const productResponse = await axios.get(`/content/read/${message?.room.content_id}`);
        const product = productResponse.data as productListType;
        return product;
    }
    const getChattingUserName = async (userId:number)=>{
        const response = await axios.get(`/user/find/nickName/${userId}`)
        return response;
    }

      // TODO : 채팅알림 
      useEffect(()=>{
        socket?.on('chat_notification', (message:messagePayload) => {
            getProductInfo(message).then((response:productListType)=>{
                dispatch(chattingAlarmActions.setChattingProductPrice(String(response.price)))
                dispatch(chattingAlarmActions.setChattingProductTitle(response.title))
            })
            getChattingUserName(message.send_id).then((response)=>{
                dispatch(chattingAlarmActions.setChattingUserName(response.data))
            })
            dispatch(chattingAlarmActions.setChattingRoom(message.room))
            dispatch(chattingAlarmActions.setChattingMessage(message.message))
            dispatch(chattingAlarmActions.setChatting(true));
            dispatch(chattingAlarmActions.setChattingModal(true));
            setTimeout(() => {
                dispatch(chattingAlarmActions.setChattingModal(false));
                // 모달창 꺼진 후 데이터 초기화
                dispatch(chattingAlarmActions.setChattingProductPrice(''))
                dispatch(chattingAlarmActions.setChattingProductTitle(''))
                dispatch(chattingAlarmActions.setChattingUserName(''))
                dispatch(chattingAlarmActions.setChattingMessage(''))
            }, 3000);
          });          
    },[socket])
    

    // 현재 페이지의 아이콘색깔 다르게 지정하기
    const setCurrentPage = (path:string) => {
        if (router.pathname === path) {
            return "selected";
        }
    };

    return (
        <Container>
            <div className='link-flex-wrap'>
                <div className='link-flex-item' 
                    onClick={()=>{
                        router.push({
                            pathname:"/"
                        })
                }}>
                    <HomeIcon className={setCurrentPage('/')}/>
                    <p className={setCurrentPage('/')}>홈</p>
                </div>
                
                <div className='link-flex-item' onClick={()=>{
                    if(isLogged){
                        router.push({
                            pathname:"/product/register"
                        })
                    }else{
                        alert('로그인이 필요합니다.')
                        router.push("/auth")
                    }
                }}>
                    <RegisterIcon className={setCurrentPage('/product/register')}/>
                    <p>등록</p>
                </div>
                
                <div className='link-flex-item' onClick={()=>{
                    if(isLogged){
                        // 알림 디스패치 - false로 
                        dispatch(chattingAlarmActions.setChatting(false));
                        // 라우팅
                        router.push({
                            pathname:`/user/chatting/${loggedUserId}`
                        })
                    }else{
                        alert('로그인이 필요합니다.')
                        router.push("/auth")
                    }
                }}>
                    <div className='showAlarmBox'>
                        <ChattingIcon className={setCurrentPage('/user/chatting')}/>
                        {chattingAlarm ? 
                        <span className='showAlarm'></span> : null}
                    </div>
                    <p className={setCurrentPage('/user/chatting')}>채팅</p>
                </div>
                
                <div className='link-flex-item' onClick={()=>{
                    if(isLogged){
                        router.push({
                            pathname:"/user"
                        })
                    }else{
                        alert('로그인이 필요합니다.')
                        router.push("/auth")
                    }
                    
                }}
                >
                     <UserIcon className={setCurrentPage('/user')}/>
                    <p className={setCurrentPage('/user')}>내정보</p>
                </div>
            </div>
        </Container>
    );
};

export default LinkFooter;