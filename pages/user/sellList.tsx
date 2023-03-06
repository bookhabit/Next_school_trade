import React from 'react';
import SubHeader from '../../components/header/SubHeader';
import { useState } from 'react';
import SellList from '../../components/myPage/sellList/SellList';
import LinkFooter from './../../components/footer/LinkFooter';

const sellList = () => {
    // subHeader에 왼쪽 정보인지 오른쪽 정보인지 알려주기 위한 state
    const [currentLeft,setCurrentLeft] = useState(true);

    return (
        <>
            <SubHeader currentLeft={currentLeft} setCurrentLeft={setCurrentLeft} />
            <SellList currentLeft={currentLeft}/>
            <LinkFooter/>
        </>
    );
};

export default sellList;