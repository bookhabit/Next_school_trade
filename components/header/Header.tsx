import React from 'react';
import { useRouter } from 'next/router';
import MainHeader from './MainHeader';
import CommonHeader from './CommonHeader';

const Header = () => {
    const router = useRouter();
    console.log('Header:',router.pathname)
    return (
        <div>
            {router.pathname==="/" ? <MainHeader/> : <CommonHeader/> }
        </div>
    );
};

export default Header;