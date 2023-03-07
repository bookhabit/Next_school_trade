import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container= styled.div`
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

const ChattingRoom = () => {
    // 채팅하는 상대방 , 게시글, 실시간채팅에 따라서 알맞게 정보를 넣어주기 - 현재는 정적페이지
    return (
        <Container>
            <div className='chatting-header'>
                <p className='post-title'>축구화 살사람??</p>
                <p className='post-price'>65,000원</p>
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
        </Container>
    );
};

export default ChattingRoom;