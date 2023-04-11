import React from 'react';
import { useRouter } from 'next/router';
import MainHeader from './MainHeader';
import CommonHeader from './CommonHeader';
import styled from 'styled-components';

const Container = styled.div`
    position:sticky;
    top:0;
`

const Header = () => {
    const router = useRouter();
    const currentPathName = router.pathname;
    return (
        <Container>
            {router.pathname==="/"? null : router.pathname==="/home" || router.pathname==="/home/[name]" ? <MainHeader/> : 
            router.pathname==="/product/[id]" ? null :
            <CommonHeader pathName={currentPathName}/> }
        </Container>
    );
};

export default Header;