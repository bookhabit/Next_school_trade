import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GetServerSideProps,  } from 'next';
import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import Home from "../../components/home/Home";
import { GetproductList } from '../../lib/api/product';


const home = ({productList}:any) => {
    return (
        <>
            <Home/>
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