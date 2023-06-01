import React from 'react';
// import ChattingRoom from '../../../components/chattingList/ChattingRoom';
// import ChattingRoomFooter from '../../../components/footer/ChattingRoomFooter';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import styled from 'styled-components';
import palette from '../../../styles/palette';
import SubmitBtn from "../../../public/static/svg/chatting/submitBtn.svg"
import io from "socket.io-client"

const socket = io("http://localhost:8080/chat")

const Container = styled.div`
    @media only screen and (min-width: 430px) {
	    min-height:100vh;
    }
`

const ChattingRoomContainer= styled.div`
    width:100%;
    padding-bottom:70px;
    /* 게시글 설명 css */
    .chatting-header{
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
    }
    .chatting-last-date{
        width:100%;
        height:30px;
        color:${palette.updatedDate};
        font-size:12px;
        text-align:center;
        padding-top:5px;
        margin-top:20px;
        margin-bottom:20px;
    }
    .chatting-message-box{
        width:100%;
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
            .chatting-updateDate{
                font-size:12px;
                height:auto;
                color:${palette.updatedDate};
                margin-right:10px;
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

const ChattingFooter= styled.div`
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

const chattingRoom:NextPage = (props) => {
    const {chatData} = props as PropsType
    
    return (
        <Container>
             <ChattingRoomContainer>
            <div className='chatting-header'>
                <p className='post-title'>{chatData.title}</p>
                <p className='post-price'>{chatData.price} 원</p>
            </div>
            <div className='chatting-message-box'>
                <p className='chatting-last-date'>2023년 2월 25일</p>
                <div className='chatting-me'>
                    <p className='chatting-content'>저 그 축구화 혹시 얼마에 살 수 있을까요?</p>
                    <p className='chatting-updateDate'>오후 12:06</p>
                </div>
                <div className='chatting-opponent'>
                    <div className='opponent-profile'>
                        <img src="/static/svg/chatting/opponent.svg" alt="상대방 프로필이미지"/>
                    </div>
                    <p className='chatting-content'>65000원인데 한 번 보시고 조율해봐도 됩니다!</p>
                    <p className='chatting-updateDate'>오후 12:15</p>
                </div>
                <div className='chatting-me'>
                    <p className='chatting-content'>그럼 어디서 만날까요?? 혹시 내일 3시 시간 괜찮으신가요??</p>
                    <p className='chatting-updateDate'>오후 12:16</p>
                </div>
                <div className='chatting-opponent'>
                    <div className='opponent-profile'>
                        <img src="/static/svg/chatting/opponent.svg" alt="상대방 프로필이미지"/>
                    </div>
                    <p className='chatting-content'>그럼 내일 3시에 이디야 카페에서 보는건 어떠신가요?</p>
                    <p className='chatting-updateDate'>오후 12:30</p>
                </div>
                <div className='chatting-me'>
                    <p className='chatting-content'>네 알겠습니다 그럼 내일 3시에 뵐게요~~</p>
                    <p className='chatting-updateDate'>오후 12:32</p>
                </div>
            </div>
        </ChattingRoomContainer>
        <ChattingFooter>
            <div className='chatting-file'>
                <label htmlFor='file-input'>+</label>
                <input type="file" id="file-input"/>
            </div>
            <div className='chatting-message'>
                <input type="text" placeholder='메세지 보내기'/>
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