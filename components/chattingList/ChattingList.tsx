import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

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
        width:270px;
        .list-info-header{
            margin-bottom:10px;
            display:flex;
            justify-content:space-between;
            .list-name{
                font-size:23px;
                font-weight:bold;
            }
            .list-date{
                font-size:15px;
                color:${palette.updatedDate};
                text-align:right;
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
                    <p className='list-date'>
                        {chatting.chattingDate}
                    </p>
                </div>
                <p className='list-content'>
                    {chatting.content}
                </p>
            </div>
        </Container>
    );
};

export default ChattingList;