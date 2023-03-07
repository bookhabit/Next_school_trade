import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container= styled.div`
    width:100%;
    min-height:90vh;

`

const ChattingRoom = () => {
    return (
        <Container>
            <h2>채팅방페이지</h2>
        </Container>
    );
};

export default ChattingRoom;