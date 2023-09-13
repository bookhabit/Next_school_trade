import React from 'react';

const DashboardIndex = () => {
    return (
        <div>
            <h1>hello</h1>       

            <button disabled={true}>
                Hello world    
            </button>   

            <p data-testid="paragraph-blue" className='blue'>
                This is our paragraph
            </p>
        </div>
    );
};

export default DashboardIndex;