import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import SubHeader from '../../components/header/SubHeader';
import SellerProfile from '../../components/seller/SellerProfile';
import { useState } from 'react';
import { NextPage } from 'next';

const profile:NextPage = (id) => {
  console.log('seller의 userId',id)
  // seller의 유저정보를 받아서 데이터를 SellerProfile에 넘겨주고 그에 맞게 정보를 렌더링해준다

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

profile.getInitialProps = async ({query})=>{
  const {id} = query;
  // 이 id값은 seller의 userId를 뜻한다  
  // 이 userId에 해당하는 유저 정보를 받아오는 api를 호출하고 응답받은 데이터를 클라이언트로 넘겨준다
  return {id}
}
export default profile;