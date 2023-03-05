import React from 'react';
import ProductList from './ProductList';
import styled from 'styled-components';

const Container = styled.div`
    padding:0px 20px;
    padding-top:30px;
`
const Home = () => {
    // 상품리스트를 불러오는데 성공했는지 , 리스트가 있는지 에러처리
    const showProductList = true
    return (
        <Container>
            {showProductList ? <ProductList completedProducts={false}/> : <h2>상품 리스트가 없습니다.</h2>}
        </Container>
    );
};

export default Home;