import React, { useMemo } from 'react';
import styled from 'styled-components';
import CloseXIcon from "../../public/static/svg/auth/modal_close_x_icon.svg"
import MailIcon from "../../public/static/svg/auth/email.svg"
import PersonIcon from "../../public/static/svg/auth/person.svg"
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg"
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg"
import MapIcon from "../../public/static/svg/auth/mapIcon.svg"
import Input from '../common/Input';
import { useState, useEffect } from 'react';
import Selector from '../common/Selector';
import { monthList,dayList,yearList,universityList } from '../../lib/staticData';
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
import { authActions } from '../../store/auth';
import Link from 'next/link';
import useModal from '../../hooks/useModal';
import SetPosition from '../map/SetPosition';
import SetPositionUserLocation from '../map/SetPositionUserLocation';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

type KaKaoSignUp = {
    kakaoSignUp : string;
}

const Container = styled.form<KaKaoSignUp>`
    width:100%;
    padding:50px 20px;
    background-color:white;
    z-index:11;

    /* 카카오 로그인 시 가운데로 옮기기 */
    .input-wrapper-first{
        margin-top: ${(props)=>(props ?'70px;' : '0px')};
    }
    /* input */
    .input-wrapper{
        position:relative;
        margin-bottom:${(props)=>(props ?'40px;' : '30px')};   
    }

    /* 셀렉터 */
    .sign-up-selector-label{
        font-size:16px;
        font-weight:600;
        margin-top:16px;
        margin-bottom:8px;
    }
    
    /* 대학교 성별 셀렉터 */
    .sign-up-universityAndGender-selectors{
        display:flex;
        margin-bottom:${(props)=>(props ?'40px;' : '24px')};   
        .sign-up-gender-selector{
            width:40%;
            margin-right:16px;
        }
        .sign-up-university-selector{
            width:60%;
            margin-right:16px;
        }
    }


    /* 생년월일 셀렉터 */
    .sign-up-modal-birthday-selectors{
        display:flex;
        margin-bottom:${(props)=>(props ?'40px;' : '24px')};   
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
    
    /* 주 거래 위치 설정하기 */
    .signup-setMyPosition-wrapper{
        width:100%;
        height:40px;
        display:flex;
        align-items:center;
        justify-content:center;
        background-color:#EDEBEB;
        margin-bottom:${(props)=>(props ?'40px;' : '30px')};   
        border-radius:10px;
        cursor: pointer;
        .signup-setMyPosition{
            display:flex;
            justify-content:center;
            align-items:center;
            p{
                margin-left:15px;
            }
        }
    }

    /* 버튼 wrapper 스타일링 */
    .sign-up-modal-submit-button-wrapper{
        margin-bottom:16px;
        padding-bottom:16px;
        border-bottom:1px solid ${palette.gray_eb}
    }

    /* 로그인 폼으로 변경하는 로그인버튼 */
    .sign-up-modal-set-login{
        color:${palette.dark_cyan};
        margin-left:8px;
        cursor: pointer;
    }



`

interface IProps{
    kakaoSignUp:string;
}

