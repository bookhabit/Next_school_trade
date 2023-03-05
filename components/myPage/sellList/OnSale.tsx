import React from 'react';
import ProductList from '../../home/ProductList';
import styled from 'styled-components';

const Container = styled.div`
    padding:0px 20px;
    h2{
        margin-top:20px;
        margin-bottom:0px;
        font-size:20px;
        font-weight:bold;
    }
`
const OnSale = () => {
    // 사용자의 판매중인 상품들을 불러오는 api요청해서 ProductList컴포넌트에 props로 상품데이터를 전달한다
    const showProductList = true
    return (
        <Container>
            {showProductList ? <ProductList completedProducts={false}/> : <h2>상품 리스트가 없습니다.</h2>}
        </Container>
    );
};

export default OnSale;