import React, { useEffect, useState } from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import ChattingList from '../../../components/chattingList/ChattingList';
import styled from 'styled-components';
import { useSocket } from '../../../context/socket.context';
import { GetServerSideProps } from 'next';
import axios from '../../../lib/api';
import { NextPage } from 'next';
import { Users } from '../../../types/user';
import { productListType } from '../../../types/product/product';
import { isEmpty } from 'lodash';
import { messagePayload } from './room/[id]';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getUserName } from '../../../lib/api/user';


const Container = styled.div`
    padding-bottom:60px;
`

type PropsType = {
    chattingRoomList:chattingRoomListType[]
}

export type chattingRoomListType = {
    rooms:RoomType,
    product:productListType|null,
    chatData:LatestChatType|null,
    opponentName:string|null,
}

export type RoomType = {
    id?:number,
    content_id:number,
    seller_id:number,
    buyer_id:number,
    seller_confirm_time?:Date,
    buyer_confirm_time?:Date,
}

export type LatestChatType = {
    id?:number,
    send_id?:number,
    message:string,
    createdAt:Date,
    room:RoomType
}

const chattingList:NextPage = (props) => {
    const {chattingRoomList} = props as PropsType

    const [copyRoomList,setCopyRoomList] = useState<chattingRoomListType[]>([])
    const [deleteRoomId,setDeleteRoomId] = useState<string>()
    const {socket} = useSocket();
    const loggedUserId = useSelector((state: RootState) => state.user.id);

    useEffect(()=>{
        if(deleteRoomId){
            const leavedRoomList = chattingRoomList.filter((roomList)=>roomList.rooms.id !== Number(deleteRoomId))
            console.log('leavedRoomList',leavedRoomList)
            setCopyRoomList(leavedRoomList)
        }else{
            setCopyRoomList(chattingRoomList)
        }
    },[deleteRoomId])
    
    // 상대방이 메세지 보냈을 때 최신 데이터 동기화
    const getChattingRoomList = async () => {
        try {
          const response = await axios.get(`/room/list/${loggedUserId}`);
          const rooms = response.data as RoomType[];
      
          const chattingLists: chattingRoomListType[] = [];
      
          for (const room of rooms) {
            let product: productListType | null = null;
            let chatData: LatestChatType | null = null;
            let opponentName: string | null = null;
      
            // room의 content 정보 얻어오기
            if (room.content_id !== undefined) {
              const productResponse = await axios.get(`/content/read/${room.content_id}`);
              product = productResponse.data;
            }
      
            // 상대방 이름 받아오기
            if (room.buyer_id !== undefined) {
              try {
                const response = await getUserName(room.buyer_id);
                if (response.status === 200) {
                  opponentName = response.data;
                } else {
                  console.error(`Failed to fetch opponent name for buyer_id ${room.buyer_id}`);
                }
              } catch (error:any) {
                console.error(`Error fetching opponent name for buyer_id ${room.buyer_id}: ${error.message}`);
              }
            }
      
            // room의 마지막 대화정보 얻어오기
            if (room.id !== undefined) {
              try {
                const latestChat: LatestChatType = await axios.get(`/chat/latest/${room.id}`).then((response) => response.data);
                chatData = latestChat;
              } catch (error:any) {
                console.error(`Error fetching latest chat for room id ${room.id}: ${error.message}`);
              }
            }
      
            const chattingList: chattingRoomListType = {
              rooms: room,
              product: product,
              chatData: chatData,
              opponentName: opponentName,
            };
      
            chattingLists.push(chattingList);
          }
      
          return chattingLists;
        } catch (error:any) {
          console.error(`Error fetching chatting room list: ${error.message}`);
          // 에러 발생 시 빈 배열 또는 다른 기본값을 반환하거나, 상황에 따라 에러를 다시 throw하여 상위 컴포넌트에서 처리할 수 있습니다.
          return [];
        }
      };
      

    useEffect(()=>{
        socket?.on('chat_notification', (message:messagePayload) => {
            getChattingRoomList().then((response)=>{
                if(response){
                    setCopyRoomList(response)
                }
            })
    })          
    },[socket])

    return (
        <Container>
            {isEmpty(copyRoomList) ? 
                <p>아직 채팅 상대방이 없습니다</p>
            : copyRoomList.map((chatting)=>(
                <ChattingList chattingRoomList={chatting} key={chatting.rooms.id} setDeleteRoomId={setDeleteRoomId}  />
            ))}
            <LinkFooter/>
        </Container>
    );
};

// 서버사이드 렌더링으로 chatting list 가져옴
export const getServerSideProps :GetServerSideProps = async ({query})=>{
    const {id:userId} = query;
    // chatlist api요청
    try{
        const response = await axios.get(`/room/list/${userId}`)
        const rooms = response.data as RoomType[];

        const chattingLists: chattingRoomListType[] = []; // An array to store multiple chattingList objects

        for (const room of rooms) {
            let product:productListType|null = null;
            let chatData:LatestChatType|null = null;
            let opponentName:string|null = null;

            // room의 content 정보 얻어오기
            if (room.content_id !== undefined) {
                const productResponse = await axios.get(`/content/read/${room.content_id}`);
                product = productResponse.data;
            }

            // 상대방 이름 받아오기
            if(Number(userId) !== room.buyer_id ){
                const response = await getUserName(room.buyer_id)
                if(response.status===200){
                    opponentName = response.data
                }
            }
            if(Number(userId) !== room.seller_id ){
                const response = await getUserName(room.seller_id)
                if(response.status===200){
                    opponentName = response.data
                }
            }

            // room의 마지막 대화정보 얻어오기
            if(room.id !== undefined){
                const latestChat:LatestChatType = await axios.get(`/chat/latest/${room.id}`).then((response)=>response.data)
                chatData=latestChat
            }

            const chattingList: chattingRoomListType = {
                rooms: room,
                product: product,
                chatData: chatData,
                opponentName:opponentName
            };

            chattingLists.push(chattingList);
        }

        return{
            props:{
                chattingRoomList:chattingLists
            }
        }

    }catch(e){
        console.log(e)
        return{
            props:{},
        }
    }
}


export default chattingList;