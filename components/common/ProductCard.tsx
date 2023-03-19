import React, { useState } from 'react';
import styled from 'styled-components';
import HeartIcon from "../../public/static/svg/product/heartIcon.svg"
import BorderHeartIcon from "../../public/static/svg/product/borderHeartIcon.svg"
import ChattingIcon from "../../public/static/svg/product/chattingIcon.svg"
import palette from '../../styles/palette';
import { Division } from './Division';
import { useRouter } from 'next/router';
import { productListType } from '../../types/product';
import { makeMoneyString } from '../../lib/utils';

const Container = styled.div`
    width:350px;
    height:105px;
    margin-bottom:10px;
    display:flex;
    
    .productImg{
        width:116px;
        height:105px;
        img {
          width: 100%;
          height: 100%;
        }
    }
    .productInfo{
        padding:10px;
        width:100%;
        .productTitle{
            font-size:16px;
            font-weight:bold;
        }
        .productPrice{
            font-size:14px;
            font-weight:600;
            margin-top:10px;
        }
        .info-footer{
            display:flex;
            justify-content:space-between;
            margin-top:30px;
            p{
                font-size:13px;
                color:${palette.updatedDate}
            }
        }
        .info-footerLeft{
            display:flex;
            align-items:center;
        }
        .info-footerRight{
            display:flex;
            align-items:center;
            
            .heartDiv{
                display:flex;
                align-items:center;
                margin-right:10px;
                cursor: pointer;
                span{
                    margin-left:3px;
                    font-size:16px;
                    text-align:right;
                }
            }
            .chattingDiv{
                display:flex;
                align-items:center;
                span{
                    margin-left:3px;
                    text-align:right;
                }
            }
        }
    }
  
`

// // 내가 만든 테스트 데이터 타입
// type Product = {
//         id:number,
//         title:string,
//         price:string,
//         updatedDate:string,
//         heartCount:number,
//         chattingCount:number,
//         img:{src:string},
//         favorite:boolean
// }

interface IProps{
    product:productListType
}

const ProductCard:React.FC<IProps> = ({product}) => {
    console.log('ProductCard',product)
    // 하트아이콘 클릭하면 사용자 관심목록에 추가하고 색칠된 아이콘으로 변경
    const userFavoriteState = false // product.favorite
    const [favoriteProduct,setFavoriteProduct] = useState(userFavoriteState)
    
    // 하트아이콘 변경
    const toggleHeartIcon = ()=>{
        setFavoriteProduct(!favoriteProduct)
        // 사용자의 관심목록 favorite에 true로 변경하는 API호출 또는 리덕스에 저장된 사용자의 관심목록에 dispatch하기
    }
    const router= useRouter();
    const goToDetail = ()=>{
        router.push({
            pathname:`/product/[id]`,
            query:{id:product.id}
        })
    }


    return (
        <>
            <Container>
                <div className='productImg' onClick={goToDetail}>
                    <img src={product.images}/>
                </div>
                <div className='productInfo'>
                    <p className='productTitle' onClick={goToDetail}>{product.title}</p>
                    <p className='productPrice'>{makeMoneyString(String(product.price))}원</p>
                    <div className='info-footer'>
                        <p className='info-footerLeft'>{product.updatedAt}</p>
                        <div className='info-footerRight'>
                            <div className='heartDiv'>
                                {favoriteProduct? <HeartIcon onClick={toggleHeartIcon}/>:<BorderHeartIcon onClick={toggleHeartIcon}/>}
                                <span>{product.like_cnt}</span>
                            </div>
                            <div className='chattingDiv'>
                                <ChattingIcon/>
                                <span>{product.chat_cnt}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Division/>
        </>
    );
};


export default ProductCard;