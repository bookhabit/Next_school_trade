import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

interface IProps{
    currentLeft:boolean
}

const Auth:React.FC<IProps> = ({currentLeft}) => {
    return (
        <div>
            {currentLeft?<Login/>:<SignUp/>}
        </div>
    );
};

export default Auth;