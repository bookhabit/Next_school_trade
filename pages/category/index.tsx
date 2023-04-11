import React from 'react';
import Link from 'next/link';
import ElectronicIcon from "../public/static/svg/category/electronic.svg"
import Category from '../../components/category/Category';
import LinkFooter from '../../components/footer/LinkFooter';
import styled from 'styled-components';

const Container = styled.div`
    min-height:100vh;
`

const category = () => {
    return (
        <Container>
            <Category/>
            <LinkFooter/>
        </Container>
    );
};

export default category;