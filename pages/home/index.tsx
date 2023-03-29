import { dehydrate, QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GetServerSideProps,  } from 'next';
import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import { GetproductList } from '../../lib/api/product';
import styled from 'styled-components';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import ProductList from '../../components/home/ProductList';


const Container = styled.div`
    padding:0px 20px;
    padding-top:20px;
`

const home = () => {
    const lastPageNumber=4
    const {
        data, // 💡 data.pages를 갖고 있는 배열
        fetchNextPage, // 💡 다음 페이지를 불러오는 함수
        hasNextPage, // 다음 페이지가 있는지 여부, Boolean
        status, 
    } = useInfiniteQuery(
          ["productList"] 
        , GetproductList
        , {
            // 위의 fetch callback의 인자로 자동으로 pageParam을 전달.
            getNextPageParam: (_lastPage,pages) => {
                if(pages.length<lastPageNumber){
                    return pages.length
                }else{
                    return undefined
            // getNextPageParam 메서드가 falsy한 값을 반환하면 추가 fetch를 실행하지 않는다
            //     }
            //     // offset 값 받기 - 백엔드
            //     // const { nextOffset, hasMore } = lastPage?.data;
			// 	// if (!hasMore) return false;
			// 	// else {
			// 	// 	return Number(nextOffset);
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

// 서버사이드 렌더링으로 상품리스트 가져옴
export const getServerSideProps : GetServerSideProps = async ()=> {
    const queryClient = new QueryClient()

    try{
        await queryClient.prefetchInfiniteQuery(
            ['productList'],async()=>{
              const res = await axios.get('http://localhost:4000/content/list')
              return res.data;
            }
          )
          return {
              props: {
                  // infiniteQuery를 사용하거나 Promise.all을 사용할 경우 JSON처리 필수
                  dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
              },
            }
    } 
    catch(error){
        return{
            notFound:true,
        }
    }
}
export default home;