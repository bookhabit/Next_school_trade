import React, { useState } from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import SubHeader from '../../../components/header/SubHeader';

const sellingProducts = () => {
    // 왼쪽 
    const [currentLeft,setCurrentLeft] = useState(true);
    return (
        <div>
            <SubHeader currentLeft={currentLeft} setCurrentLeft={setCurrentLeft}/>
            <LinkFooter/>  
        </div>
    );
};

export default sellingProducts;