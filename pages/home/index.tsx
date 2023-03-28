import { useInfiniteQuery, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import Home from "../../components/home/Home";
import { GetproductList } from '../../lib/api/product';
import { IInfinitePage } from '../../types/product/product';

const home = ({productList}:any) => {
    const lastPageNumber=4
    const {
        data, // 💡 data.pages를 갖고 있는 배열
        error,
        fetchNextPage, // 💡 다음 페이지를 불러오는 함수
        hasNextPage, // 다음 페이지가 있는지 여부, Boolean
        isFetching, 
        isFetchingNextPage, 
        status, 
    } = useInfiniteQuery(
          ["productList"] 
        , GetproductList
        , {
            // 💡 중요! getNextPageParams가 무한 스크롤의 핵심,
            // getNextPageParam 메서드가 falsy한 값을 반환하면 추가 fetch를 실행하지 않는다
            // falsy하지 않은 값을 return 할 경우 Number를 리턴해야 하며
            // 위의 fetch callback의 인자로 자동으로 pageParam을 전달.
            getNextPageParam: (_lastPage,pages) => {
                console.log('getNextPageParam pages',pages)
                if(pages.length<lastPageNumber){
                    return pages.length+1
                }else{
                    return undefined
                }
            },
            initialData:productList
          }
        )
        console.log('infinitquery',data)
    return (
        <>
            {status === "loading" && <p>불러오는 중</p>}
            {status==='success'? <Home data={productList}/> :<h2>데이터를 불러오지 못했습니다</h2>}
            <button disabled={!hasNextPage} onClick={()=>fetchNextPage()} className="">Load more</button>
            {/* <LinkFooter/> */}
        </>
    )
};

// 서버사이드 렌더링으로 상품리스트 가져옴
export const getServerSideProps : GetServerSideProps = async () => {
    try{
        const {data} = await axios.get("http://localhost:4000/content/list")
        return {
            props : {
                productList:data
            }
        }
    } catch(err){
        console.log(err);
        return {
            props : {},
        }
    }
}
export default home;