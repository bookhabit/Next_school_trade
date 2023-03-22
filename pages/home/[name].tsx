import { GetServerSideProps } from 'next';
import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import Home from "../../components/home/Home";
import { getCategoryProductList, GetproductList } from '../../lib/api/product';

const categoryHome = ({data}:any) => {
    console.log('categoryHome',data)
    return (
        <>
            <Home data={data}/>
            <LinkFooter/>
        </>
    )
};


// 서버사이드 렌더링으로 카테고리의 쿼리를 보내서 상품리스트 가져옴
export const getServerSideProps : GetServerSideProps = async ({query}) => {
    const {name} = query;
    try{
        const {data} = await getCategoryProductList(String(name));
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
export default categoryHome;