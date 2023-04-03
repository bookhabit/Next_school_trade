import React from 'react';
import OnSale from './OnSale';
import CompletedProducts from './../CompletedProducts';

interface IProps{
    currentLeft:boolean;
    userId:number;
}

const SellList:React.FC<IProps> = ({currentLeft,userId}) => {
    return (
        <div>
            {currentLeft ? <OnSale userId={userId}/> : <CompletedProducts userId={userId}/>}
        </div>
    );
};

export default SellList;