import { GetServerSideProps } from 'next';
import React from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import { getFavoriteList } from '../../../lib/api/product';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FavoritePage, Page, productListType } from '../../../types/product/product';
import styled from 'styled-components';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import ProductList from '../../../components/home/ProductList';
import { dehydrate, QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import ProductCard from '../../../components/common/ProductCard';


const Container = styled.div`
    padding:0px 20px;
    padding-top:20px;
`


const favorite = ({id}:{id:number}) => {
    const {
        data, 
        fetchNextPage, 
        hasNextPage, 
        status, 
        isLoading
    } = useInfiniteQuery(
          ["favoriteList"] 
        , async (pageParam)=> await getFavoriteList(pageParam,id) as FavoritePage
        , {
            // 위의 fetch callback의 인자로 자동으로 pageParam을 전달.
            getNextPageParam: (lastPage:FavoritePage,pages:FavoritePage[]) => {
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
        console.log('infinitquery',data)
        // return favoriteList


        // 무한스크롤 구현
        const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
            if(isIntersecting && hasNextPage){
                fetchNextPage();
            }
        };
        // 스크롤 이벤트 타겟 지정
        const { setTarget } = useIntersectionObserver({ onIntersect });

        if(data == undefined) {
            return
        }
        

    return (
        <>
            <Container>
                {isLoading && <div>loading...</div>}
                {status === "error" && <div>error</div>}
                {status === "success" &&
                    data.pages.map((page,index) =>(
                        page.favorites.map((content,id)=>
                        <>
                        <ProductCard key={id} product={content.content} />
                        <div ref={setTarget}></div>
                        </>
                        )
                        
                        )
                    )
                }
            </Container>
            <LinkFooter/>
        </>
    );
};

// 서버사이드 렌더링으로 favoriteList 가져옴
export const getServerSideProps : GetServerSideProps = async ({query}) => {
    const {id} = query;
    const queryClient = new QueryClient()
    try{
        await queryClient.prefetchInfiniteQuery(
            ['favoriteList'],async()=>{
              const res = await axios.get(`http://localhost:4000/favorite/${id}`)
            console.log('res.data',res.data)
              return res.data
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