import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import SubHeader from '../../components/header/SubHeader';
import SellerProfile from '../../components/seller/SellerProfile';
import { useState } from 'react';

const profile = () => {
    // subHeader에 왼쪽 정보인지 오른쪽 정보인지 알려주기 위한 state
    const [currentLeft,setCurrentLeft] = useState(true);
    return (
        <>
          <SubHeader currentLeft={currentLeft} setCurrentLeft={setCurrentLeft}/>
          <SellerProfile currentLeft={currentLeft}/>
          <LinkFooter/>  
        </>
    );
};

export default profile;