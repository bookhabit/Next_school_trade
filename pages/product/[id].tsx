import { NextPage } from 'next';
import React from 'react';
import ShowProductDetail from '../../components/product/ShowProductDetail';

const productDetail:NextPage = (id)=>{
    const testProductDeatail = {
        id:1,
        title:"축구화 사실분 구합니다",
        price:40000,
        body:"축구화 9만원에 사서 2번 밖에 안신었고 진짜 하자 없습니다.싸게 드리는거에요 ㅠㅠㅠ 축구보단 풋살할 때 신으시는게 좋습니다!",
        chat_cnt:3,
        like_cnt:2,
        sellerId:2, // 현재 로그인id는 2
        category:"스포츠/레저",
        created_at:"1시간 전",
        position:"한서대학교 이디야 카페",
        image:"/static/svg/product/testProductImage.png"
    }

    return <ShowProductDetail testProductDeatail={testProductDeatail}/>
}

productDetail.getInitialProps = async ({query})=>{
    const {id} = query;
    // 이 id값에 해당하는 상품 1개를 불러오는 api를 호출하고 응답받은 데이터를 클라이언트로 넘겨준다
    return {id}
}

export default productDetail;