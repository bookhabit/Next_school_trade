import React from 'react';
import ProductList from '../home/ProductList';
import styled from 'styled-components';
import { getSoldList } from '../../lib/api/product';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useInfiniteQuery } from '@tanstack/react-query';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { Page } from '../../types/product/product';
import Loading from '../common/Loading';
import FailFetchData from '../common/FailFetchData';
import DataNull from '../common/DataNull';
import { isEmpty } from 'lodash';

const Container = styled.div`
    padding:0px 20px;
    background-color: rgba( 0, 0, 0, 0.5 );
    
`
interface IProps{
    userId:number;
}

const CompletedProducts:React.FC<IProps> = ({userId}) => {
    // 로그인된 사용자의 id값을 받아서 판매중인 상품 받아오는 api호출
    const APIuserId = userId
    console.log('CompletedProducts id',APIuserId)

    const {
        data, // 💡 data.pages를 갖고 있는 배열
        fetchNextPage, // 💡 다음 페이지를 불러오는 함수
        hasNextPage, // 다음 페이지가 있는지 여부, Boolean
        status,
        isFetching 
    } = useInfiniteQuery(
          ["SoldList"] 
        , async (pageParam)=> await getSoldList(pageParam,APIuserId)
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
        console.log('infinitquery completed',data)
        // 무한스크롤 구현
        const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
            if(isIntersecting && hasNextPage){
                fetchNextPage();
            }
        };
        // 스크롤 이벤트 타겟 지정
        const { setTarget } = useIntersectionObserver({ onIntersect });

    return (
        <Container>
            {status === "loading" && <Loading/>}
            {status === "error" && <FailFetchData/>}
            {status === "success" &&
                data.pages.map((page, index) => 
                isEmpty(page.contents) ? <DataNull key={index} text='거래완료된 상품이 없습니다'/> :
                <>
                    <div className='hideProductBox'></div>
                    <ProductList key={index} setTarget={setTarget}  completedProducts={true} data={page.contents} />
                </>
            )}
        </Container>
    );
};
export default React.memo(CompletedProducts);