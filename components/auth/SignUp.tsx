import React, { useMemo } from 'react';
import styled from 'styled-components';
import CloseXIcon from "../../public/static/svg/auth/modal_close_x_icon.svg"
import MailIcon from "../../public/static/svg/auth/email.svg"
import PersonIcon from "../../public/static/svg/auth/person.svg"
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg"
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg"
import MapIcon from "../../public/static/svg/auth/mapIcon.svg"
import GradeIcon from "../../public/static/svg/auth/graduation-cap.svg"
import DownIcon from "../../public/static/svg/common/selector/selector_down_arrow.svg"
import Input from '../common/Input';
import { useState, useEffect } from 'react';
import Selector from '../common/Selector';
import { monthList,dayList,yearList } from '../../lib/staticData';
import palette from '../../styles/palette';
import Button from '../common/Button';
import { kakaoSignupAPI, signupAPI } from '../../lib/api/auth';
import { useDispatch } from 'react-redux';
import { userActions } from './../../store/user';
import axios from "axios";
import { commonActions } from './../../store/common';
import useValidateMode from '../../hooks/useValidateMode';
import PasswordWarning from './PasswordWarning';
import { authActions } from '../../store/auth';
import useModal from '../../hooks/useModal';
import SetPositionUserLocation from '../map/SetPositionUserLocation';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Users } from '../../types/user';
import { RootState } from '../../store';
import Select, { GroupBase,SingleValueProps,components } from "react-select"
import OptionsType from "react-select"
import Swal from 'sweetalert2';

type KaKaoSignUp = {
    kakaoSignUp : string;
}

const Container = styled.form<KaKaoSignUp>`
    width:100%;
    padding:50px 20px;
    z-index:11;

    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    /* 카카오 로그인 시 가운데로 옮기기 */
    .input-wrapper-first{
        margin-top: ${(props)=>(props.kakaoSignUp ==='true' ?'70px;' : '0px')};
    }
    /* input */
    .input-wrapper{
        width:100%;
        position:relative;
        margin-bottom:${(props)=>(props.kakaoSignUp ==='true' ?'40px;' : '30px')};   
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
        width:100%;
        display:flex;
        margin-bottom:${(props)=>(props.kakaoSignUp ==='true' ?'40px;' : '24px')};   
        .sign-up-gender-selector{
            width:40%;
            margin-right:16px;
        }
        .sign-up-university-selector{
            width:70%;
            .custom-single-value{
                display:flex;
            }
        }
    }


    /* 생년월일 셀렉터 */
    .sign-up-modal-birthday-selectors{
        width:100%;
        display:flex;
        margin-bottom:${(props)=>(props.kakaoSignUp ==='true' ?'40px;' : '24px')};   
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
        margin-bottom:${(props)=>(props.kakaoSignUp ==='true' ?'40px;' : '30px')};   
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
        &:hover{
            background-color:#b7b2b2;
        }
    }

    /* 버튼 wrapper 스타일링 */
    .sign-up-modal-submit-button-wrapper{
        width:100%;
        margin-bottom:16px;
        padding-bottom:16px;
        border-bottom:1px solid ${palette.gray_eb}
    }

`

interface IProps{
    kakaoSignUp:string;
}

