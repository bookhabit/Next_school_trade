import React from 'react';
import ProductCard from '../common/ProductCard';
import styled from 'styled-components';
import CompletedProductCard from '../common/CompletedProductCard';
import { isEmpty } from 'lodash';
import { productListType } from '../../types/product/product';

const Container = styled.div<{completedProducts:boolean}>`
    margin-top:${props=>props.completedProducts? "0px" :"20px"};
`

interface IProps{
    completedProducts:boolean,
    data:productListType[]
    setTarget?:React.Dispatch<React.SetStateAction<HTMLElement | null | undefined>>
    showChangeCompleted?:boolean
}

const ProductList:React.FC<IProps> = ({completedProducts,data,showChangeCompleted,setTarget}) => {
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
                <ProductCard key={product.id} product={product} showChangeCompleted={showChangeCompleted}/>
            )) 
            }
            <div ref={setTarget}></div>
        </Container>
    );
};

export default React.memo(ProductList);