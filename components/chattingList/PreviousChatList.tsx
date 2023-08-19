import React from 'react';
import { ChattingListPage, messagePayload } from '../../pages/user/chatting/room/[id]';
import { convertToDatetime } from '../../lib/utils';

interface IProps{
    chat_list:messagePayload[],
    loggedUserId:number,
    setTarget:React.Dispatch<React.SetStateAction<HTMLElement | null | undefined>>
}

const PreviousChatList:React.FC<IProps> = ({chat_list,loggedUserId,setTarget}) => {
    console.log(chat_list,loggedUserId)
    return (
        <div>
            <div ref={setTarget}>setTarget</div>
            {chat_list.reverse().map((message)=>(
                loggedUserId === message.send_id ?
                // 현재 로그인한 사용자와 보낸 사람의 id가 같다면 '나'
                <div className='chatting-me' key={Math.random()}>
                    <p className='chatting-content'>{message.message}</p>
                    <p className='chatting-updateDate'>{convertToDatetime(String(message.updatedAt))}</p>
                </div>
                :
                // 현재 로그인한 사용자와 보낸 사람의 id가 다르다면 >> '상대방'
                <div className='chatting-opponent' key={Math.random()}>
                    <div className='opponent-profile'>
                        <img src="/static/svg/chatting/opponent.svg" alt="상대방 프로필이미지"/>
                    </div>
                    <p className='chatting-content'>{message.message}</p>
                    <p className='chatting-updateDate'>{convertToDatetime(String(message.updatedAt))}</p>
                </div>
            ))}
        </div>
    )
};

export default PreviousChatList;