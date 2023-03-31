import React from 'react';
import OnSale from './OnSale';
import CompletedProducts from './../CompletedProducts';

interface IProps{
    currentLeft:boolean;
}

const SellList:React.FC<IProps> = ({currentLeft}) => {
    return (
        <div>
            {currentLeft?<OnSale />:<CompletedProducts/>}
        </div>
    );
};

export default SellList;