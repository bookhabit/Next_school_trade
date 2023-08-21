import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import styled from 'styled-components';
import palette from '../../../../styles/palette';
import SubmitBtn from "../../../../public/static/svg/chatting/submitBtn.svg"
import io from "socket.io-client"
import { convertToDatetime, makeMoneyString } from '../../../../lib/utils';
import { useSocket } from '../../../../context/socket.context';
import { RootState, useSelector } from '../../../../store';
import { RoomType } from '../[id]';
import moment from 'moment';
import "moment/locale/ko";
import { isEmpty, last, result, throttle, update } from 'lodash';
import axios from '../../../../lib/api';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver';
import SkeletonLoading from '../../../../components/common/SkeletonLoading';
import FailFetchData from '../../../../components/common/FailFetchData';
import DataNull from '../../../../components/common/DataNull';
import PreviousChatList from '../../../../components/chattingList/PreviousChatList';

const Container = styled.div`
    @media only screen and (min-width: 430px) {
        min-height: 90vh;
    }
`

const ChattingRoomContainer= styled.div`
    width:100%;
    padding-bottom:70px;
    /* 게시글 설명 css */
    .chatting-header{
        position:fixed;
        top:90px;
        max-width:430px;
        width:100%;
        height:100px;
        background-color:#FEFBFF;
        padding:20px;
        border-bottom:1px solid #D9D9D9;
        .post-title{
            font-size:18px;
            font-weight:bold;
            margin-bottom:15px;
        }
        .post-price{
            font-size:18px;
        }
        .chatting-confirm-button-box{
            width:100%;
            display:flex;
            justify-content:space-between;
            align-items:center;
            button{
                cursor: pointer;
                padding: 8px;
                border-radius:25px;
                font-weight: 600;
                font-size:16px;
                background-color:${palette.main_text_color};
                color:${palette.main_color} ;
                &:hover{
                    background-color:${palette.main_color};
                    color:${palette.main_text_color};
                }
            }
        }
    }
    .chatting-last-date{
        width:100%;
        height:40px;
        color:${palette.updatedDate};
        font-size:16px;
        text-align:center;
        padding-top:5px;
        margin-top:20px;
        margin-bottom:20px;
    }
    .chatting-message-box{
        width:100%;
        padding-top:100px;
        /* 나의 채팅 css */
        .chatting-me{
            width:100%;
            height:auto;
            display:flex;
            flex-direction:row-reverse;
            margin-bottom:20px;
            .chatting-content{
                max-width:230px;
                height:auto;
                background-color:${palette.main_color};
                border-radius:15px;
                padding:15px 10px;
                color:${palette.main_text_color};
                font-size:20px;
                font-weight:bold;
                line-height:30px;
            }
            .chatting-sub-content{
                    display:flex;
                    flex-direction:column;
                    justify-content:flex-end;
                    .confirm-number{
                        color:${palette.main_color};
                        text-align:right;
                        margin-right:10px;
                        margin-bottom:5px;
                    }
                }
            .chatting-updateDate{
                    font-size:12px;
                    height:auto;
                    color:${palette.updatedDate};
                    margin-right:10px;
                    margin-bottom:5px;
                    display:flex;
                    flex-direction:column;
                    justify-content:flex-end;
            }
        }
        /* 상대 채팅 css */
        .chatting-opponent{
            width:100%;
            height:auto;
            display:flex;
            
            margin-bottom:20px;
            .opponent-profile{
                margin:0px 10px;
                
            }
            .chatting-content{
                max-width:230px;
                height:auto;
                background-color:#F4F3F3;
                border-radius:15px;
                padding:15px 10px;
                color:black;
                font-size:20px;
                font-weight:400;
                line-height:30px;
            }
            .chatting-updateDate{
                font-size:12px;
                height:auto;
                color:${palette.updatedDate};
                margin-left:10px;
                display:flex;
                flex-direction:column;
                justify-content:flex-end;
            }
        }
    }
`

const TradeConfirm = styled.div`
    width:100%;
    height:100%;
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    .confirm-introduce{
        margin-bottom:20px;
        border:1px solid ${palette.gray_aa};
        border-radius:30px;
        padding:10px;
        h2{
            text-align:center;
            margin:15px;
            color:${palette.gray_76}
        }
        align-items:center;
        p{
            margin-bottom:20px;
            font-size:16px;
            line-height:20px;
            color:${palette.gray_76}
        }
    }

    .confirm-buyer-payment{
        display:flex;
        align-items:center;
        justify-content:space-between;
        font-size:20px;
        margin-bottom:20px;
        button{
            font-size:16px;
            font-weight:600;
            cursor: pointer;
            padding:8px;
            border-radius:25px;
            background-color:white;
            color:${palette.main_color} ;
            &:hover{
                background-color:${palette.main_color};
                color:${palette.main_text_color};
            }
        }
    }

    .confirm-price-box{
        width:100%;
        height:50px;   
        margin-bottom:40px;
        p{
            margin-bottom:20px;
        }
    }
    .confirm-button-box{
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:20px;
        .confirm-button{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            button{
                background-color:${palette.main_color};
                color:${palette.main_text_color};
                padding:10px;
                border-radius:25px;
                font-size:16px;
                cursor: pointer;
            }
            .confirm-message{
                margin-top:10px;
                color:${palette.bittersweet}
            }
        }
    }
    .confirm-complete-box{
        padding:20px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        p{
            color:${palette.gray_b0};
            margin-bottom:10px;
        }
    }
`


