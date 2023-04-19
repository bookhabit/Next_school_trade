import React from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import styled from 'styled-components';
import ProductList from '../../../components/home/ProductList';
import { QueryClient, dehydrate, useInfiniteQuery } from '@tanstack/react-query';
import { getBuyList } from '../../../lib/api/product';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import Loading from '../../../components/common/Loading';
import FailFetchData from '../../../components/common/FailFetchData';
import DataNull from '../../../components/common/DataNull';
import { isEmpty } from 'lodash';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { productListType } from '../../../types/product/product';
import { Page } from '../../../types/product/product';

const Container = styled.div`
	@media only screen and (min-width: 430px) {
	    min-height:100vh;
    }
    padding:0px 20px;
    background-color: rgba( 0, 0, 0, 0.5 );
`

const buyList = ({id}:{id:number}) => {
    // 사용자의 구매내역에서 거래완료된 상품들을 불러오는 api요청해서 ProductList컴포넌트에 props로 상품데이터를 전달한다  
    const {
        data, 
        fetchNextPage, 
        hasNextPage, 
        status, 
        isLoading,
        isFetching
    } = useInfiniteQuery(
        ["buyList"] 
    , async (pageParam)=> await getBuyList(pageParam,id) as Page
    , {
        // 위의 fetch callback의 인자로 자동으로 pageParam을 전달.
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
    console.log('buyList data',data)

    // 무한스크롤 구현
    const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
        if(isIntersecting && hasNextPage){
            fetchNextPage();
        }
    };
    // 스크롤 이벤트 타겟 지정
    const { setTarget } = useIntersectionObserver({ onIntersect });

    return (
        <>
            <Container>
                {isLoading && isFetching && <Loading/>}
                {status === "error" && <FailFetchData/>}
                {status === "success" &&
                    data.pages.map((page, index) => 
                    isEmpty(page.contents) ? <DataNull key={index} text='아직 구매한 상품이 없습니다'/> :
                    <>
                        <div className='hideProductBox'></div>
                        <ProductList key={index} setTarget={setTarget}  completedProducts={true} data={page.contents} />
                    </>
                    )
                }
            </Container>
            <LinkFooter/>
        </>
    )
};

// 서버사이드 렌더링으로 favoriteList 가져옴
export const getServerSideProps : GetServerSideProps = async ({query}) => {
    const {id} = query;
    const queryClient = new QueryClient()
    try{
        // await queryClient.prefetchInfiniteQuery(
        //     ['buyList'],async()=>{
        //       const res = await axios.post(`http://localhost:4000/content/list/bought/${id}`,{}, {withCredentials: true,})
        //     console.log('server res.data',res.data)
        //       return res.data
        //     }
        //   )
        return {
            props : {
                dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
                id
            }
        }
    } catch(err){
        console.log(err);
        return {
            props : {},
        }
    }
}


export default buyList;