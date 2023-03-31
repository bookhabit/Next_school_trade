import { GetServerSideProps } from 'next';
import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import { getCategoryProductList, GetproductList } from '../../lib/api/product';
import styled from 'styled-components';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import ProductList from '../../components/home/ProductList';
import { dehydrate, QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';


const Container = styled.div`
    padding:0px 20px;
    padding-top:20px;
`
const categoryHome = ({categoryName}:any) => {
    console.log(categoryName)
    const lastPageNumber=3 // 백엔드 offset 받아와야함
    const {
        data, // 💡 data.pages를 갖고 있는 배열
        fetchNextPage, // 💡 다음 페이지를 불러오는 함수
        hasNextPage, // 다음 페이지가 있는지 여부, Boolean
        status, 
    } = useInfiniteQuery(
          ["categoryList",categoryName] 
        , async (pageParam)=> await getCategoryProductList(pageParam,categoryName)
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
            if(isIntersecting && hasNextPage){
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
            </Container>
            <LinkFooter/>
        </>
    )
};

// 서버사이드 렌더링으로 카테고리의 쿼리를 보내서 상품리스트 가져옴
export const getServerSideProps : GetServerSideProps = async ({query}) => {
    const {name} = query;
    const categoryName = name
    const queryClient = new QueryClient()

    try{
        await queryClient.prefetchInfiniteQuery(
            ['categoryList',categoryName],async()=>{
              const res = await axios.get(`http://localhost:4000/content/list/category`,{params: {category: categoryName}})
              return res.data;
            }
          )
        
          return {
              props: {
                  // infiniteQuery를 사용하거나 Promise.all을 사용할 경우 JSON처리 필수
                  dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
                  categoryName
              },
            }
    } 
    catch(error){
        return{
            notFound:true,
        }
    }
}
export default categoryHome;