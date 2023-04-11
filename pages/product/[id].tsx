import { NextPage } from 'next';
import React from 'react';
import ShowProductDetail from '../../components/product/ShowProductDetail';
import { getProductDetail } from '../../lib/api/product';
import { productListType } from '../../types/product/product';

const productDetail:NextPage = ({data}:any)=>{
    return (
        <>
            <ShowProductDetail productDetail={data}/>
        </>
    )
}

productDetail.getInitialProps = async ({query})=>{
    const {id} = query;
    // 이 id값에 해당하는 상품 1개를 불러오는 api를 호출하고 응답받은 데이터를 클라이언트로 넘겨준다
    const {data} = await getProductDetail(Number(id));
    
    return {data}
}

export default productDetail;