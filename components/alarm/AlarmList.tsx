import React from 'react';
import styled from 'styled-components';
import LogoIcon from "../../public/static/svg/logo.svg"
import palette from '../../styles/palette';

const Container = styled.div`
    display:flex;
    align-items:center;
    height:130px;
    padding:10px;
    border-bottom:1px solid #D9D9D9;
    .list-logo{
        margin-left:10px;
        margin-right:20px;
    }
    .list-info{
        width:270px;
        .list-content{
            margin-top:20px;
            font-size:20px;    
            line-height: 23px;
        }
        .list-date{
            margin-top:5px;
            float:right;
            font-size:15px;
            color:${palette.updatedDate};
            text-align:right;
        }
    }

`
interface IProps{
    alarm:{
        content:string;
        alarmDate:string;
    };
}


const AlarmList:React.FC<IProps> = ({alarm}) => {
    return (
        <Container>
            <div className='list-logo'>
                <LogoIcon/>
            </div>
            <div className='list-info'>
                <p className='list-content'>{alarm.content}</p>
                <p className='list-date'>{alarm.alarmDate}</p>
            </div>
        </Container>
    );
};

export default AlarmList;