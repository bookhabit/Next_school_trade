import React, { useMemo } from 'react';
import styled from 'styled-components';
import CloseXIcon from "../../public/static/svg/auth/modal_close_x_icon.svg"
import MailIcon from "../../public/static/svg/auth/email.svg"
import PersonIcon from "../../public/static/svg/auth/person.svg"
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg"
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg"
import Input from '../common/Input';
import { useState, useEffect } from 'react';
import Selector from '../common/Selector';
import { monthList,dayList,yearList } from '../../lib/staticData';
import palette from '../../styles/palette';
import { majorList } from './../../lib/staticData';
import Button from '../common/Button';
import { signupAPI } from '../../lib/api/auth';
import { useDispatch } from 'react-redux';
import { userActions } from './../../store/user';
import axios from "axios";
import { commonActions } from './../../store/common';
import useValidateMode from '../../hooks/useValidateMode';
import PasswordWarning from './PasswordWarning';

const Container = styled.form`
    width:568px;
    padding:32px;
    background-color:white;
    z-index:11;

    /* input */
    .modal-close-x-icon{
        cursor: pointer;
        display:block;
        margin:0 0 40px auto;
    }

    .input-wrapper{
        position:relative;
        margin-bottom:16px;   
    }

    /* 셀렉터 */
    .sign-up-selector-label{
        font-size:16px;
        font-weight:600;
        margin-top:16px;
        margin-bottom:8px;
    }
    
    /* 대학교 셀렉터 */
    .sign-up-university-selectors{
        display:flex;
        margin-bottom:24px;
        .sign-up-university-selector{
            margin-right:16px;
            flex-grow:1;
        }
    }

    /* 생년월일 셀렉터 */
    .sign-up-modal-birthday-selectors{
        display:flex;
        margin-bottom:24px;
        .sign-up-modal-birthday-month-selector{
            margin-right:16px;
            flex-grow:1;
        }
        .sign-up-modal-birthday-day-selector{
            margin-right:16px;
            width:25%;
        }
        .sign-up-modal-birthday-year-selector{
            width:33.3333%
        }
    }

    /* 버튼 wrapper 스타일링 */
    .sign-up-modal-submit-button-wrapper{
        margin-bottom:16px;
        padding-bottom:16px;
        border-bottom:1px solid ${palette.gray_eb}
    }
`


