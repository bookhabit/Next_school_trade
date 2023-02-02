import React from 'react';
import HambergerIcon from "../public/static/svg/header/hambergerIcon.svg";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { logoutAPI } from '../lib/api/auth';
import { userActions } from './../store/user';


const AuthUserProfile = () => {
    const user = useSelector((state:any) => state.user);

    const dispatch = useDispatch();

    // 유저메뉴 열고 , 닫힘 여부
    const [isUsermenuOpened,setIsUsermenuOpened] = useState(false);

    const logout = async()=>{
        try{
            await logoutAPI();
            dispatch(userActions.initUser());
        }catch(e:any){
            console.log(e.message);
        }
    }
    return (
        <>
        {
            user.isLogged&& (
                <OutsideClickHandler onOutsideClick={()=>{
                    if(isUsermenuOpened){
                        setIsUsermenuOpened(false)
                    }
                }}>
                    <button type='button' className='header-user-profile' onClick={()=>setIsUsermenuOpened(!isUsermenuOpened)}>
                        <HambergerIcon/>
                        <img src={user.profileImage} className="header-user-profile-image" alt=""/>
                    </button>
                    {isUsermenuOpened && (
                    <ul className="header-usermenu">
                        <li>숙소 관리</li>
                        <li>숙소 등록하기</li>
                        <div className="header-usermenu-divider" />
                        <li role="presentation" onClick={logout}>
                            로그아웃
                        </li>
                    </ul>
                )}
                </OutsideClickHandler>
            )
        }
            
        </>
    );
};

export default AuthUserProfile;