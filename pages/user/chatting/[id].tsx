import React, { useState } from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import ChattingList from '../../../components/chattingList/ChattingList';
import styled from 'styled-components';
import { useSocket } from '../../../context/socket.context';
import { GetServerSideProps } from 'next';
import axios from '../../../lib/api';
import { NextPage } from 'next';
import { Users } from '../../../types/user';
import { productListType } from '../../../types/product/product';


const Container = styled.div`
    @media only screen and (min-width: 430px) {
	    min-height:100vh;
    }
`

type PropsType = {
    chattingRoomList:chattingRoomListType[]
}

export type chattingRoomListType = {
    rooms:RoomType,
    product:productListType|null,
    chatData:LatestChatType|null,
}

export type RoomType = {
    id?:number,
    content_id:number,
    seller_id:number,
    buyer_id:number,
}

export type LatestChatType = {
    id?:number,
    send_id?:number,
    message:string,
    updatedAt:Date,
    room:RoomType
}

const chattingList:NextPage = (props) => {
    const {chattingRoomList} = props as PropsType
    console.log(chattingRoomList)
    return (
        <Container>
            {chattingRoomList.map((chatting)=>(
                <ChattingList chattingRoomList={chatting} key={chatting.rooms.content_id}/>
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
        console.log('rooms',rooms)

        const chattingLists: chattingRoomListType[] = []; // An array to store multiple chattingList objects

        for (const room of rooms) {
            let product:productListType|null = null;
            let chatData:LatestChatType|null = null;

            // room의 content 정보 얻어오기
            if (room.content_id !== undefined) {
                const productResponse = await axios.get(`/content/read/${room.content_id}`);
                product = productResponse.data;
                console.log('product', product);
            }

            // room의 마지막 대화정보 얻어오기
            if(room.id !== undefined){
                const latestChat:LatestChatType = await axios.get(`/chat/latest/${room.id}`).then((response)=>response.data)
                console.log('----lastChat',latestChat)
                chatData=latestChat
            }

            const chattingList: chattingRoomListType = {
                rooms: room,
                product: product,
                chatData: chatData
            };

            chattingLists.push(chattingList);
            console.log('서버에서 최종 전달값',chattingLists)
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