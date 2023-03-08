import React from 'react';
import ChattingRoom from '../../../components/chattingList/ChattingRoom';
import ChattingRoomFooter from '../../../components/footer/ChattingRoomFooter';
import { useRouter } from 'next/router';

const chattingRoom = () => {
    const router = useRouter();
    console.log(router)
    return (
        <>
         <ChattingRoom/>
         <ChattingRoomFooter/>
        </>
    );
};

export default chattingRoom;