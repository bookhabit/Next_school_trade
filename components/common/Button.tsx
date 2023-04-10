import React from 'react';
import styled,{css} from 'styled-components';
import palette from "../../styles/palette"

// 푸터 버튼
export const FooterButton = styled.button`

`

interface StyledButtonProps {
    width: string
    height:string
    radius:string
  }

// 기본 버튼
const Container = styled.button<StyledButtonProps>`
    width:${(props)=>props.width};
    height:${(props)=>props.height};
    border:0;
    border-radius:${(props)=>props.radius};
    background-color:${palette.main_color};
    color:${palette.main_text_color};
    font-size:25px;
    font-weight:bold;
    outline:none;
    cursor: pointer;
    &:hover{
        background-color:${palette.btn_hover};
        color:${palette.main_text_color};    
    }
`

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children:React.ReactNode;
    width:string;
    height:string;
    radius:string;
}

const Button:React.FC<IProps> = ({children,...props}) => {
    return (
        <Container {...props}>
            {children}
        </Container>
    );
};

export default  React.memo(Button);