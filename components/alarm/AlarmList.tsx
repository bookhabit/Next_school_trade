import React from 'react';
import styled from 'styled-components';
import LogoIcon from "../../public/static/svg/logo.svg"
import palette from '../../styles/palette';
import { Notificaitions } from '../../types/alarm';
import { convertToDatetime, convertToLongText } from '../../lib/utils';
import CloseXIcon from "../../public/static/svg/auth/modal_close_x_icon.svg"

const Container = styled.div`
    display:flex;
    align-items:center;
    height:130px;
    padding:30px 10px;
    border-bottom:1px solid #D9D9D9;
    .alarm-logo{
        margin-left:10px;
        margin-right:20px;
    }
    .alarm-card{
        display:flex;
        align-items:center;
        width:100%;
        height:70px;
        .alarm-info-box{
            width:80%;
            height:100%;
            .alarm-info{
                .alarm-userName{
                    font-size:16px;
                }
                .alarm-alarmType{
                    font-size:18px;
                    color:${palette.gray_80}
                }
                .alarm-middle{
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    margin-top:20px;
                    .list-content{
                        font-size:18px;    
                        line-height: 23px;
                    }
                }
            }
        }
        .alarm-extra{
            width:20%;
            display:flex;
            flex-direction: column; 
            justify-content: space-between;
            align-items:center;
            height:100%;
            .delete-icon{
                cursor: pointer;
            }
            .alarm-date{
                width:100%;
                text-align:right;
                font-size:15px;
                color:${palette.updatedDate};
                margin-right:30px;
            }
        }
    }

`
interface IProps{
    alarm:Notificaitions
    deleteAlarm:any
}


const AlarmList:React.FC<IProps> = ({alarm,deleteAlarm}) => {
    const getAlarmType = (type:number)=>{
        switch(type){
            case 1:
                return "리뷰를 남겼습니다"
        }
    }

    return (
        <Container>
            <div className='alarm-logo'>
                <LogoIcon/>
            </div>
            <div className='alarm-card'>
                <div className='alarm-info-box'>
                    <div className='alarm-info'>
                        <div className='alarm-header'>
                            <p className='alarm-userName'>{alarm.notifier.nickname} 님이 <span className='alarm-alarmType'>{getAlarmType(alarm.type)}</span></p>
                        </div>
                        <div className='alarm-middle'>
                            <p className='alarm-content'>{convertToLongText(alarm.msg,25)}</p>
                        </div>
                    </div>
                </div>
                <div className='alarm-extra'>
                    <CloseXIcon className="delete-icon" onClick={()=>deleteAlarm(alarm.id)}/>
                    <p className='alarm-date'>{convertToDatetime(String(alarm.createdAt))}</p>
                </div>
            </div>
        </Container>
    );
};

export default AlarmList;