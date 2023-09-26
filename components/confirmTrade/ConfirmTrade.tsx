import React, { useState } from 'react';
import { RoomType } from '../../pages/user/chatting/[id]';
import { makeMoneyString } from '../../lib/utils';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { changeCompletedAPI, getProductDetail } from '../../lib/api/product';
import { productListType } from '../../types/product/product';
import Swal from 'sweetalert2';

const TradeConfirm = styled.div`
    width:100%;
    padding:20px;
    padding-top:200px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .confirm-introduce{
        margin-bottom:20px;
        border:1px solid ${palette.gray_aa};
        border-radius:30px;
        padding:10px;
        h2{
            text-align:center;
            margin:15px;
            color:${palette.gray_76}
        }
        align-items:center;
        p{
            margin-bottom:20px;
            font-size:16px;
            line-height:20px;
            color:${palette.gray_76}
        }
    }

    .confirm-buyer-payment{
        display:flex;
        align-items:center;
        justify-content:space-between;
        font-size:20px;
        margin-bottom:20px;
        button{
            font-size:16px;
            font-weight:600;
            cursor: pointer;
            padding:8px;
            border-radius:25px;
            background-color:white;
            color:${palette.main_color} ;
            &:hover{
                background-color:${palette.main_color};
                color:${palette.main_text_color};
            }
        }
    }
    .confirm-button-box{
        width:100%;
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:20px;
        .confirm-button{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            button{
                background-color:${palette.main_color};
                color:${palette.main_text_color};
                padding:10px;
                border-radius:25px;
                font-size:16px;
                cursor: pointer;
                &:hover{
                    background-color:${palette.main_color};
                    opacity:80;
                }
            }
            .confirm-message{
                margin-top:10px;
                color:${palette.bittersweet}
            }
        }
    }
    .confirm-complete-box{
        padding:20px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        p{
            color:${palette.gray_b0};
            margin-bottom:10px;
        }
    }
`

type IProps = {
    chattingRoomData: {
        room: RoomType;
        title: string;
        price: string;
    }
    confirmTrade:boolean,
    setConfirmTrade:React.Dispatch<React.SetStateAction<boolean>>,
    loggedUserId:number,
    buyerId:number,
    sellerId:number
}

const ConfirmTrade:React.FC<IProps> = ({chattingRoomData,loggedUserId,confirmTrade,setConfirmTrade,
    buyerId,
    sellerId}) => {

    // 거래하기 로직
    const [buyerCompleted,setBuyerCompleted] = useState(false)
    const [sellerCompleted,setSellerCompleted] = useState(false)

    const setBuyerCompletedAPI = async ()=>{
        if(loggedUserId === buyerId){
            setBuyerCompleted(true)
            try{
                await changeCompletedAPI(chattingRoomData.room.content_id)
            }catch(e){
                console.log('거래완료 변경실패')
            }
        }else{
            Swal.fire('구매자만 버튼을 눌러주세요')
        }
    }

    const setSellerCompletedAPI = async ()=>{
        if(loggedUserId === sellerId){
            setSellerCompleted(true)
            try{
                await changeCompletedAPI(chattingRoomData.room.content_id)
            }catch(e){
                console.log('거래완료 변경실패')
            }
        }else{
            Swal.fire('판매자만 버튼을 눌러주세요')
        }
    }

    const confirmTradeModal = async ()=>{
        setConfirmTrade(!confirmTrade)
        const response = await getProductDetail(chattingRoomData.room.content_id)
        const productInfo = response.data as productListType
        
        try{
            setBuyerCompleted(productInfo.buyer_completed)
            setSellerCompleted(productInfo.seller_completed)
        }catch(e){
            console.log('구매자 및 판매자의 completed 변경')
        }
    }
    return (
        <>
          <div className='chatting-header'>
            <p className='post-title'>{chattingRoomData.title}</p>
            <div className='chatting-confirm-button-box'>
                <p className='post-price'>{makeMoneyString(chattingRoomData.price)} 원</p>
                <button onClick={confirmTradeModal}>{confirmTrade ?'채팅창' :'거래완료'}</button>
            </div>
        </div>
        {confirmTrade && 
            <TradeConfirm>
                <div className='confirm-introduce'>
                    <h2>거래과정</h2>
                    <p>구매자가 결제를 완료하고 판매자와 거래를 마친 후 물건을 잘 받았다면 구매자 거래완료 버튼 클릭</p>
                    <p>판매자는 물건을 전달한 후 결제를 완료하고 판매자 거래완료 버튼 클릭</p>
                </div>
                {
                    <div className='confirm-buyer-payment'>
                        <p>{makeMoneyString(chattingRoomData.price)} 원</p>
                    </div>
                }
                <div className='confirm-button-box'>
                    <div className='confirm-button'>
                        <button onClick={setBuyerCompletedAPI}>구매자 거래완료</button>
                        {buyerCompleted && <p className='confirm-message'>완료</p>}
                    </div>
                    <div className='confirm-button'>
                        <button onClick={setSellerCompletedAPI}>판매자 거래완료</button>
                        {sellerCompleted && <p className='confirm-message'>완료</p>}
                    </div>
                </div>
                {buyerCompleted && sellerCompleted && 
                    <div className='confirm-complete-box'>
                        <p>구매자와 판매자 모두 거래 확인 완료되었습니다</p>
                    </div>
                }
            </TradeConfirm>
        }  
        </>
    );
};

export default ConfirmTrade;