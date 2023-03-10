import React, { useState } from 'react';
import styled from 'styled-components';
import HeartIcon from "../../public/static/svg/product/heartIcon.svg"
import BorderHeartIcon from "../../public/static/svg/product/borderHeartIcon.svg"
import ChattingIcon from "../../public/static/svg/product/chattingIcon.svg"
import palette from '../../styles/palette';
import { Division } from './Division';
import { useRouter } from 'next/router';

const Container = styled.div`
    width:350px;
    height:105px;
    margin-bottom:10px;
    display:flex;
    background-color:${palette.main_text_color};
    
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


type Product = {
        id:number,
        title:string,
        price:string,
        updatedDate:string,
        heartCount:number,
        chattingCount:number,
        img:{src:string},
        favorite:boolean
}

interface IProps{
    product:Product
}

const ProductCard:React.FC<IProps> = ({product}) => {
    // ??????????????? ???????????? ????????? ??????????????? ???????????? ????????? ??????????????? ??????
    const userFavoriteState = product.favorite
    const [favoriteProduct,setFavoriteProduct] = useState(userFavoriteState)
    console.log('favoriteProduct',favoriteProduct)
    // ??????????????? ??????
    const toggleHeartIcon = ()=>{
        setFavoriteProduct(!favoriteProduct)
        // ???????????? ???????????? favorite??? true??? ???????????? API?????? ?????? ???????????? ????????? ???????????? ??????????????? dispatch??????
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
            <Container onClick={goToDetail}>
                <div className='productImg'>
                    <img src={product.img.src}/>
                </div>
                <div className='productInfo'>
                    <p className='productTitle'>{product.title}</p>
                    <p className='productPrice'>{product.price}</p>
                    <div className='info-footer'>
                        <p>{product.updatedDate}</p>
                        <div className='info-footerRight'>
                            <div className='heartDiv'>
                                {favoriteProduct? <HeartIcon onClick={toggleHeartIcon}/>:<BorderHeartIcon onClick={toggleHeartIcon}/>}
                                <span>{product.heartCount}</span>
                            </div>
                            <div className='chattingDiv'>
                                <ChattingIcon/>
                                <span>{product.chattingCount}</span>
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