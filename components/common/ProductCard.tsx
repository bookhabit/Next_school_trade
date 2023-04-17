import React, { useState } from 'react';
import styled from 'styled-components';
import HeartIcon from "../../public/static/svg/product/heartIcon.svg"
import BorderHeartIcon from "../../public/static/svg/product/borderHeartIcon.svg"
import ChattingIcon from "../../public/static/svg/product/chattingIcon.svg"
import palette from '../../styles/palette';
import { Division } from './Division';
import { useRouter } from 'next/router';
import { productListType } from '../../types/product/product';
import { makeMoneyString } from '../../lib/utils';
import moment from 'moment';
import 'moment/locale/ko';
import { isEmpty } from 'lodash';
import DefaultImgIcon from "../../public/static/svg/product/default_img.svg"
import ShowCompletedIcon from "../../public/static/svg/product/showCompletedIcon.svg"
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addFavorite, deleteFavorite } from '../../lib/api/product';
import { useDispatch } from 'react-redux';
import { favoriteActions } from '../../store/favorite';

const Container = styled.div`
    width:100%;
    height:105px;
    margin-bottom:10px;
    display:flex;
    padding-bottom:100px;
    
    .productImg{
        width:116px;
        height:105px;
        background-color:${palette.gray_80};
        cursor: pointer;
        img {
          width: 116px;
          height: 100%;
        }
        .default-img{
            width: 116px;
            height:40%;
            margin-top:30px;
        }
    }
    .productInfo{
        padding:5px 10px;
        width:100%;
        .change-completed-wrap-parent{
            width:100%;
            height:100%;
            position: relative;
            .change-completed-wrap{
                position: absolute;
                right:0px;
                display:flex;
                justify-content:center;
                align-items:center;
                flex-direction:row-reverse;
                .change-completed{
                    background-color:white;
                    color:${palette.updatedDate};
                    font-size:15px;
                    font-weight:bold;
                    margin-right:10px;
                }
            }
        }
        .productTitle{
            font-size:16px;
            font-weight:bold;
            cursor: pointer;
            display:inline-block;
        }
        .productPrice{
            font-size:14px;
            font-weight:600;
            margin-top:10px;
        }
        .info-footer{
            display:flex;
            justify-content:space-between;
            margin-top:35px;
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

interface IProps{
    product:productListType
    showChangeCompleted?:boolean
}

const ProductCard:React.FC<IProps> = ({product,showChangeCompleted}) => {
    let imagepath
    let imageAlt    
    if(product.images === undefined){
        imagepath = undefined
    }else if 
    (!isEmpty(product.images[0])){
        imagepath = product.images[0].path
        imageAlt = product.images[0].filename
    }
    const router= useRouter();
    const isLogged = useSelector((state:RootState)=>state.user.isLogged)

    // 거래완료로 바꾸는 버튼 모달
    const [showCompletedBtn,setShowCompletedBtn] = useState(false)

    const showCompletedHandler = ()=>{
        setShowCompletedBtn(!showCompletedBtn)
    }

    // 하트아이콘 클릭하면 사용자 관심목록에 추가하고 색칠된 아이콘으로 변경
    const [favoriteProduct,setFavoriteProduct] = useState(false)

    const dispatch = useDispatch();
    
    // 하트아이콘 변경
    const toggleHeartIcon = async ()=>{
        // 로그인 확인
        if(isLogged){
            setFavoriteProduct(!favoriteProduct)
            if(favoriteProduct===false){
                // 사용자의 관심목록 추가 api
                const response = await addFavorite(product.id)
                
                // 디스패치 - 관심목록 추가 모달창 
                dispatch(favoriteActions.setShowFavoriteModal(true))
                setTimeout(() => {
                    dispatch(favoriteActions.setShowFavoriteModal(false))
                }, 3000);
            }else{
                // 사용자의 관심목록에서 삭제
                const response = await deleteFavorite(product.id)
                console.log('delete response',response)
            }
        }else{
            alert('로그인이 필요합니다.')
            router.push("/auth")
            return false;
        }
    }

    const goToDetail = ()=>{
        router.push({
            pathname:`/product/[id]`,
            query:{id:product.id}
        })
    }

    // dateTime 상대시간으로 출력하기
    const now = moment();
    const productDate = moment(product.updatedAt)

    return (
        <>
            <Container>
                <div className='productImg' onClick={goToDetail}>
                    {imagepath? 
                    <img src={`http://localhost:4000/${imagepath}`} alt={`http://localhost:4000/${imageAlt}`}/>
                    :
                    <img src={"/static/svg/product/default_img.svg"} className="default-img" alt="기본이미지"/>
                    }
                </div>
                <div className='productInfo'>
                    <div className='change-completed-wrap-parent'>
                        {showChangeCompleted ? 
                        <div className='change-completed-wrap'>
                            <ShowCompletedIcon onClick={showCompletedHandler} />
                            {showCompletedBtn?
                                <p className='change-completed'>거래완료로 변경하기</p>
                            :null}
                        </div>
                        : null}
                    </div>
                    <p className='productTitle' onClick={goToDetail}>{product.title}</p>
                    <p className='productPrice'>{makeMoneyString(String(product.price))}원</p>
                    <div className='info-footer'>
                        <p className='info-footerLeft'>{productDate.from(now)}</p>
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


export default React.memo(ProductCard);