const SignUpModal = () => {
    // 비밀번호 토글 state
    const [hidePassword,setHidePassword] = useState(true)

    // 비밀번호 인풋 포커스 되었을 때 상태
    const [passwordFocused,setPasswordFocused] = useState(false);

    // 비밀번호 최소 자릿수
    const PASSWORD_MIN_LENGTH = 8;

    // input창 관리할 state
    const [inputs, setInputs] = useState({
        userName:'',
        userNickname: '',
        studentID:'',
        email: '',
        password:'',
      });

    // select 관리할 state
    const [selectInputs,setSelectInputs] = useState({
        university:"",
        major:"",
        birthMonth:"",
        birthDay:"",
        birthYear:""
    })


    // 비구조화 할당을 통해 값 추출
    const { userName,userNickname,studentID,email,password} = inputs; 
    const {university,major,birthMonth,birthDay,birthYear} = selectInputs;

    // input과 select onChange함수들
    const onChangeValue = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target; 
        setInputs({
          ...inputs, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
      };
    
    const onChangeBirthSelector = (event:React.ChangeEvent<HTMLSelectElement>)=>{
    const { value, name } = event.target; // 우선 e.target 에서 name 과 value 를 추출
    setSelectInputs({
        ...selectInputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
    });
    }
    
    // * 비밀번호 숨김 토글
    const toggleHidePassword = ()=>{
        setHidePassword(!hidePassword);
    }

    

    // 비밀번호 인풋 포커스 되었을 때 이벤트함수
    const onFocusPassword= ()=>{
        setPasswordFocused(true)
    }

          

    //* password가 이름이나 이메일을 포함하는지
    const isPasswordHasNameOrEmail = useMemo(
        () =>
        !password ||
        !userName || !email ||
        password.includes(userName) ||
        password.includes(email.split("@")[0]),
        [password, userName, email]
    );

    //* 비밀번호가 최수 자리수 이상인지
    const isPasswordOverMinLength = useMemo(
        () => password.length >= PASSWORD_MIN_LENGTH,
        [password]
    );

    //* 비밀번호가 숫자나 특수기호를 포함하는지
    const isPasswordHasNumberOrSymbol = useMemo(
        () =>
        !(
            /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
            /[0-9]/g.test(password)
        ),
        [password]
    );
    console.log(isPasswordHasNameOrEmail,isPasswordOverMinLength,isPasswordHasNumberOrSymbol)


    // 디스패치
    const dispatch = useDispatch();

    // validateMode 함수가져옴
    const {setValidateMode } = useValidateMode();

   // 회원가입 폼 제출하는 함수
   const onSubmitSignUp = async (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    // validateMode true - 유효성검사 실시
    setValidateMode(true)

    // 폼요소의 값이 없다면
    if(!userName|| !userNickname || !studentID || !email || !password ||!university || !major || !birthDay){
        return undefined
    }

    //* 비밀번호가 올바르지 않다면
    if (
        isPasswordHasNameOrEmail ||
        !isPasswordOverMinLength ||
        isPasswordHasNumberOrSymbol
    ) {
        return false;
    }


    try{
        const signUpBody={
            userName,
            userNickname,
            studentID,
            email,
            password,
            university,
            major,
            birthDay:new Date(
                `${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`
                ).toUTCString()
        }
        
        const {data} = await signupAPI(signUpBody);
        console.log('클라이언트 받은 데이터',data)
        dispatch(userActions.setLoggedUser(data))   
    }catch(e){
        console.log(e)
    }
    }

    // 대학교명 리스트 가져오기
    const [universityNameList,setUniversityNameList] = useState<string[]>();

    useEffect(()=>{
        async function fetchUniversityName() {
            const response = await axios.get("/api/school/universityName");
            setUniversityNameList(response.data)
        }
        fetchUniversityName();
    },[])

    // 모달창 꺼지면 validateMode 꺼줌
    useEffect(()=>{
        setValidateMode(false)
    },[])

    return (
        <Container onSubmit={onSubmitSignUp}>
            <CloseXIcon className="modal-close-x-icon"/>
            <div className='input-wrapper'>
                <Input 
                    placeholder="이름" 
                    icon={<PersonIcon/>}
                    name='userName'
                    onChange={onChangeValue}
                    isValid={!!userName}
                    errorMessage="이름을 입력해주세요"
                    usevalidation
                />
            </div>
            <div className='input-wrapper'>
                <Input 
                    placeholder="닉네임" 
                    icon={<PersonIcon/>}
                    name='userNickname'
                    onChange={onChangeValue}
                    isValid={!!userNickname}
                    errorMessage="닉네임을 입력해주세요"
                    usevalidation
                />
            </div>
            <div className='input-wrapper'>
                <Input 
                    placeholder="학번" 
                    icon={<PersonIcon/>}
                    name='studentID'
                    onChange={onChangeValue}
                    isValid={!!studentID}
                    errorMessage="학번을 입력해주세요"
                    usevalidation
                />
            </div>
            <div className='input-wrapper'>
                <Input 
                    placeholder="이메일 주소" 
                    icon={<MailIcon/>}
                    name='email'
                    onChange={onChangeValue}
                    isValid={!!email}
                    errorMessage="이메일을 입력해주세요"
                    usevalidation
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
                    isValid={!isPasswordHasNameOrEmail&&
                        isPasswordOverMinLength &&
                        !isPasswordHasNumberOrSymbol}
                    errorMessage="비밀번호를 입력해주세요"
                    usevalidation
                    onFocus={onFocusPassword}
                />
            </div>
            {passwordFocused && (
                <>
                    <PasswordWarning
                        isValid={!isPasswordHasNameOrEmail}
                        text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."/>
                    <PasswordWarning 
                        isValid={isPasswordOverMinLength}
                        text="최소 8자"/>
                    <PasswordWarning 
                        isValid={!isPasswordHasNumberOrSymbol}
                        text="숫자나 기호를 포함하세요."/>
                </>
            )}

            <p className='sign-up-selector-label'>학교</p>
            <div className='sign-up-university-selectors'>
                <div className='sign-up-university-selector'>
                    <Selector 
                        options={universityNameList}
                        disabledoptions={["대학교"]}
                        defaultValue="대학교"
                        name="university"
                        onChange={onChangeBirthSelector}
                    />
                </div>
            </div>
            <p className='sign-up-selector-label'>생년월일</p>
            <div className='sign-up-modal-birthday-selectors'>
                <div className='sign-up-modal-birthday-month-selector'>
                    <Selector 
                        options={monthList} 
                        disabledoptions={["월"]}
                        defaultValue="월"
                        name="birthMonth"
                        onChange={onChangeBirthSelector}
                    />
                </div>
                <div className='sign-up-modal-birthday-day-selector'>
                    <Selector 
                        options={dayList}
                        disabledoptions={["일"]}
                        defaultValue="일"
                        name="birthDay"
                        onChange={onChangeBirthSelector}
                    />
                </div>
                <div className='sign-up-modal-birthday-year-selector'>
                    <Selector 
                        options={yearList}
                        disabledoptions={["연도"]}
                        defaultValue="연도"
                        name="birthYear"
                        onChange={onChangeBirthSelector}
                    />
                </div>
            </div>
            <div className='sign-up-modal-submit-button-wrapper'>
                <Button type='submit'>가입하기</Button>
            </div>
        </Container>
    );
};

export default SignUpModal;