const SignUp:React.FC<IProps> = ({kakaoSignUp}) => {
    // 카카오 로그인 회원인 경우
    let kakaoUserEmail
    if(kakaoSignUp==='true'){
        kakaoUserEmail = useSelector((state:any)=>state.user.email)
        const token = localStorage.getItem('login-token')
        console.log(kakaoUserEmail, '---', token)
    }

    // 지도 위치 - 리덕스 스토어에서 가져와서 폼 요소에 추가하기
    const location = useSelector((state:any)=>state.registerPosition.location)
    const latitude = useSelector((state:any)=>state.registerPosition.latitude)
    const longitude = useSelector((state:any)=>state.registerPosition.longitude)

    const router = useRouter();

    // 비밀번호 토글 state
    const [hidePassword,setHidePassword] = useState(true)

    // 비밀번호 인풋 포커스 되었을 때 상태
    const [passwordFocused,setPasswordFocused] = useState(false);

    // 비밀번호 최소 자릿수
    const PASSWORD_MIN_LENGTH = 8;

    // input창 관리할 state
    const [inputs, setInputs] = useState({
        name:'',
        nickname: '',
        studentID:'',
        email: '',
        password:'',
        confirmPassword:''
    });

    // select 관리할 state
    const [selectInputs,setSelectInputs] = useState({
        university:"",
        inputGender:"",
        birthMonth:"",
        birthDay:"",
        birthYear:""
    })


    // 비구조화 할당을 통해 값 추출
    const { name,nickname,email,password,confirmPassword} = inputs; 
    const {university,inputGender,birthMonth,birthDay,birthYear} = selectInputs;

    // input과 select onChange함수들
    const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target; 

        setInputs({
        ...inputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
        });
    };

    // 성별을 string으로 받고 number로 변환
    let gender:number;
    // gender 매핑
    const strToNumGender = (inputGender:string):number=>{
        if(inputGender==='남자'){
            return 1;
        }else{
            return 2;
        }
    }
    

    const onChangeSelector = (event:React.ChangeEvent<HTMLSelectElement>)=>{
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

    // 비밀번호 확인 인풋 포커스 되었을 떄 이벤트함수
    const onFocusedConfirmPassword = ()=>{
        setPasswordFocused(false)
    }
        

    //* password가 이름이나 이메일을 포함하는지
    const isPasswordHasNameOrEmail = useMemo(
        () =>
        !password ||
        !name || !email ||
        password.includes(name) ||
        password.includes(email.split("@")[0]),
        [password, name, email]
    );

    //* 비밀번호가 최수 자리수 이상인지
    const isPasswordOverMinLength = useMemo(
        () => password.length >= PASSWORD_MIN_LENGTH,
        [password]
    );

    //* 비밀번호가 숫자나 특수기호를 포함하는지
    const isPasswordHasNumberOrSymbol = useMemo(
        () =>
        (
            /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
            /[0-9]/g.test(password)
        ),
        [password]
    );
    // 디스패치
    const dispatch = useDispatch();

    // validateMode 함수가져옴
    const {setValidateMode } = useValidateMode();


    
    // 대학교명 리스트 가져오기
    const [universityNameList,setUniversityNameList] = useState<string[]>();
    
    useEffect(()=>{
        async function fetchUniversityName() {
            const response = await axios.get("/api/school/universityName");
            setUniversityNameList(response.data)
        }
        fetchUniversityName();
    },[])

    // ModalPortal 
    const {openModal,ModalPortal,closeModal} = useModal();
    
    const [currentLocation, setCurrentLocation] = useState<{latitude:number,longitude:number}>({
        latitude: 0,
        longitude: 0,
    });

    // 현재위치 정보가져오기 - 모달창에 넘겨줌
        // 현재 위치 불러오기에 성공했을 때
    const onSuccessGetLocation = async ({coords}:any)=>{
        try{
          setCurrentLocation({
                latitude:coords.latitude,
                longitude:coords.longitude
          })
        }catch(e){
          console.log(e)
          alert(e)
        }        
      }
    // 현재 위치 설정
    const setCurrentPosition = ()=>{
        navigator.geolocation.getCurrentPosition(onSuccessGetLocation,(e)=>{
            console.log(e)
            alert(e?.message)
        })
    }
    useEffect(()=>{
        setCurrentPosition();
    },[])
    
    // 회원가입 폼 입력 값 확인하는 함수
    const validateSignUpForm = ()=>{
    // 폼 요소의 값이 없다면
        if(!name|| !nickname || !email || !password || !university || !birthMonth|| !birthDay || !birthYear || !location || !latitude || !longitude||!inputGender){
            return false;
        }
        
        //* 비밀번호가 올바르지 않다면
        if (
            isPasswordHasNameOrEmail ||
            !isPasswordOverMinLength ||
            !isPasswordHasNumberOrSymbol
        ) {
            console.log('비밀번호가 올바르지 않다')
            return false;
        }    
        return true;
    }
    
    // 회원가입 폼 제출하는 함수
    const onSubmitSignUp = async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
    
        // validateMode true - 유효성검사 실시
        setValidateMode(true)

        // 성별 남자,여자 number로 변환
        if(inputGender){
            gender = strToNumGender(inputGender);
        }
        if(validateSignUpForm()){
            try{
                const signUpBody={
                    name,
                    nickname,            
                    email,
                    password,
                    university,
                    gender,
                    birth:new Date(
                        `${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`
                        ).toISOString(),
                    location,
                    latitude,
                    longitude,
                }
                console.log('signUpBody',signUpBody)
                const {data} = await signupAPI(signUpBody);
                console.log('클라이언트 받은 데이터',data.user)
                // 엑세스 토큰 저장하는 로직 필요 - 우선 로컬스토리지 저장
                localStorage.setItem('login-token', data.token);

                // 유저정보 저장
                dispatch(userActions.setLoggedUser(data.user)) 
                router.push("/home")
    
            }catch(e){
                console.log(e)
            }
            }
        }

    return (
        <Container onSubmit={onSubmitSignUp} kakaoSignUp={kakaoSignUp}>
            <div className='input-wrapper input-wrapper-first'>
                <Input 
                    placeholder="이름" 
                    icon={<PersonIcon/>}
                    name='name'
                    onChange={onChangeInput}
                    isValid={!!name}
                    errorMessage="이름을 입력해주세요"
                    usevalidation
                />
            </div>
            <div className='input-wrapper'>
                <Input 
                    placeholder="닉네임" 
                    icon={<PersonIcon/>}
                    name='nickname'
                    onChange={onChangeInput}
                    isValid={!!nickname}
                    errorMessage="닉네임을 입력해주세요"
                    usevalidation
                />
            </div>
            {kakaoSignUp ? null :
            <div className='input-wrapper'>
                <Input 
                    placeholder="이메일 주소" 
                    icon={<MailIcon/>}
                    name='email'
                    onChange={onChangeInput}
                    isValid={!!email}
                    errorMessage="이메일을 입력해주세요"
                    usevalidation
                />
            </div>
            }
            
            {kakaoSignUp ? null : 
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
                    onChange={onChangeInput}
                    isValid={!isPasswordHasNameOrEmail&&
                        isPasswordOverMinLength &&
                        isPasswordHasNumberOrSymbol}
                    errorMessage="비밀번호를 입력해주세요"
                    usevalidation
                    onFocus={onFocusPassword}
                />
            </div>
            }
            {passwordFocused && (
                <>
                    <PasswordWarning
                        isValid={!isPasswordHasNameOrEmail}
                        text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."/>
                    <PasswordWarning 
                        isValid={isPasswordOverMinLength}
                        text="최소 8자"/>
                    <PasswordWarning 
                        isValid={isPasswordHasNumberOrSymbol}
                        text="숫자나 기호를 포함하세요."/>
                </>
            )}
            {kakaoSignUp ? null : 
                <div className='input-wrapper'>
                <Input 
                    placeholder="비밀번호 확인" 
                    icon={hidePassword? 
                        (
                        <ClosedEyeIcon onClick={toggleHidePassword}/>
                    ) : (
                        <OpenedEyeIcon onClick={toggleHidePassword}/>
                    )}
                    type={hidePassword?"password":"text"}
                    name='confirmPassword'
                    onChange={onChangeInput}
                    isValid={password===confirmPassword}
                    errorMessage="입력하신 비밀번호가 일치하지 않습니다."
                    usevalidation
                    onFocus={onFocusedConfirmPassword}
                    />
                </div>
            }
            
            <div className='sign-up-universityAndGender-selectors'>
                <div className='sign-up-gender-selector'>
                    <Selector
                        options={['남자','여자']}
                        disabledoptions={["성별"]}
                        defaultValue="성별"
                        name="inputGender"
                        onChange={onChangeSelector}
                        isValid={!!inputGender}
                    />
                </div>
                <div className='sign-up-university-selector'>
                    <Selector 
                        options={universityNameList}
                        disabledoptions={["대학교"]}
                        defaultValue="대학교"
                        name="university"
                        onChange={onChangeSelector}
                        isValid={!!university}
                    />
                </div>
            </div>
            <div className='sign-up-modal-birthday-selectors'>
                <div className='sign-up-modal-birthday-month-selector'>
                    <Selector 
                        options={monthList} 
                        disabledoptions={["월"]}
                        defaultValue="월"
                        name="birthMonth"
                        onChange={onChangeSelector}
                        isValid={!!birthMonth}
                    />
                </div>
                <div className='sign-up-modal-birthday-day-selector'>
                    <Selector 
                        options={dayList}
                        disabledoptions={["일"]}
                        defaultValue="일"
                        name="birthDay"
                        onChange={onChangeSelector}
                        isValid={!!birthDay}
                    />
                </div>
                <div className='sign-up-modal-birthday-year-selector'>
                    <Selector 
                        options={yearList}
                        disabledoptions={["연도"]}
                        defaultValue="연도"
                        name="birthYear"
                        onChange={onChangeSelector}
                        isValid={!!birthYear}
                    />
                </div>
            </div>
            <div className='signup-setMyPosition-wrapper'>
                <div className='signup-setMyPosition' onClick={openModal}>
                    <MapIcon/>
                        <p>주 거래 위치 설정하기</p>
                </div>
            </div>
            <div className='sign-up-modal-submit-button-wrapper'>
                <Button type='submit'>가입하기</Button>
            </div>
            <ModalPortal>
                <SetPositionUserLocation closeModal={closeModal} currentLocation={currentLocation}/>
            </ModalPortal>
        </Container>
    );
};

export default React.memo(SignUp);