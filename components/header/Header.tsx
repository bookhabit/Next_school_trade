import React from 'react';
import { useRouter } from 'next/router';
import MainHeader from './MainHeader';
import CommonHeader from './CommonHeader';

const Header = () => {
    const router = useRouter();
    const currentPathName = router.pathname;
    return (
        <div>
            {router.pathname==="/"? null : router.pathname==="/home" ? <MainHeader/> : <CommonHeader pathName={currentPathName}/> }
        </div>
    );
};

export default Header;