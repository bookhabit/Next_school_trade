import React from 'react';
import OnSale from './OnSale';
import CompletedProducts from './../CompletedProducts';

interface IProps{
    currentLeft:boolean;
    sellingList:object[];
}

const SellList:React.FC<IProps> = ({currentLeft,sellingList}) => {
    return (
        <div>
            {currentLeft?<OnSale sellingList={sellingList} />:<CompletedProducts/>}
        </div>
    );
};

export default SellList;