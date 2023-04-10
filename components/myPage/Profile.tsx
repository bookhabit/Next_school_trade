import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import ProfileUserIcon from "../../public/static/svg/myPage/ProfileUserIcon.svg"
import CameraIcon from "../../public/static/svg/myPage/profileCamera.svg"
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Button from '../common/Button';


const Container = styled.div`
    padding:50px 20px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .profile-image{
        margin-top:20px;
        img{
            background-color:#FEFAFA;
            padding:10px;
            width:100px;
            height:100px;
            border-radius:50px;
        }
        label{
            background-image:url("/static/svg/myPage/profileCamera.svg");
            background-repeat:no-repeat;
            background-size: 50px 50px;
            width: 50px;
            height: 50px;
            position:absolute;
            left:212px;
            top:210px;
        }
        input[type="file"] {
            display:none;
        }
    }

    .profile-input{
        margin-top:40px;
        text-align:center;
        input{
            margin-top:40px;
            padding-left:20px;
            width:280px;
            height:40px;
            background-color:#F5F2F2;
            border-radius:40px;
        }
        button{
            width:280px;
            height:40px;
            background-color:#F5F2F2;
            border-radius:40px;
            font-size:15px;
            font-weight:bold;
        }
    }



    .submit-btn{
        margin-top:50px;
    }
`

const Profile = () => {
    const [changePassword,setChangePassword] = useState(false);

    const showPasswordInput = ()=>{
        setChangePassword(!changePassword);
    }

    // 유저 정보 불러오기
    const LoggedUser = useSelector((state:RootState)=>state.user)

    return (
        <Container>
            <div className='profile-image'>
                {/* <img src={LoggedUser.profileImage} alt="프로필 이미지"/> */}
                <ProfileUserIcon/>
                <label htmlFor='file-input'/>
                <input type="file" id="file-input"/>
            </div>
            <div className='profile-input'>
                <input type='text' placeholder='닉네임'
                defaultValue={LoggedUser.nickname}
                />
                <button onClick={showPasswordInput} className='profile-input'>
                    비밀번호 변경
                </button>
                { changePassword ? 
                <>
                    <input type='text' placeholder='현재 비밀번호'/>
                    <input type='text' placeholder='새 비밀번호'/>
                </> : null}
                
            </div>
            <div className='submit-btn'>
                <Button width='280px' height='40px' radius='30px'>수정하기</Button>
            </div>
        </Container>
    );
};

export default Profile;