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

    /* 반응형 스타일링 */
    /* 태블릿 버전 */
    /* @media screen and (min-width: 1023px) {
        body{
            padding:0px 100px;
        }
    } */

    /* pc버전 */
    /* @media screen and (min-width: 1440px) {
        body{
            padding:0px 300px;
        }
    } */

`

const GlobalStyle = createGlobalStyle`
    ${globalStyle}
`

export default GlobalStyle;