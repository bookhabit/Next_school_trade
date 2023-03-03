import React from 'react';
import styled,{css} from 'styled-components';
import palette from "../../styles/palette"

const Container = styled.button`
    width:100%;
    height:42px;
    border:0;
    border-radius:10px;
    background-color:${palette.main_color};
    color:white;
    font-size:25px;
    font-weight:800;
    outline:none;
    cursor: pointer;
`

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children:React.ReactNode;
}

const Button:React.FC<IProps> = ({children,...props}) => {
    return (
        <Container {...props}>
            {children}
        </Container>
    );
};

export default  React.memo(Button);