import React from 'react';
import ProductCard from '../common/ProductCard';
import styled from 'styled-components';
import NikeImg from "../../public/static/image/testProudct/나이키바지.jpg"
import OperatingBook from "../../public/static/image/testProudct/운영체제.jpg"
import DataStructureBook from "../../public/static/image/testProudct/자료구조.jpg"
import SoccershoesImg from "../../public/static/image/testProudct/축구화.jpg"
import ToeicImg from "../../public/static/image/testProudct/토익.jpg"
import CompletedProductCard from '../common/CompletedProductCard';
import { isEmpty } from 'lodash';
import { productListType } from '../../types/product/product';

const Container = styled.div<{completedProducts:boolean}>`
    margin-top:${props=>props.completedProducts? "0px" :"20px"};
`

interface IProps{
    completedProducts:boolean,
    data:productListType[]
    setTarget:React.Dispatch<React.SetStateAction<HTMLElement | null | undefined>>
}

const ProductList:React.FC<IProps> = ({completedProducts,data,setTarget}) => {
    const productList = data;
    // console.log('productList',productList)

    return (
        <Container completedProducts={completedProducts}>  
        {/* 데이터가 들어있는지 확인 후 map 함수 실행 - 에러처리 */}
            {
            isEmpty(productList) ? null
            :productList.map((product)=>(
                completedProducts ? 
                <CompletedProductCard key={product.id} product={product}/>  : 
                <ProductCard key={product.id} product={product}/>
            )) 
            }
            <div ref={setTarget}></div>
        </Container>
    );
};

export default React.memo(ProductList);