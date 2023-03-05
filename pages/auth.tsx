import React from 'react';
import Auth from '../components/auth/Auth';
import SubHeader from '../components/header/SubHeader';
import { useState } from 'react';

const auth = () => {
    // subHeader에 왼쪽 정보인지 오른쪽 정보인지 알려주기 위한 state
    const [currentLeft,setCurrentLeft] = useState(true);
    return (
        <>
            <SubHeader currentLeft={currentLeft} setCurrentLeft={setCurrentLeft} />
            <Auth currentLeft={currentLeft}/>
        </>
    );
};

export default auth;