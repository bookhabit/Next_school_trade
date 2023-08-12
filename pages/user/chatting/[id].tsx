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
    chatData:{
        updatedDate:string,
        lastMessage:string,
    }
}

export type RoomType = {
    id:string,
    content_id:string,
    seller_id:string,
    buyer_id:string,
}

const chattingList:NextPage = (props) => {
    const {chattingRoomList} = props as PropsType
    console.log(chattingRoomList)

    // TODO :  join_room_list 데이터 받아서 처리


    

    const testChattingListCount = [
            {
                id:1,
                name:"김상원",
                profileImage:"/static/svg/myPage/userProfileIcon.svg",
                content:"대정문으로 와주실 수 있나요?",
                chattingDate:"1일 전"
            },
            {
                id:2,
                name:"차민재",
                profileImage:"/static/svg/myPage/userProfileIcon.svg",
                content:"25000원 가능한가요?",
                chattingDate:"2일 전",
            },
            {
                id:3,
                name:"박태웅",
                profileImage:"/static/svg/myPage/userProfileIcon.svg",
                content:"네 거기서 봅시다~",
                chattingDate:"3일 전"
            },
            {
                id:4,
                name:"신동민",
                profileImage:"/static/svg/myPage/userProfileIcon.svg",
                content:"네 맞습니다.",
                chattingDate:"1주 전"
            },
            {
                id:5,
                name:"조윤재",
                profileImage:"/static/svg/myPage/userProfileIcon.svg",
                content:"감사합니다.",
                chattingDate:"1개월 전"
    
            }
    ]
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
            let product = null;

            if (room.content_id !== undefined) {
                const productResponse = await axios.get(`/content/read/${room.content_id}`);
                product = productResponse.data;
                console.log('product', product);
            }

            const chattingList: chattingRoomListType = {
                rooms: room,
                product: product,
                chatData: {
                    updatedDate: '1일전',
                    lastMessage: "구매가능할까요?",
                }
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