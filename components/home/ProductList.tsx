import React from 'react';
import ProductCard from '../common/ProductCard';
import styled from 'styled-components';
import CompletedProductCard from '../common/CompletedProductCard';
import { isEmpty } from 'lodash';
import { Page, productListType } from '../../types/product/product';
import { InfiniteData, QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';

const Container = styled.div<{completedProducts:boolean}>`
    margin-top:${props=>props.completedProducts? "0px" :"20px"};
`

interface IProps{
    completedProducts:boolean,
    data:productListType[]
    setTarget?:React.Dispatch<React.SetStateAction<HTMLElement | null | undefined>>
    showChangeCompleted?:boolean
    refetch?:<TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<InfiniteData<Page>, unknown>>
}

const ProductList:React.FC<IProps> = ({completedProducts,data,showChangeCompleted,setTarget,refetch}) => {
    const productList = data;
    // console.log('productList',productList)

    return (
        <Container completedProducts={completedProducts}>  
            {
            productList.map((product)=>(
                completedProducts ? 
                <CompletedProductCard key={product.id} product={product}/>  : 
                <ProductCard key={product.id} product={product} showChangeCompleted={showChangeCompleted} refetch={refetch} />
            )) 
            }
            <div ref={setTarget}></div>
        </Container>
    );
};

export default React.memo(ProductList);