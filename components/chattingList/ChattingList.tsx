import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import Xicon from "../../public/static/svg/product/thumnailXicon.svg"
import { useSocket } from '../../context/socket.context';
import { chattingRoomListType } from '../../pages/user/chatting/[id]';
import BackImage from '../common/BackImage';
import { useRouter } from 'next/router';
import { RootState, useSelector } from '../../store';
import { convertToDatetime, convertToLongText } from '../../lib/utils';

const Container = styled.div`
    display:flex;
    align-items:center;
    height:130px;
    padding:10px;
    border-bottom:1px solid #D9D9D9;

    .list-profileImage{
        text-align:center;
        padding-top:10px;
        margin-left:10px;
        margin-right:20px;
        img{
            width:60px;
            height:60px;   
            border-radius:50px;  
            object-fit:cover;
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
                font-size:20px;
                font-weight:bold;
            }
            .list-leave-modal{
                display:flex;
                align-items:center;
                justify-content:space-between;
                position: relative;
                .list-date{
                    font-size:15px;
                    color:${palette.updatedDate};
                    text-align:right;
                    margin-right:8px;
                }
                .leave-button{
                    cursor:pointer;
                }
                .leave-room-text{
                    display:none;
                    background-color:white;
                    border:1px solid gray;
                    padding:2px;
                }
                .leave-button:hover + .leave-room-text{
                    display:block;
                    width:100%;
                    position:absolute;
                    top:20px;
                    left:20px;
                }
            }
        }
        .list-content{
            font-size:16px;
            .not-confirmed-message{
                color:black;
                font-weight:bold;
            }
            .confirmed-message{
                
            }
        }
    }

`

interface IProps{
    chattingRoomList:chattingRoomListType;
    setLeaveRoomId:React.Dispatch<React.SetStateAction<string | undefined>>
}

const ChattingList:React.FC<IProps> = ({chattingRoomList,setLeaveRoomId}) => {
    console.log('전달받은 리스트',chattingRoomList)
    const {socket} = useSocket();
    const router = useRouter();
    const loggedUserId = useSelector((state: RootState) => state.user.id);

    const {rooms,product,chatData} = chattingRoomList

    
    // 마지막 대화를 읽었는지 확인
    const confirmLastMessage = ()=>{
        if(chatData && rooms && product){
            if(loggedUserId === rooms.buyer_id && rooms.buyer_confirm_time ){
                if(chatData.send_id !== loggedUserId && chatData.createdAt > rooms.buyer_confirm_time){
                    return <p className='not-confirmed-message'>{chatData.message}</p>
                }else{
                    return <p className='confirmed-message'>{chatData.message}</p>
                }
            }else if(loggedUserId === rooms.seller_id && rooms.seller_confirm_time){
                if(chatData.send_id !== loggedUserId && chatData.createdAt > rooms.seller_confirm_time){
                    return <p className='not-confirmed-message'>{chatData.message}</p>
                }else{
                    return <p className='confirmed-message'>{chatData.message}</p>
                }
            }
        }
    }

    // 채팅방 나가기 이벤트
    
    const leaveRoom = async ()=>{
        console.log('채팅방나가기 클릭')
        await socket?.emit("delete_room",rooms)
        socket?.on("delete_room",((data:string)=>{
            alert('채팅방 나가기 완료')
            console.log(data)
            setLeaveRoomId(data) 
        }))
    }

    const goToChattingRoom = ()=>{
         // 소켓 연결 - 채팅접속
        if(socket){
            socket.emit("join_room",rooms)
        }
        router.push({
            pathname: `/user/chatting/room/${rooms.id}`,
            query: { 
                title:product?.title,
                price:product?.price},
        });
    }

    return (
        <Container>
            <div className='list-profileImage'>
                {chattingRoomList?.product?.images[0] && chattingRoomList?.product?.images[0].path !== "upload/undefined" ? 
                <BackImage src={chattingRoomList?.product?.images[0].path} alt="상품이미지"/> : 
                <img
                    src={"/static/svg/product/default_img.svg"}
                    className="default-img"
                    alt="기본이미지"
                />
                }
            </div>
            <div className='list-info'>
                <div className='list-info-header'>
                    <p className='list-name' onClick={goToChattingRoom}>
                        {convertToLongText(chattingRoomList?.product?.title,13)}
                    </p>
                    <div className='list-leave-modal'>
                        <p className='list-date'>
                            {!!chattingRoomList?.chatData?.createdAt ? convertToDatetime(String(chattingRoomList?.chatData?.createdAt)) :
                            null
                            }
                        </p>
                        <Xicon className="leave-button" onClick={leaveRoom}/>
                        <p className='leave-room-text'>채팅방 나가기</p>
                    </div>
                </div>
                <div className='list-content'>
                    {
                    chatData?.message 
                        ? confirmLastMessage()
                        : '아직 채팅이 이루어지지 않았습니다'
                    }
                </div>
            </div>
        </Container>
    );
};

export default ChattingList;