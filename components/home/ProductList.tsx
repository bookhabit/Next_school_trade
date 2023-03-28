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
}

const ProductList:React.FC<IProps> = ({completedProducts,data}) => {
    const productList = data;
    console.log(productList)
    // UI 테스트 데이터
    const testProduct = [{
        id:1,
        title:"전공책 팝니다",
        price:"30,000 원",
        updatedDate:"17분 전",
        heartCount:3,
        chattingCount:3,
        img:ToeicImg,
        favorite:false,
    },{
        id:2,
        title:"운영체제 책 살 사람??",
        price:"25,000 원",
        updatedDate:"20분 전",
        heartCount:2,
        chattingCount:4,
        img:OperatingBook,
        favorite:false,
    },{
        id:3,
        title:"자료구조 알고리즘 책 팔아요~~",
        price:"15,000 원",
        updatedDate:"35분 전",
        heartCount:0,
        chattingCount:1,
        img:DataStructureBook,
        favorite:true,
    },{
        id:4,
        title:"축구화 살 사람??",
        price:"30,000 원",
        updatedDate:"1시간 전",
        heartCount:1,
        chattingCount:0,
        img:SoccershoesImg
        ,favorite:true,
    },{
        id:5,
        title:"나이키 바지 팔아요!!",
        price:"21,000 원",
        updatedDate:"2시간 전",
        heartCount:0,
        chattingCount:1,
        img:NikeImg,
        favorite:true,
    }]

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
        </Container>
    );
};

export default React.memo(ProductList);