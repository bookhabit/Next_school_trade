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
        color:${palette.black}
    }
    a{
        text-decoration: none;
        color:${palette.black};
    }
`

const GlobalStyle = createGlobalStyle`
    ${globalStyle}
`

export default GlobalStyle;