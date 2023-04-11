import reset from "styled-reset";
import palette from "./palette";
import { createGlobalStyle,css } from "styled-components";

const globalStyle = css`
    ${reset};
    *{
        box-sizing: border-box;
    }
    body{
        font-family: Noto Sans,Noto Sans KR,Roboto;
        color:${palette.black};
        height: unset;
        overflow: auto scroll;

    }
    a{
        text-decoration: none;
        color:${palette.black};
    }
    button{
        border:none;
        outline: none;
        background-color: transparent;
    }
    input{
        border:none;
        outline: none;
        background-color: transparent;
    }

`

const GlobalStyle = createGlobalStyle`
    ${globalStyle}
`

export default GlobalStyle;