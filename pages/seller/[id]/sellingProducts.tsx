import React, { useState } from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import SubHeader from '../../../components/header/SubHeader';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import OnSale from '../../../components/myPage/sellList/OnSale';
import CompletedProducts from '../../../components/myPage/CompletedProducts';
import SellList from '../../../components/myPage/sellList/SellList';

const sellingProducts:NextPage = ({id}:ParsedUrlQuery) => {
    const sellerId = Number(id)
    const [currentLeft,setCurrentLeft] = useState(true);
    return (
        <div>
            <SubHeader currentLeft={currentLeft} setCurrentLeft={setCurrentLeft}/>
            <SellList currentLeft={currentLeft} userId={sellerId}/>
            <LinkFooter/>  
        </div>
    );
};

sellingProducts.getInitialProps = async ({query})=>{
    const {id} = query;
    console.log(id)
    // 이 id값은 seller의 userId를 뜻한다  
    return {id}
  }

export default sellingProducts;