import React from 'react';
import styled from 'styled-components';
import ProductList from '../home/ProductList';

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
const BuyList = () => {
    // 사용자의 구매내역에서 거래완료된 상품들을 불러오는 api요청해서 ProductList컴포넌트에 props로 상품데이터를 전달한다  

    const showProductList = true
    return (
        <Container>
            <div className='hideProductBox'></div>
            {showProductList ? <ProductList completedProducts={true} /> : <h2>상품 리스트가 없습니다.</h2>}
        </Container>
    );
};

export default BuyList;