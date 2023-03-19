import React from 'react';
import ProductList from '../home/ProductList';
import styled from 'styled-components';
import { getSoldList } from '../../lib/api/product';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Container = styled.div`
    padding:0px 20px;
    h2{
        margin-top:20px;
        margin-bottom:0px;
        font-size:20px;
        font-weight:bold;
    }
    background-color: rgba( 0, 0, 0, 0.5 );
    
`

const CompletedProducts = () => {
    const [soldList,setSoldList]= useState([])
    const router= useRouter();
   
    // 판매 완료된 상품 불러오기
    const getSoldListFunc = async()=>{
        const res = await getSoldList(Number(router.query.id))
        setSoldList(res.data)
    }

    useEffect(()=>{
        getSoldListFunc()
    },[])

    return (
        <Container>
            <div className='hideProductBox'></div>
            {soldList ? <ProductList completedProducts={true} data={soldList} /> : <h2>상품들을 불러오는 중입니다.</h2>}
        </Container>
    );
};
export default React.memo(CompletedProducts);