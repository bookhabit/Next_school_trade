import React, { ChangeEventHandler, useState } from 'react';
import LogoIcon from "../../public/static/svg/index/logo.svg"
import styled from 'styled-components';
import palette from '../../styles/palette';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserState } from '../../types/reduxState';
import Button from '../common/Button';
import SearchIcon from "../../public/static/svg/introduce/searchIcon.svg"
import { productCategoryList } from '../../lib/staticData';
import CategoryCard from './CategoryCard';
import { useDispatch } from 'react-redux';
import { searchBarActions } from '../../store/searchBar';

const Container = styled.div`
    position:fixed;
    height:100vh;
    background-color:white;
    padding-top:100px;
    text-align:center;
    background-color:transparent;

    .introduce-text{
        margin-top:80px;
        p{
            font-size:25px;
            font-weight:bold;
        }
        p:nth-child(1){
            margin-right:40px;
        }
        p:nth-child(2){
            margin-top:20px;
            margin-left:40px;
            span{
                font-size:30px;
                color:${palette.input_focus};
            }
        }
    }
    // 로그인했을 경우
    .introduce-bottom{
        margin-top:90px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        .introduce-search-bar{
            background-color:${palette.main_text_color};
            border:3px solid ${palette.main_color};
            border-radius:20px;
            padding:5px;
            display:flex;
            align-items:center;
            width:330px;
            height:80px;   
            input {
                width: 90%;
                border: 0;
                border-radius:20px;
                font-size: 25px;
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
    }

    // 로그인 안됬을 경우
    .startBtn{
        margin-top:170px;
    }
`

const Introduce = () => {
    const user:UserState = useSelector((state:RootState):UserState=>state.user)
    const isLogged = user.isLogged;
    const linkAsIsLogged = ()=>{
        return isLogged ? "/" : "/auth"
    }

    // 검색창 value - 메인헤더와 일치시키기
    const searchValue = useSelector((state:RootState)=>state.searchBar.value)

    const dispatch = useDispatch();
    
    const onChangeValue=(event:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(searchBarActions.setSearchValue(event.target.value))
    }

    return (
        <Container>
            <LogoIcon/>
            <div className='introduce-text'>
                <p>대학생활에 필요한 물건들을</p>
                <p>주변 학생들과 <span>공유</span>해보세요</p>
            </div>
            {/* 로그인에 따라 다른 UI */}
            {isLogged ? 
            <div className='introduce-bottom'>
                <div className='introduce-search-bar'>
                    <input className='searchInput' value={searchValue}  onChange={onChangeValue} />
                    <SearchIcon className="searchIcon"/>
                </div>
                <CategoryCard/>
            </div>
            :
            <div className='startBtn'>
                <Link href={linkAsIsLogged()}>
                    <Button width='260px' height='60px' radius='30px'>로그인</Button>
                </Link>
            </div>
            }
            
        </Container>
    );
};

export default Introduce;