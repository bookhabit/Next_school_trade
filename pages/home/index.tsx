import axios from 'axios';
import { GetServerSideProps,  } from 'next';
import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import Home from "../../components/home/Home";


const home = ({productList}:any) => {
    return (
        <>
            <Home/>
            {/* <LinkFooter/> */}
        </>
    )
};

// 서버사이드 렌더링으로 상품리스트 가져옴
export const getServerSideProps : GetServerSideProps = async ()=> {
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