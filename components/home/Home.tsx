import React, { useEffect } from 'react';
import ProductList from './ProductList';
import styled from 'styled-components';
import { GetproductList } from '../../lib/api/product';

const Container = styled.div`
    padding:0px 20px;
    padding-top:20px;
`
const Home = () => {
    GetproductList().then((data) => {
        console.log('테스트 데이터',data)
    });
    // 상품리스트를 불러오는데 성공했는지 , 리스트가 있는지 에러처리
    const showProductList = true
    return (
        <Container>
            {showProductList ? <ProductList completedProducts={false}/> : <h2>상품 리스트가 없습니다.</h2>}
        </Container>
    );
};

export default Home;