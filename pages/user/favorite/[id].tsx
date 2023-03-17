import { GetServerSideProps } from 'next';
import React from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import FavoriteList from '../../../components/myPage/FavoriteList';
import { getFavoriteList } from '../../../lib/api/product';
import { useSelector } from 'react-redux';

const favorite = () => {
    return (
        <>
            <FavoriteList/>
            <LinkFooter/>
        </>
    );
};

// 서버사이드 렌더링으로 url 파라미터의 인가코드 가져옴
export const getServerSideProps : GetServerSideProps = async ({query}) => {
    const {id} = query;
    try{
        const {data} = await getFavoriteList(Number(id));
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

export default favorite;