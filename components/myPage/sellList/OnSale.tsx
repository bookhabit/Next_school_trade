import React from 'react';
import ProductList from '../../home/ProductList';
import styled from 'styled-components';
import { productListType } from '../../../types/product/product';

const Container = styled.div`
    padding:0px 20px;
    h2{
        margin-top:20px;
        margin-bottom:0px;
        font-size:20px;
        font-weight:bold;
    }
`
interface IProps{
    sellingList:object[];
}

const OnSale:React.FC<IProps>  = ({sellingList}) => {
    // 사용자의 판매중인 상품들을 props로 받아서 ProductList컴포넌트에 props로 상품데이터를 전달한다
    const sellingListData = sellingList as productListType[];
    
    return (
        <Container>
            {sellingList ? <ProductList completedProducts={false} data={sellingListData}/> : <h2>상품 리스트가 없습니다.</h2>}
        </Container>
    );
};

export default React.memo(OnSale);