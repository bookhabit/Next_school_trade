import React from 'react';
import styled from 'styled-components';
import LogoIcon from "../../public/static/svg/logo.svg"
import palette from '../../styles/palette';
import { Notificaitions } from '../../types/alarm';
import { convertToDatetime, convertToLongText } from '../../lib/utils';

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
    .list-info-box{
        width:100%;
        .list-info{
            .list-userName{
                font-size:16px;
            }
            .list-alarmType{
                font-size:18px;
                color:${palette.gray_80}
            }
            .list-middle{
                display:flex;
                align-items:center;
                justify-content:space-between;
                margin-top:20px;
                .list-content{
                    font-size:18px;    
                    line-height: 23px;
                }
                .list-date{
                    width:100px;
                    font-size:15px;
                    color:${palette.updatedDate};
                    text-align:right;
                    margin-right:30px;
                }
            }
        }
    }

`
interface IProps{
    alarm:Notificaitions
}


const AlarmList:React.FC<IProps> = ({alarm}) => {
    const getAlarmType = (type:number)=>{
        switch(type){
            case 1:
                return "리뷰를 남겼습니다"
        }
    }
    return (
        <Container>
            <div className='list-logo'>
                <LogoIcon/>
            </div>
            <div className='list-info-box'>
                <div className='list-info'>
                    <div className='list-header'>
                        <p className='list-userName'>{alarm.notifier.nickname} 님이 <span className='list-alarmType'>{getAlarmType(alarm.type)}</span></p>
                    </div>
                    <div className='list-middle'>
                        <p className='list-content'>{convertToLongText(alarm.msg,25)}</p>
                        <p className='list-date'>{convertToDatetime(String(alarm.createdAt))}</p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AlarmList;