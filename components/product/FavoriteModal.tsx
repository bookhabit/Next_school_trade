import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useRouter } from 'next/router';

const Container = styled.div`
    position:fixed;
    left: 50%;
    transform: translateX( -50% );
    bottom:80px !important;      
    width:320px;
    height:50px;
    padding:0px 20px;
    background-color:${palette.errorPage};
    border-radius:10px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    .add-favorite-text{
        font-size:12px;
        color:${palette.main_text_color}
    }
    .favorite-link{
        cursor: pointer;
        font-size:12px;
        font-weight:bold;
        color:black;
    }
`

const FavoriteModal = () => {
    const loggedUserId = useSelector((state:RootState)=>state.user.id)
    const router = useRouter();
    return (
        <Container>
            <p className='add-favorite-text'>관심목록에 추가했습니다</p>
            <p className='favorite-link' onClick={()=>{
                router.push(`/user/favorite/${loggedUserId}`)
            }}>관심목록 보기</p>
        </Container>
    );
};

export default FavoriteModal;