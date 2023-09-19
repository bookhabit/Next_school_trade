import React, { useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
// import AirbnbLogoIcon from "../public/static/svg/logo.svg"
import SearchIcon from "../../public/static/svg/header/mainHeader/searchIcon.svg"
import HambergerIcon from "../../public/static/svg/header/mainHeader/hambergerIcon.svg"
import AlarmIcon from "../../public/static/svg/header/mainHeader/alarmIcon.svg"
import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { searchBarActions } from '../../store/searchBar';
import alarm, { AlarmActions } from '../../store/alarm';
import { confirmAlarm, getAlarmInfo, getNotConfirmedAlarmInfo } from '../../lib/api/alarm';
import { useSocket } from '../../context/socket.context';
import { responseAlarmList } from '../../types/alarm';

const Conatainer = styled.div`
    position:sticky;
    top:0;
    width:100%;
    height:90px;
    background-color: ${palette.main_color};
    display:flex;
    align-items:center;

    .headerDiv{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:0px 10px;
        width:100%;
        height:45px;

        .university-name{
            width:22%;
            font-family:Roboto;
            font-size:18px;
            color:${palette.main_text_color};
            font-weight:bold;
            line-height:30px;
        }

        .searchBar{
            width:60%;
            background-color:${palette.main_text_color};
            border-radius:20px;
            padding:5px;
            display:flex;
            align-items:center;
            height:30px;                
            input {
                width: 90%;
                border: 0;
                border-radius:20px;
                font-size: 16px;
                font-weight: 600;
                outline: none;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &::placeholder {
                    font-size: 14px;
                    opacity: 0.7;
                }
            }
            .searchIcon{
                cursor: pointer;
            }

        }
        /* 사용자 알람정보 boolean state에 따라서 props를 전달받아야함 */
        .showAlarmBox{
            width:5%;
            div{
                cursor: pointer;
            }
            .alarmIcon{
                position: relative;
                .showAlarm{
                    cursor: pointer;
                    position:absolute;
                    top:-10px;
                    left:10px;
                    width:20px;
                    height:20px;
                    background-color:#f46430;
                    color:${palette.main_text_color};
                    font-size:15px;
                    font-weight:400px;
                    text-align:center;
                    align-items:center;
                    border-radius:50px;
                    padding-top:2px;
                }
            }
        }
        .categoryBox{
            width:5%;
        }

    }
    
`

const mainHeader = () => {
    const router = useRouter();
    const userUniversity = useSelector((state:RootState)=>state.user.university)

    // 로그인 확인
    const isLogged = useSelector((state:RootState)=>state.user.isLogged)
    const isLoggedUserId = useSelector((state:RootState)=>state.user.id)

    // 검색창 - input
    const searchValue = useSelector((state:RootState)=>state.searchBar.value)

    const dispatch = useDispatch();
    const {socket} = useSocket();
    
    const onChangeValue=(event:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(searchBarActions.setSearchValue(event.target.value))
    }

    // 유저의 알림 받아오기
    useEffect(() => {
        const fetchData = async () => {
          // REST API
          if (isLoggedUserId) {
            try {
              const response = await getNotConfirmedAlarmInfo(isLoggedUserId);
              const responseAlarmList = response.data as responseAlarmList 
              dispatch(AlarmActions.setAlarmList(responseAlarmList.notification_list))
            } catch (error) {
              console.error('알림을 가져오는 중 에러 발생:', error);
            }
          }
      
          // SOCKET
          socket?.on("notification", (data) => {
            console.log('notification 수신 data', data);
          });
        };
      
        fetchData();
      }, [isLoggedUserId]);
      

    // 유저의 알림 리스트
    const alarmList = useSelector((state:RootState)=>state.alarm.alarmList)

    // 유저가 확인하지 않은 알림 리스트
    const notConfirmedAlarmList = alarmList.filter((alarm)=>alarm.confirmed !== true)

    // 알림페이지로 이동
    const goToAlarm = async ()=>{
        if(isLogged){
            // 알림 디스패치 - false로 
            // TODO : notification/confirm/:id > 204 받은 후 처리
            const response = await alarmList.forEach((alarm)=>confirmAlarm(alarm.id))
            console.log('알림 확인',response)
            router.push(`/user/alarm/${isLoggedUserId}`)
        }else{
            alert('로그인이 필요합니다.')
            router.push("/auth")
        }
    }
    // 검색클릭하면 검색 리스트 페이지로 이동
    const goToSearch = ()=>{
        if(searchValue){
            router.push({
                pathname: '/search',
                query: { keyword:searchValue},
            },)
        }
    }

    return (
        <Conatainer>
            <div className='headerDiv'>
                <p className='university-name'>{userUniversity}</p>
                <div className='searchBar'>
                    <input className='searchInput' value={searchValue} placeholder='검색' onChange={onChangeValue} />
                    <SearchIcon className="searchIcon" onClick={goToSearch}/>
                </div>
                <div className='showAlarmBox'>
                    <div onClick={goToAlarm} className="alarmIcon">
                        <AlarmIcon/>
                        {notConfirmedAlarmList.length === 0 ? null : <span className='showAlarm'>{notConfirmedAlarmList.length}</span>  }
                    </div>
                </div>
                <Link href="/category" className='categoryBox'>
                    <HambergerIcon/>
                </Link>
            </div>
        </Conatainer>
    );
};

export default mainHeader;