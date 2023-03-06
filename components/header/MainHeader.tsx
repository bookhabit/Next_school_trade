import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
// import AirbnbLogoIcon from "../public/static/svg/logo.svg"
import SearchIcon from "../../public/static/svg/header/mainHeader/searchIcon.svg"
import HambergerIcon from "../../public/static/svg/header/mainHeader/hambergerIcon.svg"
import AlarmIcon from "../../public/static/svg/header/mainHeader/alarmIcon.svg"
import { useState } from 'react';
import Link from 'next/link';

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
            font-family:Roboto;
            font-size:20px;
            color:${palette.main_text_color};
            font-weight:bold;
        }

        .searchBar{
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

        }
        /* 사용자 알람정보 boolean state에 따라서 props를 전달받아야함 */
        .alarmBox{
            .showAlarm{
                position:absolute;
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
                top:22px;
                left: calc(50% - 9px/2 + 150px)
            }
        }

    }
    
`

const mainHeader = () => {
    const [testAlarmState,setTestAlarmState] = useState<boolean>(true)
    const testAlarmCount = 2
    return (
        <Conatainer>
            <div className='headerDiv'>
                <p>한서대</p>
                <div className='searchBar'>
                    <input className='searchInput' placeholder='검색'/>
                    <SearchIcon className="searchIcon"/>
                </div>
                <div className='alarmBox'>
                    <Link href="/user/alarm">
                        <AlarmIcon className="alarmIcon"/>
                    </Link>
                    {testAlarmState ? <span className='showAlarm'>{testAlarmCount}</span>  : null}
                </div>
                <Link href="/category">
                    <HambergerIcon/>
                </Link>
            </div>
        </Conatainer>
    );
};

export default mainHeader;