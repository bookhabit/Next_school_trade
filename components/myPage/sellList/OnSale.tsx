import React from 'react';
import ProductList from '../../home/ProductList';
import styled from 'styled-components';
import { Page, productListType } from '../../../types/product/product';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { getSellingList } from './../../../lib/api/product';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import axios from 'axios';

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
    userId:number;
}

const OnSale:React.FC<IProps> = ({userId}) => {
    // 로그인된 사용자의 id값을 받아서 판매중인 상품 받아오는 api호출
    const APIuserId = userId
    console.log('OnSale id',APIuserId)
    // testId - 테스트 > userId로 변경
    const testId = 5
    const lastPageNumber=3 // 백엔드 offset 받아와야함
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
            getNextPageParam: (lastPage:Page,pages:Page[]) => {
                const lastPageNumber = 
                Math.ceil(lastPage.totalPage/10)
                // 이 값으로 라스트넘버값 지정
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
        const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
            console.log(isIntersecting)
            if(isIntersecting && hasNextPage){
                fetchNextPage();
            }
        };
        // 스크롤 이벤트 타겟 지정
        const { setTarget } = useIntersectionObserver({ onIntersect });
    
    return (
        <Container>
            {status === "loading" && <div>loading...</div>}
            {status === "error" && <div>상품을 불러오지 못하였습니다</div>}
            {status === "success" ?
                data.pages.map((page, index) => 
                    <ProductList key={index} completedProducts={false} data={page.contents} setTarget={setTarget} showChangeCompleted={true}  />
            ):<h2>상품이 없습니다</h2>}
        </Container>
    );
};

export default React.memo(OnSale);