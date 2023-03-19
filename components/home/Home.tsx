import React, { useEffect } from 'react';
import ProductList from './ProductList';
import styled from 'styled-components';
import { GetproductList } from '../../lib/api/product';
import { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import { productListType } from '../../types/product';

const Container = styled.div`
    padding:0px 20px;
    padding-top:20px;
`

interface IProps {
    data:productListType[]
}

const Home:React.FC<IProps>= ({data}) => {
    return (
        <Container>
            {data ? <ProductList completedProducts={false} data={data}/> : <h2>상품 리스트가 없습니다.</h2>}
        </Container>
    );
};


export default Home;