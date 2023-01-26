import React from 'react';
import styled from 'styled-components';
import CloseXIcon from "../../public/static/svg/auth/modal_close_x_icon.svg"
import MailIcon from "../../public/static/svg/auth/email.svg"
import PersonIcon from "../../public/static/svg/auth/person.svg"
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg"
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg"
import Input from '../common/Input';
import { useState } from 'react';

const Container = styled.form`
    width:568px;
    padding:32px;
    background-color:white;
    z-index:11;

    .modal-close-x-icon{
        cursor: pointer;
        display:block;
        margin:0 0 40px auto;
    }

    .input-wrapper{
        position:relative;
        margin-bottom:16px;   
    }
`


const SignUpModal = () => {
    // 비밀번호 토글 state
    const [hidePassword,setHidePassword] = useState(true)

    // input창 관리할 state
    const [inputs, setInputs] = useState({
        userName:'',
        userNickname: '',
        studentID:'',
        email: '',
        password:'',
      });


    // 비구조화 할당을 통해 값 추출
    const { userName,userNickname,studentID,email,password} = inputs; 

    // input과 select onChange함수들
    const onChangeValue = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target; 
        setInputs({
          ...inputs, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
      };
    
    // * 비밀번호 숨김 토글
    const toggleHidePassword = ()=>{
        setHidePassword(!hidePassword);
    }

    console.log(userName,userNickname,studentID,email,password)
    return (
        <Container>
            <CloseXIcon className="modal-close-x-icon"/>
            <div className='input-wrapper'>
                <Input 
                    placeholder="이름" 
                    icon={<PersonIcon/>}
                    type="text"
                    name='userName'
                    onChange={onChangeValue}
                />
            </div>
            <div className='input-wrapper'>
                <Input 
                    placeholder="닉네임" 
                    icon={<PersonIcon/>}
                    type="text"
                    name='userNickname'
                    onChange={onChangeValue}
                />
            </div>
            <div className='input-wrapper'>
                <Input 
                    placeholder="학번" 
                    icon={<PersonIcon/>}
                    type="text"
                    name='studentID'
                    onChange={onChangeValue}
                />
            </div>
            <div className='input-wrapper'>
                <Input 
                    placeholder="이메일 주소" 
                    icon={<MailIcon/>}
                    type="email"
                    name='email'
                    onChange={onChangeValue}
                />
            </div>
            <div className='input-wrapper'>
                <Input 
                    placeholder="비밀번호 설정" 
                    icon={hidePassword? 
                        (
                        <ClosedEyeIcon onClick={toggleHidePassword}/>
                    ) : (
                        <OpenedEyeIcon onClick={toggleHidePassword}/>
                    )}
                    type={hidePassword?"password":"text"}
                    name='password'
                    onChange={onChangeValue}
                />
            </div>
        </Container>
    );
};

export default SignUpModal;