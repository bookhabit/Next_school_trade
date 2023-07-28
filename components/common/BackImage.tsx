import React from 'react';

interface BackImageProps{
    src:string;
    alt:string;
}

const BackImage:React.FC<BackImageProps> = ({src,alt}) => {
    return (
        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${src}`} alt={alt}/>
    );
};

export default BackImage;