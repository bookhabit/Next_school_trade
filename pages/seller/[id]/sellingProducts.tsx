import React, { useState } from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import SubHeader from '../../../components/header/SubHeader';

const sellingProducts = () => {
    const [currentLeft,setCurrentLeft] = useState(true);
    return (
        <div>
            <SubHeader currentLeft={currentLeft} setCurrentLeft={setCurrentLeft}/>
            <LinkFooter/>  
        </div>
    );
};

export default sellingProducts;