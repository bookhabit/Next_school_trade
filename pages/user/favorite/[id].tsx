import { GetServerSideProps } from 'next';
import React from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import FavoriteList from '../../../components/myPage/FavoriteList';
import { getFavoriteList } from '../../../lib/api/product';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { productListType } from '../../../types/product/product';
import styled from 'styled-components';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import ProductList from '../../../components/home/ProductList';
import { dehydrate, QueryClient, useInfiniteQuery } from '@tanstack/react-query';


const Container = styled.div`
    padding:0px 20px;
    padding-top:20px;
`


const favorite = ({id}:{id:number}) => {
    console.log('favorite props:',id)
    const lastPageNumber=3 // 백엔드 offset 받아와야함
    const {
        data, // 💡 data.pages를 갖고 있는 배열
        fetchNextPage, // 💡 다음 페이지를 불러오는 함수
        hasNextPage, // 다음 페이지가 있는지 여부, Boolean
        status, 
    } = useInfiniteQuery(
          ["favoriteList"] 
        , async (pageParam)=> {
            const res = await getFavoriteList(pageParam,id)
            const favoriteList = res.map((item:{id:number,content:object[],users:object[]}) => item.content) as productListType[];
              return favoriteList;
        }
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
        console.log('infinitquery',data)

        // 무한스크롤 구현
        const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
            if(isIntersecting){
                fetchNextPage();
            }
        };
        // 스크롤 이벤트 타겟 지정
        const { setTarget } = useIntersectionObserver({ onIntersect });



    return (
        <>
            <Container>
                {status === "loading" && <div>loading...</div>}
                {status === "error" && <div>error</div>}
                {status === "success" &&
                    data.pages.map((page, index) => 
                        <ProductList key={index} completedProducts={false} data={page} setTarget={setTarget} />
                )}
                {/* <FavoriteList favoriteList={favoriteList} /> */}
            </Container>
            <LinkFooter/>
        </>
    );
};

// 서버사이드 렌더링으로 url 파라미터의 인가코드 가져옴
export const getServerSideProps : GetServerSideProps = async ({query}) => {
    const {id} = query;
    const queryClient = new QueryClient()
    try{
        await queryClient.prefetchInfiniteQuery(
            ['favoriteList'],async()=>{
              const res = await axios.get(`http://localhost:4000/favorite/${id}`)
              const favoriteList = res.data.map((item:{id:number,content:object[],users:object[]}) => item.content) as productListType[];
              return favoriteList;
            }
          )
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

export default favorite;