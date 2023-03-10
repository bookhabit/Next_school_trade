import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import PlusBtn from "../../public/static/svg/chatting/plusBtn.svg"
import SubmitBtn from "../../public/static/svg/chatting/submitBtn.svg"

const Container= styled.div`
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

const ChattingRoomFooter = () => {
    return (
        <Container>
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
            
        </Container>
    );
};

export default ChattingRoomFooter;