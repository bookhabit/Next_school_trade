import { GetServerSideProps } from 'next';
import React from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import FavoriteList from '../../../components/myPage/FavoriteList';
import { getFavoriteList } from '../../../lib/api/product';
import { useSelector } from 'react-redux';

const favorite = ({favoriteList}:any) => {
    console.log('favoriteList',favoriteList)
    return (
        <>
            <FavoriteList favoriteList={favoriteList} />
            <LinkFooter/>
        </>
    );
};

// 서버사이드 렌더링으로 url 파라미터의 인가코드 가져옴
export const getServerSideProps : GetServerSideProps = async ({query}) => {
    const {id} = query;
    try{
        const res = await getFavoriteList(Number(id));
        let favoriteList ;
        if(res.status===200){
            console.log(res.data)
            favoriteList = res.data;
        }
        return {
            props : {
                favoriteList
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