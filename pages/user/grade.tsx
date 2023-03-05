import React from 'react';
import SubHeader from '../../components/header/SubHeader';
import { useState } from 'react';

const grade = () => {
    // subHeader에 왼쪽 정보인지 오른쪽 정보인지 알려주기 위한 state
    const [currentLeft,setCurrentLeft] = useState(true);
    return (
        <div>
            <SubHeader currentLeft={currentLeft} setCurrentLeft={setCurrentLeft} />
            <h2>나의 평점 및 리뷰</h2>
        </div>
    );
};

export default grade;