const SignUp:React.FC<IProps> = ({kakaoSignUp}) => {
    // 카카오 로그인 회원인 경우
    let user:Users;
    if(kakaoSignUp==='true'){
        user = useSelector((state:RootState)=>state.user)
    }

    // 지도 위치 - 리덕스 스토어에서 가져와서 폼 요소에 추가하기
    const location = useSelector((state:RootState)=>state.registerPosition.location)
    const latitude = useSelector((state:RootState)=>state.registerPosition.latitude)
    const longitude = useSelector((state:RootState)=>state.registerPosition.longitude)

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
        inputGender:"",
        birthMonth:"",
        birthDay:"",
        birthYear:""
    })

    const [university,setUniversity] = useState<string>("")
    const [universityError,setUniversityError] = useState<boolean>(false)


    // 비구조화 할당을 통해 값 추출
    const { name,nickname,email,password,confirmPassword} = inputs; 
    const {inputGender,birthMonth,birthDay,birthYear} = selectInputs;

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
    const [selectedUniversity, setSelectedUniversity] = useState<{ label: string; value: string } | null>(null);

    useEffect(()=>{
        async function fetchUniversityName() {
            try{
                const response = await axios.get("/api/school/universityName");
                const UniversitySet = new Set(response.data as string)
                const universityList = Array.from(UniversitySet)
                setUniversityNameList(universityList)
            }catch(e){
                console.log('대학교리스트 가져오기',e)
                Swal.fire('대학교 리스트 가져오기 실패','error')
            }
            
        }
        fetchUniversityName();
    },[])
    
    const universityOptions: readonly { label: string; value: string }[] = universityNameList?.map((university) => ({
      label: university,
      value: university,
    })) || [];

    // 대학교 down-arraow 아이콘 변경
    const customDropdownIndicator: React.FC<any> = (props) => {
        return (
          <components.DropdownIndicator {...props}>
            <DownIcon />
          </components.DropdownIndicator>
        );
    };
    // selected value에 아이콘 추가
    const CustomSingleValue: React.FC<SingleValueProps<any>> = ({  children,innerProps,...rest  }) => (
        <components.SingleValue  {...rest} innerProps={innerProps} className="custom-single-value">
            <GradeIcon style={{ marginRight: '8px' }} />
            {children}
        </components.SingleValue>
    );

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
            alert(e?.message)
        })
    }
    useEffect(()=>{
        setCurrentPosition();
    },[])
    
    // 로컬 회원가입 폼 검증
    const validateSignUpForm = ()=>{
    // 폼 요소의 값이 없다면
        console.log(university)
        if(!university){
            setUniversityError(true)
        }

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
    
    // 로컬 회원가입 api 호출
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
                // console.log('signUpBody',signUpBody)
                const {data} = await signupAPI(signUpBody);
                // console.log('클라이언트 받은 데이터',data.user)

                // 유저정보 저장
                dispatch(userActions.setLoggedUser(data.user)) 
                router.push("/")
    
            }catch(e:any){
                console.log(e)
                if(e.response.data.statusCode===409){
                    alert('이미 존재하는 이메일입니다')
                }
            }
            }
        }


    // 카카오 회원가입 폼 검증
    const validateKakaoForm = ()=>{
        // 폼 요소의 값이 없다면
            if(!name|| !nickname || !user.email || !university || !birthMonth|| !birthDay || !birthYear || !location || !latitude || !longitude||!inputGender){
                return false;
            }
            return true;
        }

    // 카카오 회원가입 api 호출
    const onSubmitUpdate = async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
    
        // validateMode true - 유효성검사 실시
        setValidateMode(true)

        // 성별 남자,여자 number로 변환
        if(inputGender){
            gender = strToNumGender(inputGender);
        }
        if(validateKakaoForm()){
            try{
                const signUpBody={
                    name,
                    nickname,            
                    email:user.email,
                    university,
                    gender,
                    birth:new Date(
                        `${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`
                        ).toISOString(),
                    location,
                    latitude,
                    longitude,
                }
                // console.log('signUpBody',signUpBody)
                const {data} = await kakaoSignupAPI(signUpBody);
                // console.log('클라이언트 받은 데이터',data.user)

                // 유저정보 저장
                dispatch(userActions.setLoggedUser(data.user)) 
                router.push("/")
    
            }catch(e){
                console.log(e)
            }
            }
    }
    return (
        <Container onSubmit={kakaoSignUp ?onSubmitUpdate :onSubmitSignUp } kakaoSignUp={kakaoSignUp}>
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
                    isValid={!!password && password===confirmPassword}
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
                    <Select 
                        placeholder="대학교"
                        isClearable
                        options={universityOptions} // 변경된 옵션 배열을 사용합니다.
                        value={selectedUniversity} // 선택된 대학교 값을 저장할 state를 사용합니다.
                        onChange={(selectedOption:any)=>{
                            setUniversityError(false)
                            setSelectedUniversity(selectedOption)
                            setUniversity(selectedOption?.value)
                        }} // 대학교 선택이 변경되면 호출되는 핸들러 함수입니다.
                        styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              backgroundColor:universityError ? palette.snow : "transparent",
                              border:`1px solid ${universityError ? palette.tawny : palette.gray_eb}`,
                              fontSize:"16px",
                              padding:"0 11px",
                              borderRadius:"10px",
                              outline:"none",
                              ":hover":{
                                borderColor:palette.gray_71
                              },
                            }),
                          }}
                        theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary25: palette.gray_eb ,
                            primary: palette.dark_cyan,
                        },
                        })}
                        formatOptionLabel={({ value }) => (
                            <p>{value}</p>
                        )}
                        components={{ 
                            SingleValue: CustomSingleValue,
                            DropdownIndicator: customDropdownIndicator 
                        }}
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
            <div className='signup-setMyPosition-wrapper' onClick={openModal}>
                <div className='signup-setMyPosition'>
                    <MapIcon/>
                        <p>주 거래 위치 설정하기</p>
                </div>
            </div>
            <div className='sign-up-modal-submit-button-wrapper'>
                <Button type='submit' width='100%' height='42px' radius='10px'>가입하기</Button>
            </div>
            <ModalPortal>
                <SetPositionUserLocation closeModal={closeModal} currentLocation={currentLocation}/>
            </ModalPortal>
        </Container>
    );
};

export default React.memo(SignUp);