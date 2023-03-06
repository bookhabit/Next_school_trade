import React from 'react';
import TradeReview from '../reivew/TradeReview';
import WriteReview from './WriteReview';
import SellerReview from './SellerReview';

interface IProps{
    currentLeft:boolean
}
const SellerProfile:React.FC<IProps> = ({currentLeft}) => {
    // currentLeft 값을 props로 받아서 왼쪽 오른쪽 렌더링할 컴포넌트를 구분한다
    // router에서 넘겨주는 seller정보를 받는다
    return (
        <div>
            {currentLeft ? <SellerReview/> :<WriteReview/>}
        </div>
    );
};

export default SellerProfile;