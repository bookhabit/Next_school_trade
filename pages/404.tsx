import LinkFooter from "../components/footer/LinkFooter";
import styled from "styled-components";
import DataNull from "../components/common/DataNull";

const Container = styled.div`
    @media only screen and (min-width: 430px) {
	    min-height:100vh;
    }
`

export default function Custom404() {
    return (
        <Container>
            <DataNull text="요청하신 페이지를 찾을 수 없습니다" showQuestionImg={true} />
            <LinkFooter/>
        </Container>
    )
}