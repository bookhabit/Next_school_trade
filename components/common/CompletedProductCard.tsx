import React, { useState } from 'react';
import styled from 'styled-components';
import HeartIcon from "../../public/static/svg/product/heartIcon.svg"
import BorderHeartIcon from "../../public/static/svg/product/borderHeartIcon.svg"
import ChattingIcon from "../../public/static/svg/product/chattingIcon.svg"
import palette from '../../styles/palette';
import { Division } from './Division';

const Container = styled.div`
    width:350px;
    height:105px;
    margin-bottom:10px;
    display:flex;
    
    .complete-text{
        position:absolute;
        left:170px;
        color:${palette.main_text_color};
        margin-top:15px;
    }
    
    .productImg{
        width:116px;
        height:105px;
        img {
          width: 100%;
          height: 100%;
          opacity:0.6;
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
                }
            }
            .chattingDiv{
                display:flex;
                align-items:center;
                span{
                    margin-left:3px;
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

const CompletedProductCard:React.FC<IProps> = ({product}) => {
    return (
        <>
            <Container>
                <div className='complete-text'>
                    <h2>거래완료</h2>
                </div>
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
                                <BorderHeartIcon/>
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


export default CompletedProductCard;