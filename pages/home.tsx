import { GetServerSideProps } from 'next';
import React from 'react';
import LinkFooter from '../components/footer/LinkFooter';
import Home from "../components/home/Home";
import { GetproductList } from '../lib/api/product';

const home = ({data}:any) => {
    return (
        <>
            <Home data={data}/>
            <LinkFooter/>
        </>
    )
};

// 서버사이드 렌더링으로 url 파라미터의 인가코드 가져옴
export const getServerSideProps : GetServerSideProps = async () => {
    try{
        const {data} = await GetproductList();
        return {
            props : {
                data
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