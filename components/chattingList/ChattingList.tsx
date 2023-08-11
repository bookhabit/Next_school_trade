import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import Xicon from "../../public/static/svg/product/thumnailXicon.svg"
import { useSocket } from '../../context/socket.context';

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
    chatting:{
        profileImage:string,
        name:string,
        content:string;
        chattingDate:string;
    };
}

const ChattingList:React.FC<IProps> = ({chatting}) => {
    const {socket} = useSocket();
    // 채팅방 나가기 이벤트
    const rooms = {
        content_id:"",
        seller_id:"",
        buyer_id:"",
    }
    const leaveRoom = ()=>{
        if(socket){
            socket.emit("leave_room",rooms)
        }
    }
    return (
        <Container>
            <div className='list-profileImage'>
                <img src={chatting.profileImage} alt="사용자 프로필 이미지"/>
            </div>
            <div className='list-info'>
                <div className='list-info-header'>
                    <p className='list-name'>
                        {chatting.name}
                    </p>
                    <div className='list-leave-modal'>
                        <p className='list-date'>
                            {chatting.chattingDate}
                        </p>
                        <Xicon className="leave-button" onClick={leaveRoom}/>
                    </div>
                </div>
                <p className='list-content'>
                    {chatting.content}
                </p>
            </div>
        </Container>
    );
};

export default ChattingList;