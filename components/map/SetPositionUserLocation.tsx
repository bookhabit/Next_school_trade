import React, { useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import MarkerIcon from "../../public/static/svg/map/marker.svg"
import CloseXIcon from "../../public/static/svg/map/modal_close_x_icon.svg"
import { useEffect, useRef, useState } from 'react';
import Head from "next/head";
import throttle from "lodash/throttle";
import { useDispatch } from 'react-redux';
import registerPosition, { registerPositionActions } from './../../store/registerPosition';
import Swal from 'sweetalert2';
import { getLocationInfoAPI } from '../../lib/api/map';
import { useSelector } from 'react-redux';

const Container = styled.div`
    .mordal-close-x-icon {
        position:relative;
        left:97px;
        bottom:60px;
        font-size:30px;
        color:#FFFFFF;
        cursor: pointer;
    }
    .set-position-header{
        position:sticky;
        top:0;
        width:100%;
        height:90px;
        background-color: ${palette.main_color};
        display:flex;
        justify-content:center;
        align-items:center;
        p{
            font-family:Roboto;
            font-size:20px;
            color:${palette.main_text_color};
            font-weight:bold;
        }
    }
    .set-position-map{
        width:100%;
        height:400px;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:${palette.main_text_color};
        border-bottom:1px solid ${palette.divistion_color}
    }

    .set-position-current-location{
        background-color:${palette.main_color};
        height:20px;
        border-bottom:1px solid ${palette.divistion_color};
        p{
            padding-top:2px;
            color:${palette.main_text_color};
            width:100%;
            font-size:14px;
            text-align:center;
        }
        button{
            padding-bottom:1px;
            color:${palette.main_text_color};
            width:100%;
            font-size:14px;
            text-align:center;
        }
    }

    .set-position-name{
        width:100%;
        height:100px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        border-bottom:1px solid  #D9D9D9;
        padding:0px 20px;
        p{
            width:100%;
            font-size:20px;
            font-weight:bold;
            text-align:left;
        }
        input{
            width:100%;
            height:20px;
            text-align:left;
            margin-top:20px;
            font-size:18px;
            &::placeholder{
                font-weight:bold;
                color:${palette.updatedDate}
            }
        }
    }
    .set-position-footer{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
    .search-university{
        width:300px;
        height:50px;
        background-color:#DED7E2;
        text-align:center;
        border-radius:30px;
        margin-top:20px;
        display:flex;
        justify-content:center;
        button{
            font-size:20px;
            font-weight:bold;
            color:#4D4747;
        }
    }
    .set-position-submitBtn{
        width:300px;
        height:50px;
        background-color:${palette.main_color};
        text-align:center;
        border-radius:30px;
        margin-top:20px;
        display:flex;
        justify-content:center;
        button{
            font-size:20px;
            font-weight:bold;
            color:${palette.main_text_color};
        }
    }
`
interface IProps {
    closeModal: () => void;
    currentLocation:{
        latitude: number,
        longitude: number,
    }
}

declare global{
    interface Window{
        initMap:()=>void;
    }
}
// ?????? ?????? script ????????????
const loadMapScript = () => {
    return new Promise<void>((resolve) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => {
          resolve();
        };
    });
};

const SetPositionUserLocation:React.FC<IProps> = ({closeModal,currentLocation}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    // ?????? ?????? api ??????
    // ????????? ??????,????????? ???????????? ?????? ????????? ????????? api ??????

    // props??? ?????? ?????? ????????? state??? ????????????
    const [currentMapLocation, setCurrentMapLocation] = useState({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
    });

    // ?????? ?????? string
    const [inputLocation,setInputLocation] = useState('')
    
    const onChangeInput = (e:any)=>{
        setInputLocation(e.target.value)
    }
    const loadMap = async ()=>{
        await loadMapScript();
    }


    // ?????? ????????????
    const initMap = ()=>{
        if(mapRef.current){
            const map:any = new window.google.maps.Map(mapRef.current,{
                center:{
                    lat:currentMapLocation.latitude,
                    lng:currentMapLocation.longitude
                },
                zoom:16,
            });
            const marker = new window.google.maps.Marker({
                position:{
                    lat:currentMapLocation.latitude,
                    lng:currentMapLocation.longitude
                },
                map,
            })
            map.addListener("center_changed",throttle(()=>{
                const centerLat = map.getCenter().lat();
                const centerLng = map.getCenter().lng();
                console.log(centerLat,centerLng)
                marker.setPosition({lat:centerLat,lng:centerLng})
                setCurrentMapLocation({
                    latitude:centerLat,
                    longitude:centerLng
                })
            },300)
            )
        }
    }

    useEffect(()=>{
        loadMap();
        window.initMap = initMap
    },[currentMapLocation])


    // ?????? ??????,??????,?????? ????????? ???????????? ??????
    const validateLocation = ()=>{
        // ??? ????????? ?????? ?????????
            if(!currentMapLocation|| inputLocation==''){
                return false;
            }
            return true;
    }

    // ??? ?????? ????????? ????????????  - ??????,??????,????????? registerPositon ????????? ???????????? ????????????
    const savePosition = ()=>{
        if(validateLocation() === false){
            Swal.fire('???????????? ??????????????????.')
            return false;
        }
        dispatch(registerPositionActions.setLatitude(currentMapLocation.latitude));
        dispatch(registerPositionActions.setLongitude(currentMapLocation.longitude));
        dispatch(registerPositionActions.setLocation(inputLocation));
        // sweetAlert??? ????????? ?????????
        Swal.fire({
            title: '?????? ????????? ?????????????????????????',
            text: '?????? ????????? ??? ????????????.',
            icon: 'warning',
            
            showCancelButton: true, // cancel?????? ?????????. ????????? ?????? ??????
            confirmButtonColor: '#3085d6', // confrim ?????? ?????? ??????
            cancelButtonColor: '#d33', // cancel ?????? ?????? ??????
            confirmButtonText: '??????', // confirm ?????? ????????? ??????
            cancelButtonText: '??????', // cancel ?????? ????????? ??????
            
            reverseButtons: true, // ?????? ?????? ?????????
            
         }).then(result => {
            // ?????? Promise????????? ?????????,
            if (result.isConfirmed) { // ?????? ??????????????? confirm ????????? ????????????
            
               Swal.fire('?????? ????????? ?????????????????????.', 'success');
            }
         });
        closeModal();
    }
    
    return (
        <Container className='modal-contents'>
            <div className='set-position-header'>
                <p>?????? ?????? ????????????</p>
                <CloseXIcon className="mordal-close-x-icon" onClick={closeModal}/>
            </div>
            <div className='set-position-map' id="map" ref={mapRef}>
                <MarkerIcon/>
            </div>
            <div className='set-position-name'>
                <p>????????? ?????? ???????????? ??????????????????</p>
                <input
                    placeholder='???) ??????????????? ????????? ??? ??????'
                    value={inputLocation}
                    onChange={onChangeInput}
                />
            </div>
            <div className='set-position-footer'>
                <div className='search-university'>
                    <button>?????? ??????</button>
                </div>
                <div className='set-position-submitBtn'>
                    <button onClick={savePosition}>??? ?????? ????????? ??????</button>
                </div>
            </div>
        </Container>
    );
};

export default React.memo(SetPositionUserLocation);