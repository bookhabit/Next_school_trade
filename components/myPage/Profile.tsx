import React, { ChangeEvent, ChangeEventHandler, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import ProfileUserIcon from "../../public/static/svg/myPage/ProfileUserIcon.svg"
import CameraIcon from "../../public/static/svg/myPage/profileCamera.svg"
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Button from '../common/Button';
import axios from 'axios';
import { useRouter } from 'next/router';


const Container = styled.form`
    padding:50px 20px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .profile-image{
        margin-top:20px;
        position: relative;
        img{
            padding:10px;
            width:120px;
            height:120px;
            border-radius:50px;
        }
        label{
            cursor: pointer;
            background-image:url("/static/svg/myPage/profileCamera.svg");
            background-repeat:no-repeat;
            background-size: 50px 50px;
            width: 50px;
            height: 50px;
            position:absolute;
            bottom:0px;
            right:0px;
        }
        input[type="file"] {
            display:none;
        }
    }

    .profile-input{
        margin-top:40px;
        text-align:center;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        .change-password-button{
            margin-top:40px;
            padding-top:13px;
            width:280px;
            height:40px;
            background-color:#F5F2F2;
            border-radius:40px;
            font-size:15px;
            cursor: pointer;
            &:hover{
                background-color:${palette.gray_bb};
            }
        }
        input{
            width:280px;
            height:40px;
            margin-top:40px;
            padding-left:20px;
            background-color:#F5F2F2;
            border-radius:40px;
        }
    }



    .submit-btn{
        margin-top:50px;
    }
`

const Profile = () => {
    // 로그인 유저 정보 불러오기
    const LoggedUser = useSelector((state:RootState)=>state.user)

    // state
    // 유저의 기본이미지 만들면 LoggedUser.profileImage 경로바꾸기 초기값
    const [thumnail,setThumnail] = useState("/static/svg/myPage/ProfileUserIcon.svg")
    const [profileImg,setProfileImg] = useState("/static/svg/myPage/ProfileUserIcon.svg")
    const [nickname,setNickname] = useState<string>(LoggedUser.nickname)
    const [password,setPassword] = useState<string>("")
    const [confirmPassword,setConfirmPassword] = useState("")

    const onUpload = (e: any) => {
        const file = e.target.files[0];
        setProfileImg(e.target.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(file);
      
        return new Promise<void>((resolve) => {
          reader.onload = () => {
            const imageUrl = reader.result;
            if (typeof imageUrl === 'string') {
                setThumnail(imageUrl);
            } else {
                setThumnail("");
            }
            resolve();
          };
        });
      };

    // 비밀번호변경 모달
    const [changePassword,setChangePassword] = useState(false);

    const showPasswordInput = ()=>{
        setChangePassword(!changePassword);
    }

    // 프로필 수정 api
    const onSubmit = async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        // form 확인
        const formData: FormData = new FormData();
        formData.append('images',profileImg);
        formData.append('nickname',nickname);
        formData.append('password',password);
        // FormData 객체의 내용 출력
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
        // api요청
        try{
            const result = await axios.post("http://localhost:4000/user/profile",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                 },
                 withCredentials: true,
            })
            console.log(result)
            // api 성공 시 페이지 새로고침
            const router= useRouter();
            router.push("/user")
        }catch(e){
            console.log(e)
        }

    }

    // 로그인된 유저정보를 업데이트하기 위해 useEffect실행
    useEffect(()=>{

    },[])

    return (
        <Container onSubmit={onSubmit}>
            <div className='profile-image'>
                <img src={thumnail} alt="프로필 이미지"/>
                <label htmlFor='file-input'/>
                <input type="file" id="file-input"   onChange={e => onUpload(e)}
                />
            </div>
            <div className='profile-input'>
                <input type='text' placeholder='닉네임'
                value={nickname}
                onChange={(event)=>setNickname(event.target.value)}
                />
                <div onClick={showPasswordInput} className='change-password-button'>
                    비밀번호 변경
                </div>
                { changePassword ? 
                <>
                    <input type='text' placeholder='현재 비밀번호' 
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                    />
                    <input type='text' placeholder='새 비밀번호'
                    value={confirmPassword}
                    onChange={(event)=>setConfirmPassword(event.target.value)}
                    />
                </> : null}
                
            </div>
            <div className='submit-btn'>
                <Button width='280px' height='40px' radius='30px'>수정하기</Button>
            </div>
        </Container>
        
    );
};

export default Profile;