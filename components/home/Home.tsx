import React from 'react';
import ProductList from './ProductList';
import styled from 'styled-components';
import { GetproductList } from '../../lib/api/product';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

const Container = styled.div`
    padding:0px 20px;
    padding-top:20px;
`

// interface IProps {
//     data:productListType[]
// }

const Home:React.FC= () => {
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
                if(pages.length<lastPageNumber){
                    return pages.length+1
                }else{
                    return undefined
                }
            }
          }
        )
        console.log('infinitquery',data)
        if (status === 'loading') {
            return <div>Loading...</div>;
          }
        
          if (status === 'error') {
            return <div>Error</div>;
          }
    return (
        <Container>
            {status === "success" &&
              data.pages.map((page, index) => 
              <ProductList key={index} completedProducts={false} data={page}/>
          )}

            <button disabled={!hasNextPage} onClick={()=>fetchNextPage()} className="">Load more</button>
            {/* {data ? <ProductList completedProducts={false} data={data}/> : <h2>상품 리스트가 없습니다.</h2>} */}
        </Container>
    );
};


export default Home;