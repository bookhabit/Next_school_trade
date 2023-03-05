import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import FavoriteList from '../../components/myPage/FavoriteList';

const favorite = () => {
    return (
        <>
            <FavoriteList/>
            <LinkFooter/>
        </>
    );
};

export default favorite;