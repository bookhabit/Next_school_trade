import React from 'react';
import styled from 'styled-components';
import ProductList from './../home/ProductList';

const Container = styled.div`
    padding:0px 20px;
    h2{
        margin-top:20px;
        margin-bottom:0px;
        font-size:20px;
        font-weight:bold;
    }
`

const FavoriteList = () => {
    // 사용자의 favorite 상품들을 불러오는 api요청해서 ProductList컴포넌트에 props로 상품데이터를 전달한다
    // 하트를 누르면 관심목록에서 삭제하는 api요청
    const showProductList = true
    return (
        <Container>
            <h2>관심 상품</h2>
            {showProductList ? <ProductList/> : <h2>상품 리스트가 없습니다.</h2>}
        </Container>
    );
};

export default FavoriteList;