const ChattingFooter= styled.form`
    @media only screen and (min-width: 430px) {
        max-width:430px;
    }
    position:fixed;
    bottom:0;      
    background-color:${palette.main_color};
    width:100%;
    height:70px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0px 10px;
    margin-top:20px;
    .chatting-file{
        label{
            margin:0 10px;
            font-size:30px;
            color:${palette.main_text_color}
        }
        input[type="file"] {
                display:none;
        }
    }
    
    
    .chatting-message{
        width:290px;
        height:30px;
        background-color:${palette.main_text_color};
        border-radius:30px;
        padding:5px 15px;
        input{
            width:100%;
        }
        input::placeholder{
            font-size:15px;
            color:black;
        }
    }
    .chatting-submit{
        margin-left:10px;
    }
`
interface PropsType {
    chatData:{
        roomKey:string;
        title:string;
        price:string;
    }
}

export type messagePayload = {
    id?:number;
    room: RoomType;
    send_id: number;
    message: string;
    createdAt: Date;
}

export type ChattingListPage = {
    chat_list:messagePayload[],
    totalPage:number,
    currentPage:number,
}

const chattingRoom:NextPage = (props) => {
    const {chatData} = props as PropsType

    // 거래하기 로직
    const [confirmTrade,setConfirmTrade] = useState(false)
    const [buyerConfirm,setBuyerConfirm] = useState(false)
    const [sellerConfirm,setSellerConfirm] = useState(false)

    // 채팅 데이터 로직
    const [chatMessages,setChatMessages] = useState<messagePayload[]>([])
    const [lastChatMessages,setLastChatMessages] = useState<messagePayload[]>([])
    const [sendMessage,setSendMessage] = useState('')
    const loggedUserId = useSelector((state: RootState) => state.user.id);
    const {socket} = useSocket();
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    const [sellerConfirmTime,setSellerConfirmTime] = useState(new Date())
    const [buyerConfirmTime,setBuyerConfirmTime] = useState(new Date())
    
    const chatMessageMemo = useMemo(()=>chatMessages,[chatMessages])
    const [hasNextPage,setHasNextPage] = useState(false)
    const [nextPageNumber,setNextPageNumber] = useState<number|undefined>(0)

    const rooms:RoomType = {
        content_id:Number(chatData.roomKey.split('-')[0]),
        seller_id:Number(chatData.roomKey.split('-')[1]),
        buyer_id:Number(chatData.roomKey.split('-')[2])
    }
    
    // 채팅데이터 전송
    const chatEmitHandler = async (event:React.FormEvent<HTMLFormElement>)=>{ 
        event.preventDefault();
        const message = {
            room: rooms,
            send_id: loggedUserId,
            message:sendMessage,
        }
        await socket?.emit("message",message)
        setSendMessage("")
    }

    // 채팅데이터 수신
    // 서버에서 메시지를 받았을 때 호출되는 함수
    const handleReceivedMessage = (newMessage: messagePayload) => {
        // 이전 메시지들과 새로운 메시지를 합쳐서 새 배열 생성
        const updatedChatMessages = [...chatMessages, newMessage];
        setChatMessages(updatedChatMessages);
    };

    useEffect(()=>{
        socket?.on("message",(msgPayload:messagePayload)=>{
            handleReceivedMessage(msgPayload)
        })
    },[socket,chatMessages])
    

    // 현재 roomId 가져오기
    const getRoomId = async (roomData: RoomType[]) => {
        // user의 rooms.content_id랑 현재 room의 content_id 와 비교
        const currentRoom = roomData.filter((room) => {
            return (
                room.content_id === Number(chatData.roomKey.split('-')[0]) &&
                room.seller_id === Number(chatData.roomKey.split('-')[1]) &&
                room.buyer_id === Number(chatData.roomKey.split('-')[2])
            );
        });
        const currentRoomId = currentRoom[0]?.id;
        return currentRoomId;
    }

    // 이전 data REST API - /chat/list/:roomId  ( roomId는 number )
    // query는 ?page= number 
    const getPreviousChatData = async (roomId:number, page:number) => {
        const response = await axios.get(`/chat/list/${roomId}?page=${page}`);
        return response.data;
    }

    const fetchChatData = async ( pageParam = 0) => {
        const joinRoomListData = await axios.get(`/room/list/${loggedUserId}`);
        const joinRoomList = joinRoomListData.data as RoomType[];
        const roomId = await getRoomId(joinRoomList);
        
        // 채팅자의 confirm 확인
        const currentRoom = joinRoomList.find((room)=>room.id === roomId)
        if(currentRoom?.seller_confirm_time){
            setSellerConfirmTime(currentRoom?.seller_confirm_time)
        }
        if(currentRoom?.buyer_confirm_time){
            setBuyerConfirmTime(currentRoom?.buyer_confirm_time)
        }

        // 이전 채팅데이터 get
        if (roomId !== undefined) {
            const chatData:ChattingListPage = await getPreviousChatData(roomId, pageParam);  
            console.log('chatData',chatData)          
            // hadNextPage 구하기
            if(chatData.currentPage < Math.ceil(chatData.totalPage/10)){
                // pageNumber구하기
                setHasNextPage(true)
                setNextPageNumber(chatData.currentPage+1)
            }else{
                setHasNextPage(false)
                setNextPageNumber(undefined)
            }

            // lastChatMessages 저장
            if(!isEmpty(chatData.chat_list)){
                setLastChatMessages((prevState) => [...prevState,...chatData.chat_list]);
            }
        }
    };

    const [prevScrollHeight,setPrevScrollHeight] = useState<number|null>(null);
    const scrollBarRef = useRef<HTMLDivElement>(null);
    
    // 무한스크롤 구현
    const handleScroll = throttle(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop === 0 && hasNextPage && nextPageNumber !== 0) {
            console.log(scrollBarRef.current)
            if(scrollBarRef.current){
                setPrevScrollHeight(scrollBarRef.current.scrollHeight)
            }
            fetchChatData(nextPageNumber)
        }
      }, 300);

    useEffect(()=>{
        fetchChatData()
    },[])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // 데이터 요청 시 또는 송신 시 스크롤 아래로 이동
    useEffect(()=>{
        if (prevScrollHeight && scrollBarRef.current) {
            window.scrollTo(0,scrollBarRef.current.scrollHeight - prevScrollHeight)
            return setPrevScrollHeight(null);
        }
        messageEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
    },[chatMessageMemo,lastChatMessages])

    // 원본배열이 변경되지 않기 위해 새로운배열로 복사해서 렌더링
    function reverseArray(array:messagePayload[]) {
        const newArray = array.slice(); // 배열 복사
        return newArray.reverse();      // 복사된 배열 뒤집기
    }
    const lastChattingList = reverseArray(lastChatMessages)

    // 판매자인지 구매자인지 식별 후 구매자일경우 결제창 보이도록
    const isBuyerPage = true
    const buyerId = Number(chatData.roomKey.split('-')[2])

    console.log(lastChatMessages)
    console.log(lastChattingList)
    // 데이터 요청해줄떄마다 새로운 배열로 복사
    
    return (
        <Container>
             <ChattingRoomContainer>
                <div className='chatting-header'>
                    <p className='post-title'>{chatData.title}</p>
                    <div className='chatting-confirm-button-box'>
                        <p className='post-price'>{makeMoneyString(chatData.price)} 원</p>
                        <button onClick={()=>setConfirmTrade(!confirmTrade)}>거래하기</button>
                    </div>
                </div>
                {confirmTrade && 
                <TradeConfirm>
                    <div className='confirm-introduce'>
                        <h2>거래과정</h2>
                        <p>구매자가 결제를 완료하고 판매자와 거래를 마친 후 물건을 잘 받았다면 구매자 거래완료 버튼 클릭</p>
                        <p>판매자는 물건을 전달한 후 구매자의 확인버튼 확인 후 판매자 거래완료 버튼 클릭</p>
                        <p>구매자와 판매자 모두 확인 시 판매자에게 결제한 금액이 전달됩니다</p>
                    </div>
                    {isBuyerPage && (
                        <div className='confirm-buyer-payment'>
                            <p>{makeMoneyString(chatData.price)} 원</p>
                            <button onClick={()=>setConfirmTrade(!confirmTrade)}>결제하기</button>
                        </div>
                    )}
                    <div className='confirm-price-box'>
                        <p>거래 예상금액 : {makeMoneyString(chatData.price)} </p>
                        <p>결제 완료된 금액 : {makeMoneyString('15333')} </p>
                    </div>
                    <div className='confirm-button-box'>
                        <div className='confirm-button'>
                            <button onClick={()=>setBuyerConfirm(true)}>구매자 거래완료</button>
                            {buyerConfirm && <p className='confirm-message'>완료</p>}
                        </div>
                        <div className='confirm-button'>
                            <button onClick={()=>setSellerConfirm(true)}>판매자 거래완료</button>
                            {sellerConfirm && <p className='confirm-message'>완료</p>}
                        </div>
                    </div>
                    {buyerConfirm && sellerConfirm && 
                        <div className='confirm-complete-box'>
                            <p>구매자와 판매자 모두 확인완료되었습니다</p>
                            <p>판매자에게 돈을 전달하도록 하겠습니다</p>
                        </div>
                    }
                </TradeConfirm>
                }
                {!confirmTrade && 
                    <div className='chatting-message-box'>
                        {/* 이전 데이터  */}
                        <div ref={scrollBarRef} onScroll={handleScroll}>
                            {lastChattingList.map((chatting)=>(
                                loggedUserId === chatting.send_id ?
                                // 현재 로그인한 사용자와 보낸 사람의 id가 같다면 '나'
                                <div className='chatting-me' key={Math.random()}>
                                    <p className='chatting-content'>{chatting.message}</p>
                                    <div className='chatting-sub-content'>
                                        {loggedUserId === buyerId ? 
                                        sellerConfirmTime < chatting.createdAt ? 
                                        <span className='confirm-number'>1</span>
                                        : <span></span>
                                        :
                                        buyerConfirmTime < chatting.createdAt ? 
                                        <span className='confirm-number'>1</span>
                                        : <span></span>
                                        }
                                        <p className='chatting-updateDate'>{convertToDatetime(String(chatting.createdAt))}</p>
                                    </div>
                                </div>
                                :
                                // 현재 로그인한 사용자와 보낸 사람의 id가 다르다면 >> '상대방'
                                <div className='chatting-opponent' key={Math.random()}>
                                    <div className='opponent-profile'>
                                        <img src="/static/svg/chatting/opponent.svg" alt="상대방 프로필이미지"/>
                                    </div>
                                    <p className='chatting-content'>{chatting.message}</p>
                                    <p className='chatting-updateDate'>{convertToDatetime(String(chatting.createdAt))}</p>
                                </div>
                            ))}
                        </div>
                        {/* <PreviousChatList
                                key={Math.random()}
                                chat_list={lastChatMessages}
                                setTarget={setTarget}
                                loggedUserId={loggedUserId}
                                buyerConfirmTime={buyerConfirmTime}
                                sellerConfirmTime={sellerConfirmTime}
                                scrollBarRef={scrollBarRef}
                        /> */}
                        {/* 현재 송수신 데이터 */}
                        {chatMessageMemo.map((message)=>(
                            loggedUserId === message.send_id ?
                            // 현재 로그인한 사용자와 보낸 사람의 id가 같다면 '나'
                            <div className='chatting-me' key={Math.random()}>
                                <p className='chatting-content'>{message.message}</p>
                                <div className='chatting-sub-content'>
                                    {loggedUserId === buyerId ? 
                                    sellerConfirmTime < message.createdAt ? 
                                    <span className='confirm-number'>1</span>
                                    : <span></span>
                                    :
                                    buyerConfirmTime < message.createdAt ? 
                                    <span className='confirm-number'>1</span>
                                    : <span></span>
                                    }
                                    <p className='chatting-updateDate'>{convertToDatetime(String(message.createdAt))}</p>
                                </div>
                            </div>
                            :
                            // 현재 로그인한 사용자와 보낸 사람의 id가 다르다면 >> '상대방'
                            <div className='chatting-opponent' key={Math.random()}>
                                <div className='opponent-profile'>
                                    <img src="/static/svg/chatting/opponent.svg" alt="상대방 프로필이미지"/>
                                </div>
                                <p className='chatting-content'>{message.message}</p>
                                <p className='chatting-updateDate'>{convertToDatetime(String(message.createdAt))}</p>
                            </div>
                        ))}
                        <div ref={messageEndRef}></div>
                    </div>
                }
            </ChattingRoomContainer>
            <ChattingFooter onSubmit={chatEmitHandler}>
                <div className='chatting-file'>
                    <label htmlFor='file-input'>+</label>
                    <input type="file" id="file-input"/>
                </div>
                <div className='chatting-message'>
                    <input 
                        type="text" 
                        placeholder='메세지 보내기'
                        value={sendMessage}
                        onChange={(e)=>setSendMessage(e.target.value)}
                        />
                </div>
                <div className='chatting-submit'>
                    <button><SubmitBtn/></button>
                </div>
            </ChattingFooter>
        </Container>
    );
};

chattingRoom.getInitialProps = async ({query})=>{
    // 이 id는 contentId-sellerId-buyerId 를 가진 roomKey이다
    const {id,title,price} = query;

    const chatData = {
        roomKey:id,
        title:title,
        price:price
    }
    return {chatData}
  }

export default chattingRoom;