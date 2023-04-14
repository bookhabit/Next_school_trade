import React from 'react';
import { useSelector } from 'react-redux';
import styled,{css} from 'styled-components';
import { RootState } from '../../store';
import palette from '../../styles/palette';
import { Path, UseFormRegister } from 'react-hook-form/dist/types';
import { LoginFormValues } from '../auth/FormLogin';
import { SignUpFormValues } from '../auth/FormSignUp';

type InputContainerProps = {
    iconExist:boolean;
    isValid:boolean;
    usevalidation:boolean;
}

const Container = styled.div<InputContainerProps>`
    display:flex;
    align-items:center;
    .inner-input-wrapper{
        display:flex;
        width:100%;
        height:40px;
        border:1px solid #D9D9D9;
        border-radius:10px;
        padding:0px 10px;
        // 인풋 밸리데이션 - 에러상태일 때 input창 스타일링
        background-color:${(isValid)=> isValid ? null :palette.error_box_fill } ;
        border-color: ${(isValid)=> isValid ? palette.dark_cyan : palette.error_border_color  } ;
        &:focus{
            border-color:${(isValid)=> isValid ? palette.error_box_fill : palette.input_focus } ;
        }
        input{
            width:100%;
            font-size:15px;
            outline:none;
            border:none;
            appearance: none;
            ::placeholder{
                color:${palette.gray_76}
            }
            &:focus{
                border-color:${palette.input_focus}; 
            }
        }
        .input-icon-wrapper{
            display:flex;
            justify-content:center;
            align-items:center;
            margin-right:5px;
        } 
    }
    
    /* 에러메시지 스타일링 */
    .input-error-message{
        margin-top:8px;
        font-weight:600;
        font-size:14px;
        color:${palette.error_message}
    }
`
const ErrorContainer = styled.div`
  margin-top:8px;
    p{
      color:${palette.error_message};
      font-weight:600;
      font-size:14px;
    }
        
`

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?:JSX.Element;
    isValid:boolean;
    usevalidation:boolean;
    errorMessage?:string;
    label: Path<SignUpFormValues>
    register: UseFormRegister<SignUpFormValues>;
    required: boolean;
    placeholder:string;
    type?:string;
}

const FormInput:React.FC<IProps> = ({
    icon,
    usevalidation,
    isValid,
    errorMessage,
    label,
    register,
    required,
    placeholder,
    type="text",
    ...props
}) => {
    const validateMode = useSelector((state:RootState)=>state.common.validateMode)
    console.log('isvalid',isValid)
    return (
        <>
        <Container 
            iconExist={!!icon} 
            isValid={isValid} 
            usevalidation={validateMode&&usevalidation}>
            <div className='inner-input-wrapper'>
                {/* <input {...props}/> */}
                <input type={type} placeholder={placeholder} {...register(label, { required })} />
                <div className='input-icon-wrapper'>{icon}</div>    
            </div>
        </Container>
        <ErrorContainer>
            {usevalidation&&validateMode&&!isValid&&errorMessage&&
            (<p>{errorMessage}</p>)}
        </ErrorContainer>
      </>
    );
};

export default React.memo(FormInput);