import React from 'react';
import Auth from '../components/auth/Auth';
import SubHeader from '../components/header/SubHeader';
import { useState } from 'react';

const auth = () => {
    const [currentLeft,setCurrentLeft] = useState(true);
    return (
        <>
            <SubHeader currentLeft={currentLeft} setCurrentLeft={setCurrentLeft} />
            <Auth currentLeft={currentLeft}/>
        </>
    );
};

export default auth;