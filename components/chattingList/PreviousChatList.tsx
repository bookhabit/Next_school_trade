import React from 'react';
import { ChattingListPage, messagePayload } from '../../pages/user/chatting/room/[id]';
import { convertToDatetime } from '../../lib/utils';
import { useRouter } from 'next/router';

interface IProps{
    chat_list:messagePayload[],
    loggedUserId:number,
    setTarget:React.Dispatch<React.SetStateAction<HTMLElement | null | undefined>>,
    sellerConfirmTime:Date,
    buyerConfirmTime:Date,
}

const PreviousChatList:React.FC<IProps> = ({chat_list,loggedUserId,setTarget,sellerConfirmTime,buyerConfirmTime}) => {
    console.log(chat_list,loggedUserId,sellerConfirmTime,buyerConfirmTime)
    const router = useRouter()
    const roomKey = String(router.query.id)
    const sellerId = Number(roomKey.split('-')[1])
    const buyerId = Number(roomKey.split('-')[2])
    console.log('logged',loggedUserId)

    return (
        <div>
            <div ref={setTarget}></div>
            {chat_list.reverse().map((chatting)=>(
                loggedUserId === chatting.send_id ?
                // 현재 로그인한 사용자와 보낸 사람의 id가 같다면 '나'
                <div className='chatting-me' key={Math.random()}>
                    <p className='chatting-content'>{chatting.message}</p>
                    <div className='chatting-sub-content'>
                        {loggedUserId === buyerId ? 
                        sellerConfirmTime < chatting.createdAt ? 
                        <span className='confirm-number'>1</span>
                        : <span></span>
                        :
                        buyerConfirmTime < chatting.createdAt ? 
                        <span className='confirm-number'>1</span>
                        : <span></span>
                        }
                        <p className='chatting-updateDate'>{convertToDatetime(String(chatting.createdAt))}</p>
                    </div>
                </div>
                :
                // 현재 로그인한 사용자와 보낸 사람의 id가 다르다면 >> '상대방'
                <div className='chatting-opponent' key={Math.random()}>
                    <div className='opponent-profile'>
                        <img src="/static/svg/chatting/opponent.svg" alt="상대방 프로필이미지"/>
                    </div>
                    <p className='chatting-content'>{chatting.message}</p>
                    <p className='chatting-updateDate'>{convertToDatetime(String(chatting.createdAt))}</p>
                </div>
            ))}
        </div>
    )
};

export default React.memo(PreviousChatList);