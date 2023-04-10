import React from 'react';
import styled,{css} from 'styled-components';
import palette from "../../styles/palette"

// 기본 버튼
const Container = styled.button`
    float:right;
    margin:15px 20px;
    width:100px;
    height:45px;
    background-color:${palette.main_text_color};
    border-radius:50px;
    color:${palette.main_color};
    font-size:20px;
    font-weight:bold;
    text-align:center;
    padding:5px;
    line-height: 18px;
    outline:none;
    cursor: pointer;
`

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children:React.ReactNode;
}

const FooterButton:React.FC<IProps> = ({children,...props}) => {
    return (
        <Container {...props}>
            {children}
        </Container>
    );
};

export default  React.memo(FooterButton);