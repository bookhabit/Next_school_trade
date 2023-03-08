import React from 'react';
import ChattingRoom from '../../../components/chattingList/ChattingRoom';
import ChattingRoomFooter from '../../../components/footer/ChattingRoomFooter';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

const chattingRoom:NextPage = (id) => {
    console.log('채팅방페이지의 sellerId')
    return (
        <>
         <ChattingRoom/>
         <ChattingRoomFooter/>
        </>
    );
};

chattingRoom.getInitialProps = async ({query})=>{
    const {id} = query;
    // 이 id값은 채팅방 페이지의 seller의 userId를 뜻한다  
    // sellerId를 가진 유저와 접근하여 현재로그인된 사용자와 채팅을 한다
    
    return {id}
  }

export default chattingRoom;