import React from 'react';
import ProductList from '../../home/ProductList';
import styled from 'styled-components';
import { productListType } from '../../../types/product/product';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSellingList } from './../../../lib/api/product';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';

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
    // 로그인된 사용자의 id값을 받아서 판매중인 상품 받아오는 api호출
    const loginId = useSelector((state:RootState)=>state.user)
    // testId - 판매중상품 불러오기 위한
    const testId = 5
    const lastPageNumber=2 // 백엔드 offset 받아와야함
    const {
        data, // 💡 data.pages를 갖고 있는 배열
        fetchNextPage, // 💡 다음 페이지를 불러오는 함수
        hasNextPage, // 다음 페이지가 있는지 여부, Boolean
        status,
        isFetching 
    } = useInfiniteQuery(
          ["onSaleList"] 
        , async (pageParam)=> await getSellingList(pageParam,testId)
        , {
            // 위의 fetch callback의 인자로 자동으로 pageParam을 전달.
            getNextPageParam: (_lastPage,pages) => {
                if(pages.length<lastPageNumber){
                    return pages.length
                }else{
                    return undefined
				}
            }
          }
        )
        console.log('infinitquery onSale',data)

        // 무한스크롤 구현
        // const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
        //     if(isIntersecting){
        //         fetchNextPage();
        //     }
        // };
        // 스크롤 이벤트 타겟 지정
        // const { setTarget } = useIntersectionObserver({ onIntersect });
    
    return (
        <Container>
            {status === "loading" && <div>loading...</div>}
            {status === "error" && <div>상품을 불러오지 못하였습니다</div>}
            {status === "success" ?
                data.pages.map((page, index) => 
                    <ProductList key={index} completedProducts={false} data={page} setTarget={setTarget} />
            ):<h2>상품이 없습니다</h2>}
        </Container>
    );
};

export default React.memo(OnSale);