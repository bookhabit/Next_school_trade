import React from 'react';
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

        p{
            width:20%;
            font-family:Roboto;
            font-size:20px;
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
        .alarmBox{
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
                    left: 10px;
                    width:20px;
                    height:20px;
                    background-color:#F1531A;
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
    const [testAlarmState,setTestAlarmState] = useState<boolean>(true)
    const testAlarmCount = 2
    const userUniversity = useSelector((state:RootState)=>state.user.university)

    // 로그인 확인
    const isLogged = useSelector((state:RootState)=>state.user.isLogged)
    const router = useRouter();
    const goToAlarm = ()=>{
        if(isLogged){
            router.push("/user/alarm")
        }else{
            alert('로그인이 필요합니다.')
            router.push("/auth")
        }
    }

    // 검색창 - input
    const searchValue = useSelector((state:RootState)=>state.searchBar.value)
    console.log('serarchValue',searchValue)

    const dispatch = useDispatch();
    
    // dispatch(searchBarActions.setSearchValue())
    const onChangeValue=(event:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(searchBarActions.setSearchValue(event.target.value))
    }


    return (
        <Conatainer>
            <div className='headerDiv'>
                <p>{userUniversity}</p>
                <div className='searchBar'>
                    <input className='searchInput' value={searchValue} placeholder='검색' onChange={onChangeValue} />
                    <SearchIcon className="searchIcon"/>
                </div>
                <div className='alarmBox'>
                    <div onClick={goToAlarm} className="alarmIcon">
                        <AlarmIcon/>
                        {testAlarmState ? <span className='showAlarm'>{testAlarmCount}</span>  : null}
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