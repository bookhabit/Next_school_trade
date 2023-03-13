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
    const dispatch = useDispatch();
    // 대학교의 주소를 구글api에 요청하여 위도,경도를 반환하는 api 필요

    // 유저 정보의 위도,경도 값을 받아서 첫 위치로 지정하여 지도를 표시해준다 - 지금은 한서대학교 위도경도로 테스트
    const userLocation = useSelector((state:any)=>state.user.location)
    const userLatitude = useSelector((state:any)=>state.user.latitude)
    const userLongitude = useSelector((state:any)=>state.user.longitude)
    const [currentMapLocation, setCurrentMapLocation] = useState({
        latitude: userLatitude,
        longitude: userLongitude,
    });

    // 위치 설명 string
    const [inputLocation,setInputLocation] = useState(userLocation)
    
    const onChangeInput = (e:any)=>{
        setInputLocation(e.target.value)
    }
    const loadMap = async ()=>{
        await loadMapScript();
    }


    // 지도 불러오기
    const initMap = ()=>{
        console.log('지도불러온 횟수 - initMap')
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
        console.log('지도불러온 횟수 - useEffect')
        loadMap();
        window.initMap = initMap
    },[currentMapLocation])

    const [loading,setLoading] = useState(false)
    // 현재 위치 불러오기에 성공했을 때
    const onSuccessGetLocation = async ({coords}:any)=>{
        try{
          setCurrentMapLocation({
                latitude:coords.latitude,
                longitude:coords.longitude
          })
          setInputLocation("")
          Swal.fire('현재 위치를 설정하였습니다.')
          
        }catch(e){
          console.log(e)
          alert(e)
        }
        setLoading(false);
      }
  
      
    // 현재 위치 설정하기 클릭 시
    const setCurrentPosition = ()=>{
        setLoading(true);
        navigator.geolocation.getCurrentPosition(onSuccessGetLocation,(e)=>{
            console.log(e)
            alert(e?.message)
          })
    }
    // 지도 위치,위도,경도 입력값 확인하는 함수
    const validateLocation = ()=>{
        // 폼 요소의 값이 없다면
            if(!currentMapLocation|| inputLocation==''){
                return false;
            }
            return true;
    }

    // 주 거래 위치로 설정하기  - 위치,위도,경도를 registerPositon 리덕스 스토어에 저장한다
    const savePosition = ()=>{
        if(validateLocation() === false){
            Swal.fire('장소명을 입력해주세요.')
            return false;
        }
        dispatch(registerPositionActions.setLatitude(currentMapLocation.latitude));
        dispatch(registerPositionActions.setLongitude(currentMapLocation.longitude));
        dispatch(registerPositionActions.setLocation(inputLocation));
        // sweetAlert로 알림창 꾸미기
        Swal.fire({
            title: '거래 위치를 설정하시겠습니까?',
            text: '다시 되돌릴 수 없습니다.',
            icon: 'warning',
            
            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
            confirmButtonText: '승인', // confirm 버튼 텍스트 지정
            cancelButtonText: '취소', // cancel 버튼 텍스트 지정
            
            reverseButtons: true, // 버튼 순서 거꾸로
            
         }).then(result => {
            // 만약 Promise리턴을 받으면,
            if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
            
               Swal.fire('거래 위치가 설정되었습니다.', 'success');
            }
         });
        closeModal();
    }
    
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
                    value={inputLocation}
                    onChange={onChangeInput}
                />
            </div>
            <div className='set-position-current-location'>
                {loading?<p>불러오는 중...</p>:<button onClick={setCurrentPosition}>현재위치로 설정하기</button>}
            </div>
            <div className='set-position-footer'>
                <div className='search-university'>
                    <button>주소 검색</button>
                </div>
                <div className='set-position-submitBtn'>
                    <button onClick={savePosition}>거래 희망장소 설정</button>
                </div>
            </div>
        </Container>
    );
};

export default React.memo(SetPosition);