import LinkFooter from "../components/footer/LinkFooter";
import styled from "styled-components";
import ErrorImg from "../public/static/svg/error404/caroon.svg"
import QuestionSVG from "../public/static/svg/error404/question.svg"
import palette from "../styles/palette";

const Container = styled.div`
    @media only screen and (min-width: 430px) {
	    min-height:100vh;
    }
    text-align:center;
    padding-top:140px;
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

export default function Custom404() {
    const goToBackpage = ()=>{
        window.history.back();
    }
    return (
        <Container>
            <div className="error-content">
                <div className="error-image">
                    <QuestionSVG className="error-question"/>
                    <ErrorImg/>
                </div>
                <div className="error-text">
                    <p>요청하신 페이지를 찾을 수 없습니다</p>
                </div>
                <div className="error-btn">
                    <button onClick={goToBackpage}>돌아가기</button>
                </div>
            </div>
            <LinkFooter/>
        </Container>
    )
}