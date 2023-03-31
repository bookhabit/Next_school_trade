import React from 'react';
import SubHeader from '../../../components/header/SubHeader';
import { useState } from 'react';
import SellList from '../../../components/myPage/sellList/SellList';
import LinkFooter from '../../../components/footer/LinkFooter';
import { GetServerSideProps } from 'next';
import { getSellingList } from '../../../lib/api/product';

const sellList = ({sellingList}:any) => {
    // subHeader에 왼쪽 정보인지 오른쪽 정보인지 알려주기 위한 state
    // 왼쪽 - 판매중 / 오른쪽 - 거래완료
    const [currentLeft,setCurrentLeft] = useState(true);
    console.log('sellingList',sellingList)

    return (
        <>
            <SubHeader currentLeft={currentLeft} setCurrentLeft={setCurrentLeft} />
            <SellList currentLeft={currentLeft} />
            <LinkFooter/>
        </>
    );
};
export default sellList;