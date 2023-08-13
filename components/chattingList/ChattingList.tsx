import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import Xicon from "../../public/static/svg/product/thumnailXicon.svg"
import { useSocket } from '../../context/socket.context';
import { chattingRoomListType } from '../../pages/user/chatting/[id]';
import BackImage from '../common/BackImage';
import { useRouter } from 'next/router';
import { RootState, useSelector } from '../../store';

const Container = styled.div`
    display:flex;
    align-items:center;
    height:130px;
    padding:10px;
    border-bottom:1px solid #D9D9D9;

    .list-profileImage{
        width:60px;
        height:60px;
        background-color:${palette.main_color};
        border-radius:50px;
        text-align:center;
        padding-top:10px;
        margin-left:10px;
        margin-right:20px;
        img{
            width:30px;
            height:40px;     
            filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
        }
    }
    .list-info{
        width:300px;
        .list-info-header{
            margin-bottom:10px;
            display:flex;
            justify-content:space-between;
            .list-name{
                cursor: pointer;
                font-size:23px;
                font-weight:bold;
            }
            .list-leave-modal{
                display:flex;
                align-items:center;
                justify-content:space-between;
                .list-date{
                    font-size:15px;
                    color:${palette.updatedDate};
                    text-align:right;
                    margin-right:8px;
                }
                .leave-button{
                    cursor:pointer;
                }
            }
        }
        .list-content{
            font-size:20px;
        }
    }

`

interface IProps{
    chattingRoomList:chattingRoomListType
}

const ChattingList:React.FC<IProps> = ({chattingRoomList}) => {
    const {socket} = useSocket();
    const router = useRouter();
    const loggedUserId = useSelector((state: RootState) => state.user.id);
    // 채팅방 나가기 이벤트
    
    const leaveRoom = async ()=>{
        await socket?.emit("leave_room",chattingRoomList.rooms)
        router.reload();
    }

    const goToChattingRoom = ()=>{
        // content_id , seller_id , buyer_id
        const roomKey = `${chattingRoomList.rooms.content_id}-${chattingRoomList.rooms.seller_id}-${chattingRoomList.rooms.buyer_id}`
         // 소켓 연결 - 채팅접속
         if(socket){
            socket.emit("join_room",chattingRoomList.rooms)
        }
        router.push({
            pathname: `/user/chatting/room/${roomKey}`,
            query: { 
                title:chattingRoomList.product?.title,
                price:chattingRoomList.product?.price},
        });
    }

    return (
        <Container>
            <div className='list-profileImage'>
                {chattingRoomList?.product?.images[0] && 
                <BackImage src={chattingRoomList?.product?.images[0].path} alt="상품이미지" />
                }
            </div>
            <div className='list-info'>
                <div className='list-info-header'>
                    <p className='list-name' onClick={goToChattingRoom}>
                        {chattingRoomList?.product?.title}
                    </p>
                    <div className='list-leave-modal'>
                        <p className='list-date'>
                            {chattingRoomList?.chatData.updatedDate}
                        </p>
                        <Xicon className="leave-button" onClick={leaveRoom}/>
                    </div>
                </div>
                <p className='list-content'>
                    {chattingRoomList?.chatData.lastMessage}
                </p>
            </div>
        </Container>
    );
};

export default ChattingList;