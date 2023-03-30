import React from 'react';
import { useSelector } from 'react-redux';
import styled,{css} from 'styled-components';
import { RootState } from '../../store';
import palette from '../../styles/palette';

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
        &:focus{
            border-color:${palette.input_focus}
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

    // 인풋 밸리데이션 - 에러상태일 때 input창 스타일링
    ${({usevalidation,isValid})=>
        usevalidation && !isValid && css`
            .inner-input-wrapper {
                background-color: ${palette.error_box_fill};
                border-color: ${palette.error_border_color};
                &:focus {
                border-color: ${palette.error_border_color};
            }
            input{
                    background-color: ${palette.error_box_fill};
                    border-color: ${palette.error_border_color};
                }
        }  
    `}
    ${({ usevalidation, isValid }) =>
    usevalidation &&
    isValid &&
    css`
      .inner-input-wrapper {
        border-color: ${palette.dark_cyan};
      }
    `}
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
}

const Input:React.FC<IProps> = ({
    icon,
    usevalidation,
    isValid,
    errorMessage,
    ...props
}) => {
    const validateMode = useSelector((state:RootState)=>state.common.validateMode)
    return (
        <>
        <Container 
            iconExist={!!icon} 
            isValid={isValid} 
            usevalidation={validateMode&&usevalidation}>
            <div className='inner-input-wrapper'>
                <input {...props}/>
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

export default React.memo(Input);