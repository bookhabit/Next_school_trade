import React from 'react';
import styled from 'styled-components';
import { productListType } from '../../types/product/product';
import ProductList from '../home/ProductList';

const Container = styled.div`
    padding:0px 20px;
    h2{
        margin-top:20px;
        margin-bottom:0px;
        font-size:20px;
        font-weight:bold;
    }
`
interface IProps{
    favoriteList:{id:number;content:object}[];
}

const FavoriteList:React.FC<IProps> = ({favoriteList}) => {
    console.log('favoriteList',favoriteList)
    // 관심목록의 content만 추출해서 ProductList에 넘겨준다
    // const productListData = favoriteList.map(item => item.content) as productListType[];
    // console.log(productListData)
    // 하트를 누르면 관심목록에서 삭제하는 api요청
    
    return (
        <Container>
            <h2>관심 상품</h2>
            {/* {productListData ? <ProductList completedProducts={false} data={productListData}/> : <h2>상품 리스트가 없습니다.</h2>} */}
        </Container>
    );
};

export default FavoriteList;