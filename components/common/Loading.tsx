import React from "react";
import { DotLoader,BarLoader,BeatLoader } from "react-spinners";
import styled from "styled-components";

const Container = styled.div`
    text-align:center;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:300px;
`

const Loading = () => {
  return (
    <Container>
        <BeatLoader color="#54AA76"/>
    </Container>
  );
};

export default Loading;