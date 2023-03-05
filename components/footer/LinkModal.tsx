import React from 'react';
import Link from 'next/link';

const LinkModal = () => {
    return (
        <div className='linkModal'>
            <Link href="chatting">
                <p>채팅하기</p>
            </Link>
            <Link href="registerProduct">
                <p>판매하기</p>
            </Link>
            <Link href="user/myPage">
                <p>내 정보</p>
            </Link>
        </div>
    );
};

export default LinkModal;