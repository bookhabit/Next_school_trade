import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import SubHeader from '../../components/header/SubHeader';
import SellerProfile from '../../components/seller/SellerProfile';
import { useState } from 'react';
import { NextPage } from 'next';

const profile:NextPage = (id) => {
  console.log('seller의 userId',id)
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
  // 이 id값에 해당하는 상품 1개를 불러오는 api를 호출하고 응답받은 데이터를 클라이언트로 넘겨준다
  return {id}
}
export default profile;