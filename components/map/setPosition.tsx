import React, { useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import MarkerIcon from "../../public/static/svg/map/marker.svg"
import CloseXIcon from "../../public/static/svg/map/modal_close_x_icon.svg"
import { useEffect, useRef, useState } from 'react';
import Head from "next/head";
import throttle from "lodash/throttle";

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
        margin-top:30px;
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
        margin-top:30px;
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
}

declare global{
    interface Window{
        initMap:()=>void;
    }
}
// 구글 지도 script 불러오기
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

const SetPosition:React.FC<IProps> = ({closeModal}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    // 대학교의 주소를 구글api에 요청하여 위도,경도를 반환하는 api 필요

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 36.6908896,
        longitude: 126.5806732,
    });

    const loadMap = async ()=>{
        await loadMapScript();
    }

    const initMap = ()=>{
        // 지도 불러오기
        if(mapRef.current){
            const map:any = new window.google.maps.Map(mapRef.current,{
                center:{
                    lat:currentLocation.latitude,
                    lng:currentLocation.longitude
                },
                zoom:18,
            });
            const marker = new window.google.maps.Marker({
                position:{
                    lat:currentLocation.latitude,
                    lng:currentLocation.longitude
                },
                map,
            })
            map.addListener("center_changed",throttle(()=>{
                const centerLat = map.getCenter().lat();
                const centerLng = map.getCenter().lng();
                console.log(centerLat,centerLng)
                marker.setPosition({lat:centerLat,lng:centerLng})
                setCurrentLocation({
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
    },[])

    
    return (
        <Container className='modal-contents'>
            <div className='set-position-header'>
                <p>거래 위치 설정하기</p>
                <CloseXIcon className="mordal-close-x-icon" onClick={closeModal}/>
            </div>
            <div className='set-position-map' id="map" ref={mapRef}>
                <MarkerIcon/>
            </div>
            <div className='set-position-name'>
                <p>선택한 곳의 장소명을 입력해주세요</p>
                <input
                    placeholder='예) 한서대학교 대정문 앞 씨유'
                />
            </div>
            <div className='set-position-footer'>
                <div className='search-university'>
                    <button>대학교 검색</button>
                </div>
                <div className='set-position-submitBtn'>
                    <button>거래 위치로 설정하기</button>
                </div>
            </div>
        </Container>
    );
};

export default React.memo(SetPosition);