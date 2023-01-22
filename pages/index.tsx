import React from "react";
import styled from "styled-components";

const Container  = styled.div`
    font-size:21px;
    color:black;
`

const index:React.FC = ()=>{
    return (
    <Container>
        <h1>hello </h1>
        <ul>
            <li>hi li</li>
        </ul>
        <a>hi a</a>
    </Container>);
}

export default index;