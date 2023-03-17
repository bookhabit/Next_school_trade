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

    return (
        <>
            <SubHeader currentLeft={currentLeft} setCurrentLeft={setCurrentLeft} />
            <SellList currentLeft={currentLeft} sellingList={sellingList} />
            <LinkFooter/>
        </>
    );
};

// 서버사이드 렌더링으로 url 파라미터의 인가코드 가져옴
export const getServerSideProps : GetServerSideProps = async ({query}) => {
    const {id} = query;
    try{
        const res = await getSellingList(Number(id));
        let sellingList ;
        if(res.status===200){
            sellingList = res.data;
        }
        return {
            props : {
                sellingList
            }
        }
    } catch(err){
        console.log(err);
        return {
            props : {},
        }
    }
}

export default sellList;