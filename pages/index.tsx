import React from "react";
import styled from "styled-components";

const Container  = styled.div`
    font-size:21px;
    color:black;
`

const index:React.FC = ()=>{
    return (
    <Container>
        <h2>전체 상품</h2>
    </Container>);
}

export default index;