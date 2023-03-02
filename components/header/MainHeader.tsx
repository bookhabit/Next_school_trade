import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Conatainer = styled.div`
    position:sticky;
    top:0;
    width:100%;
    height:90px;
    background-color: ${palette.main_color};
    
`

const mainHeader = () => {
    return (
        <Conatainer>
            <h2>메인헤더</h2>
        </Conatainer>
    );
};

export default mainHeader;