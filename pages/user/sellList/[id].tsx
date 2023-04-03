import React from 'react';
import SubHeader from '../../../components/header/SubHeader';
import { useState } from 'react';
import SellList from '../../../components/myPage/sellList/SellList';
import LinkFooter from '../../../components/footer/LinkFooter';
import { GetServerSideProps, NextPage } from 'next';
import { getSellingList } from '../../../lib/api/product';
import { ParsedUrlQuery } from 'querystring';

const sellList:NextPage = ({id}:ParsedUrlQuery) => {
    const loginUserId = Number(id)
    // subHeader에 왼쪽 정보인지 오른쪽 정보인지 알려주기 위한 state
    // 왼쪽 - 판매중 / 오른쪽 - 거래완료
    const [currentLeft,setCurrentLeft] = useState(true);
    return (
        <>
            <SubHeader currentLeft={currentLeft} setCurrentLeft={setCurrentLeft} />
            <SellList userId={loginUserId} currentLeft={currentLeft} />
            <LinkFooter/>
        </>
    );
};

sellList.getInitialProps = async ({query})=>{
    const {id} = query;
    console.log(id)
    // 이 id값은 seller의 userId를 뜻한다  
    return {id}
  }
export default sellList;