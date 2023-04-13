import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import ErrorImg from "../../public/static/svg/error404/caroon.svg"

const Container = styled.div`
    @media only screen and (min-width: 430px) {
	    min-height:100vh;
    }
    text-align:center;
    padding-top:120px;
    .error-content{
        width:100%;
        height:420px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        .error-image{
            width:300px;
            height:280px;
            position:relative;
            .error-question{
                position:absolute;
                top:20px;
                left:180px;
            }
        }
        .error-text{
            margin-bottom:25px;
            p{
                font-size:20px;
                font-weight:bold;
            }
        }
        .error-btn{
            background-color:${palette.errorPage};
            width:165px;
            border-radius:20px;
            &:hover{
                background-color:#d15000;
            }
            button{
                cursor: pointer;
                font-size:30px;
                font-weight:bold;
                width:100%;
                height:70px;
                color:${palette.main_text_color};
                font-family:Roboto;
            }
        }
    }
`
interface IProps {
    text:string;
}

const DataNull:React.FC<IProps> = ({text}) => {
    const goToBackpage = ()=>{
        window.history.back();
    }
    return (
        <Container>
            <div className="error-content">
                <div className="error-image">
                    <ErrorImg/>
                </div>
                <div className="error-text">
                    <p>{text}</p>
                </div>
                <div className="error-btn">
                    <button onClick={goToBackpage}>이전으로</button>
                </div>
            </div>
        </Container>
    )
}

export default DataNull;