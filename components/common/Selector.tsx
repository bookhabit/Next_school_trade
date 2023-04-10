import React from 'react';
import styled,{css} from 'styled-components';
import palette from '../../styles/palette';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Container = styled.div<{ isValid:boolean; validateMode:boolean;}>`
    width:100%;
    height:40px;
    select {
        width: 100%;
        height: 100%;
        background-color: white;
        border: 1px solid ${palette.gray_eb};
        font-size: 16px;
        padding: 0 11px;
        border-radius: 10px;
        outline: none;
        -webkit-appearance: none;
        background-image: url("/static/svg/common/selector/selector_down_arrow.svg");
        background-position: right 11px center;
        background-repeat: no-repeat;
        &:focus {
        border-color: ${palette.dark_cyan};
        }
  }
  ${({isValid,validateMode})=>
    validateMode && css`
        select{
            border-color: ${isValid ? palette.dark_cyan:palette.tawny} !important;

            background-color: ${isValid?"white":palette.snow};
        }
    `}
`

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
    options?:string[];
    value?:string;
    disabledoptions?:string[],
    isValid:boolean;
}


const Selector:React.FC<IProps> = ({options=[],disabledoptions=[],isValid,...props}) => {

    const validateMode = useSelector((state:RootState)=>state.common.validateMode)

    return (
        <Container isValid={!!isValid} validateMode={validateMode}>
            <select {...props}>
                {disabledoptions.map((disabledoption,index)=>(
                    <option key={index} value={disabledoption} disabled>
                        {disabledoption}
                    </option>
                ))}
                {options.map((option,index)=>(
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </Container>
    );
};

export default React.memo(Selector);