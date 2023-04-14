import React from 'react';
import { useSelector } from 'react-redux';
import styled,{css} from 'styled-components';
import { RootState } from '../../store';
import palette from '../../styles/palette';
import { Path, UseFormRegister } from 'react-hook-form/dist/types';
import { LoginFormValues } from '../auth/FormLogin';
import { SignUpFormValues } from '../auth/FormSignUp';
import {
    Control,
    FieldPath,
    FieldValues,
    RegisterOptions,
    useController,
    UseControllerProps
  } from "react-hook-form";

type InputContainerProps = {
    iconExist:boolean;
    // isValid:boolean;
    // usevalidation:boolean;
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
        /* background-color:${(isValid)=> isValid ? palette.error_box_fill : null } ;
        border-color: ${(isValid)=> isValid ? palette.error_border_color  : palette.dark_cyan  } ;
        &:focus{
            border-color:${(isValid)=> isValid ? palette.error_box_fill : palette.input_focus } ;
        } */
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
type TControl<T extends FieldValues = FieldValues> = {
    control?: Control<T>;
    name: FieldPath<T>;
    rules?: Omit<RegisterOptions<T>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"> | undefined;
}
interface FormInputProps {
    icon?: JSX.Element | undefined;
    placeholder: string;
    type?: string | undefined;
  }

  const FormInput = ({
    icon,
    control, 
    name, 
    rules,
    placeholder,
    type
}:FormInputProps & UseControllerProps<LoginFormValues>) => {
    const {
        field: { value, onChange },
        fieldState: { isDirty, isTouched, error },
        formState,
      } = useController({control,name,rules});
      console.log('error',error)
      console.log('formState',formState)
    return (
        <>
        <Container 
            iconExist={!!icon} 
            >
            <div className='inner-input-wrapper'>
                <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
                <div className='input-icon-wrapper'>{icon}</div>    
            </div>
        </Container>
        <ErrorContainer>
            <p>{error?.message}</p>
        </ErrorContainer>
      </>
    );
};

export default React.memo(FormInput);