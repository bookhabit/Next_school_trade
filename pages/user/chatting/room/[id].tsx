import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
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
import BackImage from '../../../../components/common/BackImage';
import Delete from "../../../../public/static/svg/product/thumnailXicon.svg";
import { Users } from '../../../../types/user';
import { useDispatch } from 'react-redux';
import { chattingAlarmActions } from '../../../../store/chattingAlarm';
import Swal from 'sweetalert2';
import { changeCompletedAPI, getProductDetail } from '../../../../lib/api/product';
import { productListType } from '../../../../types/product/product';
import ConfirmTrade from '../../../../components/confirmTrade/ConfirmTrade';

const Container = styled.div`
    .chatting-photo-tuhmnail{
        background-color:${palette.main_text_color};
        position:fixed;
        bottom:70px;      
        height:100px;
        width:100%;
        max-width:430px;
        display:flex;
        align-items:center;
        padding:20px;
        .preview-image-box{
            display:flex;
            align-items:center;    
            margin-right:15px;
            img{
                width:60px;
                height:60px;
                object-fit:cover;
                margin-right:5px;
            }
        }
    }

    .preview-image-delete-icon{
        cursor: pointer;
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
        padding-top:120px;
        .chatting-image{
            display:flex;
            align-items:center;
            justify-content:center;
            padding:10px;
            img{
                width:140px;
                height:140px;
                object-fit:cover;
                border-radius:15px;
            }
        }
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
                img{
                    width:40px;
                    height:40px;
                }   
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
            color:${palette.main_text_color};
            cursor:pointer;
            &:hover{
                font-size:35px;
            }
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
        button{
            cursor: pointer;
        }
    }
`
interface PropsType {
    chattingRoomData:{
        room:RoomType;
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

export type confirm_message_responseType={
    confirmTime:Date;
    partnerId:number;
}

export type ChattingListPage = {
    chat_list:messagePayload[],
    totalPage:number,
    currentPage:number,
}
const chattingRoom:NextPage = (props) => {
    const {chattingRoomData} = props as PropsType

    if(!chattingRoomData.room){
        return (
            <div>
                채팅방 정보를 불러오지 못하였습니다
            </div>
        )
    }
    // 거래하기 모달창
    const [confirmTrade,setConfirmTrade] = useState(false)

    // 채팅 데이터 로직
    const [chatMessages,setChatMessages] = useState<messagePayload[]>([])
    const [lastChatMessages,setLastChatMessages] = useState<messagePayload[]>([])
    const [sendMessage,setSendMessage] = useState('')
    const loggedUserId = useSelector((state: RootState) => state.user.id);
    const {socket} = useSocket();
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const buyerId = chattingRoomData.room.buyer_id
    const sellerId = chattingRoomData.room.seller_id
    const contentId = chattingRoomData.room.content_id
    const roomId = chattingRoomData.room.id
    const [opponentProfileImg,setOpponentProfileImg] = useState<null|string>(null);

    // 상대방 메시지 확인 필요 로직 - 1표시
    const [sellerConfirmTime,setSellerConfirmTime] = useState(new Date())
    const [buyerConfirmTime,setBuyerConfirmTime] = useState(new Date())

    const [sellerConfirmRealTime,setSellerConfirmRealTime] = useState(new Date())
    const [buyerConfirmRealTime,setBuyerConfirmRealTime] = useState(new Date())

    // 무한스크롤 데이터 패칭 로직
    const [hasNextPage,setHasNextPage] = useState(false)
    const [nextPageNumber,setNextPageNumber] = useState<number|undefined>(0)
    const [prevScrollHeight,setPrevScrollHeight] = useState<number|null>(null);
    const scrollBarRef = useRef<HTMLDivElement>(null);

    // 원본배열이 변경되지 않기 위해 새로운배열로 복사해서 렌더링
    function reverseArray(array:messagePayload[]) {
        const newArray = array.slice(); // 배열 복사
        return newArray.reverse();      // 복사된 배열 뒤집기
    }

    // 이전 메시지 메모이제이션
    const lastChattingList = useMemo(() => {
        return reverseArray(lastChatMessages);
    }, [lastChatMessages]);

    // 실시간 메시지 메모이제이션
    const memoizedChatMessages = useMemo(() => chatMessages, [chatMessages]);

    
    const rooms:RoomType = {
        content_id:contentId,
        seller_id:sellerId,
        buyer_id:buyerId,
    }

    // 파일업로드
    const [chattingPhotos,setChattingPhotos] = useState<string[]>([])
    function uploadPhoto(ev: ChangeEvent<HTMLInputElement>) {
        const files = ev.target.files;
        
        if (!files) return;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
          data.append('photos', files[i]);
        }

        try{
            axios.post<string[]>('/photos/upload', data, {
                headers: { 'Content-type': 'multipart/form-data' },
              }).then(response => {
                const { data: filenames } = response;
                console.log('response data',data)
                setChattingPhotos(prev => {
                  return [...prev, ...filenames];
                });
              });
        }catch(e){
            console.log(e,'upload 실패')
        }
      }
    
      // 업로드했던 파일 썸네일 삭제
      const handleDeleteImage = (index:number) => {
        const updatedPhotos = [...chattingPhotos];
        updatedPhotos.splice(index, 1); // 해당 인덱스의 이미지 삭제
        setChattingPhotos(updatedPhotos);
      };
    

    // 채팅데이터 전송
    const chatEmitHandler = async (event:React.FormEvent<HTMLFormElement>)=>{ 
        event.preventDefault();
        if(sendMessage){
            const message = {
                room: rooms,
                send_id: loggedUserId,
                message:sendMessage,
            }
            await socket?.emit("message",message)
            setSendMessage("")
        }

        if(chattingPhotos.length > 0){
            chattingPhotos.forEach((chatting)=>{
                const message = {
                    room: rooms,
                    send_id: loggedUserId,
                    message:chatting,
                }
                socket?.emit("message",message)
            })
            setChattingPhotos([])
        }

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
        
        // confirm messages by seller or buyer
        if(chattingRoomData.room.seller_confirm_time){
            setSellerConfirmTime(chattingRoomData.room.seller_confirm_time)
            setSellerConfirmRealTime(chattingRoomData.room.seller_confirm_time)
        }
        if(chattingRoomData.room.buyer_confirm_time){
            setBuyerConfirmTime(chattingRoomData.room.buyer_confirm_time)
            setBuyerConfirmRealTime(chattingRoomData.room.buyer_confirm_time)
        }

        // get previous chatting data
        if (roomId !== undefined) {
            const chatData:ChattingListPage = await getPreviousChatData(roomId, pageParam);  
            
            // get hadNextPage
            if(chatData.currentPage < Math.ceil(chatData.totalPage/10)){
                // get pageNumber
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

    const getOpponentInfo = async ()=>{
        if(loggedUserId===rooms.buyer_id){
            try{
                // 상대방의 정보가 필요하니 반대(seller)의 id
                const userInfo:Users = await axios.get(`/user/find/${rooms.seller_id}`).then((response)=>response.data)
                setOpponentProfileImg(userInfo.profileImage.path)
            }catch(e){
                console.log('상대방 정보 불러오기 실패',e)
            }

        }
        if(loggedUserId===rooms.seller_id){
            try{
                // 상대방의 정보가 필요하니 반대(seller)의 id
                const userInfo:Users = await axios.get(`/user/find/${rooms.buyer_id}`).then((response)=>response.data)

                setOpponentProfileImg(userInfo.profileImage.path)
            }catch(e){
                console.log('상대방 정보 불러오기 실패',e)
            }
        }
    }

    // fetch nextData as scroll event
    const handleScroll = throttle(() => {
        const scrollTop = document.documentElement.scrollTop;

        if (scrollTop === 0 && hasNextPage && nextPageNumber !== 0) {
            if(scrollBarRef.current){
                setPrevScrollHeight(scrollBarRef.current.scrollHeight)
            }
            fetchChatData(nextPageNumber)
        }
      }, 300);

    // fetch frist data : last messages
    useEffect(()=>{
        fetchChatData()
        getOpponentInfo()
    },[])

    // 채팅데이터 수신
    // 서버에서 메시지를 받았을 때 호출되는 함수

    useEffect(()=>{
        // 채팅방에 들어온 userId 정보 
        socket?.on("confirm_join_room",(joined_userId:number)=>{
            console.log('confirm_join_room 이벤트 수신')
            if(loggedUserId !== joined_userId){
                console.log('userId 입장',joined_userId)
                // 상대방 confirm_time 업데이트
                if(buyerId === joined_userId){
                    setBuyerConfirmTime(new Date())
                    setBuyerConfirmRealTime(new Date())
                }
                if(sellerId === joined_userId){
                    setSellerConfirmTime(new Date())
                    setSellerConfirmRealTime(new Date())
                }
            }
        })
        socket?.on("message",(msgPayload:messagePayload)=>{
            setChatMessages((prevChatMessages) => [...prevChatMessages, msgPayload]);
        })
        
        socket?.on("confirm_message",(data:confirm_message_responseType)=>{
            console.log('confirm_message',data)
            // 여기서 data는 상대방이 메세지를 읽었는지 알 수 있는 값이다
            // true는 상대방이 채팅을 읽었다는 뜻으로 새로운 Date로 업데이트
            // 로그인 한 사람과 파트너 아이디를 비교 (파트너아이디가 아닌 사람은 즉 메세지를 보낸사람 > 읽었다는 뜻은 보낸사람의 메세지의 1을 없애야 한다는 뜻)
            if(data){
                if(loggedUserId === buyerId){
                    if(loggedUserId !== data.partnerId){
                        console.log('이 시간으로 buyer time 업데이트',data.confirmTime)
                        setSellerConfirmRealTime(data.confirmTime)
                    }
                }
                if(loggedUserId === sellerId){
                    if(loggedUserId !== data.partnerId){
                        setBuyerConfirmRealTime(data.confirmTime) 
                       console.log('seller time 업데이트')
                    }
                }
            }
        })

        return()=>{
            socket?.emit('leave_room',roomId)
            socket?.on('leave_room',(data)=>{
            })
        }
    },[socket])

    // set scroll event
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // scroll restoration or scroll to bottom
    useEffect(()=>{
        if (prevScrollHeight && scrollBarRef.current) {
            window.scrollTo(0,scrollBarRef.current.scrollHeight - prevScrollHeight)
            return setPrevScrollHeight(null);
        }else{
            messageEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }
    },[chatMessages,lastChatMessages])
    
    let currentDate = new Date();
    let lastDate:Date|null = null;

    return (
        <Container>
             <ChattingRoomContainer>
                <ConfirmTrade
                    chattingRoomData={chattingRoomData}
                    confirmTrade={confirmTrade}
                    setConfirmTrade={setConfirmTrade}
                    loggedUserId={loggedUserId}
                    buyerId={buyerId}  
                    sellerId={sellerId}
                />
                {!confirmTrade && 
                    <div className='chatting-message-box'>
                        {/* 이전 데이터  */}
                        <div ref={scrollBarRef} onScroll={handleScroll}>
                            {lastChattingList.map((chatting)=>{
                                const messageDate = new Date(chatting.createdAt);
                                let shouldDisplayDate;
                                // 날짜가 변경되었을 때, 날짜 구분 헤더 추가
                                if (!lastDate || messageDate.toDateString() !== lastDate.toDateString()) {
                                  lastDate = messageDate;
                                shouldDisplayDate = messageDate < currentDate;
                                }

                                // 지난 대화 표시
                                return(
                                    <div key={chatting.id}>
                                        {shouldDisplayDate ?                                     
                                        <div key={`date-${chatting.createdAt}`} className="chatting-last-date">
                                            {shouldDisplayDate ? moment(messageDate).format('YYYY년 MM월 DD일 dddd') : null}
                                        </div> : null}
                                        
                                        {loggedUserId === chatting.send_id ?
                                        // 현재 로그인한 사용자와 보낸 사람의 id가 같다면 '나'
                                        <div className='chatting-me' key={chatting.id}>
                                            {chatting.message.includes('upload/image_') ? 
                                                <div className='chatting-image'>
                                                    <BackImage src={chatting.message} alt='채팅 메세지 이미지' /> 
                                                </div> :
                                                <p className='chatting-content'>{chatting.message}</p>
                                            }
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
                                        <div className='chatting-opponent' key={chatting.id}>
                                            <div className='opponent-profile'>
                                                {opponentProfileImg ? 
                                                <BackImage src={opponentProfileImg} alt="상대방 프로필이미지"/>
                                                : 
                                                <img src="/static/svg/chatting/opponent.svg" alt="상대방 프로필이미지"/>
                                                }
                                            </div>
                                            {chatting.message.includes('upload/image_') ? 
                                                <div className='chatting-image'>
                                                    <BackImage src={chatting.message} alt='채팅 메세지 이미지' /> 
                                                </div> :
                                                <p className='chatting-content'>{chatting.message}</p>
                                            }
                                            <p className='chatting-updateDate'>{convertToDatetime(String(chatting.createdAt))}</p>
                                        </div>
                                        }
                                    </div>

                                )
                            })}
                        </div>
                        
                        {/* 현재 송수신 데이터 */}
                        {memoizedChatMessages.map((message)=>(
                            loggedUserId === message.send_id ?
                            // 현재 로그인한 사용자와 보낸 사람의 id가 같다면 '나'
                            <div className='chatting-me' key={Math.random()}>
                                {message.message.includes('upload/image_') ? 
                                <div className='chatting-image'>
                                    <BackImage src={message.message} alt='채팅 메세지 이미지' /> 
                                </div> :
                                <p className='chatting-content'>{message.message}</p>
                                }
                                <div className='chatting-sub-content'>
                                    {loggedUserId === buyerId ? 
                                    sellerConfirmRealTime < message.createdAt ? 
                                    <span className='confirm-number'>1</span>
                                    : <span></span>
                                    :
                                    buyerConfirmRealTime < message.createdAt ? 
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
                                    {opponentProfileImg ? 
                                        <BackImage src={opponentProfileImg} alt="상대방 프로필이미지"/>
                                        : 
                                        <img src="/static/svg/chatting/opponent.svg" alt="상대방 프로필이미지"/>
                                    }
                                </div>
                                {message.message.includes('upload/image_') ? 
                                <div className='chatting-image'>
                                    <BackImage src={message.message} alt='채팅 메세지 이미지' /> 
                                </div> :
                                    <p className='chatting-content'>{message.message}</p>
                                }
                                <p className='chatting-updateDate'>{convertToDatetime(String(message.createdAt))}</p>
                            </div>
                        ))}
                        <div ref={messageEndRef}></div>
                    </div>
                }
            </ChattingRoomContainer>
            {/* 채팅으로 보낼 썸네일 이미지 */}
            {chattingPhotos.length > 0 &&
                <div className='chatting-photo-tuhmnail' key={Math.random()}>
                    { 
                    chattingPhotos.map((photo,index)=>
                        (
                            
                                <div className='preview-image-box' key={index}>
                                    <BackImage 
                                        src={photo} 
                                        alt="채팅이미지" 
                                    />
                                    <button
                                        onClick={() => handleDeleteImage(index)}
                                        className="preview-image-delete-icon"
                                    >
                                        <Delete/>
                                    </button>
                                </div>
                        )
                    )}
                </div>
            }
            <ChattingFooter onSubmit={chatEmitHandler}>
                <div className='chatting-file'>
                    <label htmlFor='file-input'>+</label>
                    <input 
                        type="file" 
                        id="file-input"
                        multiple
                        onChange={uploadPhoto}
                    />
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
    const roomId = String(id)

    const roomInfo = await axios.get(`/room/${roomId}`).then((response)=>{
        return response.data
    })

    const chattingRoomData = {
        room:roomInfo,
        title:title,
        price:price
    }
    return {chattingRoomData}
  }

export default chattingRoom;