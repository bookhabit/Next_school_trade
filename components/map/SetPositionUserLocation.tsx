import React, { useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import MarkerIcon from "../../public/static/svg/map/marker.svg"
import CloseXIcon from "../../public/static/svg/map/modal_close_x_icon.svg"
import { useEffect, useRef, useState } from 'react';
import throttle from "lodash/throttle";
import { useDispatch } from 'react-redux';
import registerPosition, { registerPositionActions } from './../../store/registerPosition';
import Swal from 'sweetalert2';
import DaumPostcodeEmbed from 'react-daum-postcode';
import GeoCoding from './GeoCoding';


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

    #__daum__layer_2{
        width:100%;
        height:400px !important;
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

// 구글 지도 script 불러오기
// const loadMapScript = () => {
//     return new Promise<void>((resolve) => {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
//       script.defer = true;
//       document.head.appendChild(script);
//       script.onload = () => {
//           resolve();
//         };
//     });
// };


// const loadMap = () => {
//     const existingScript = document.getElementById("googleMaps");
//     console.log('로드맵',existingScript)
//     if (!existingScript) {
//         console.log('구글맵 로드 시작!')
//         const script = document.createElement("script");
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
//         script.id = "googleMaps";
//         document.body.appendChild(script);
//         script.onload = () => {
//         console.log("구글맵 로드완료!");
//         };
//     }
// };

const SetPositionUserLocation:React.FC<IProps> = ({closeModal,currentLocation}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    // 주소 검색 api 
    const [openPostcode, setOpenPostcode] = React.useState<boolean>(false);
    

    // props로 받은 현재 위치를 state에 넣어준다
    const [currentMapLocation, setCurrentMapLocation] = useState({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
    });
    console.log(currentMapLocation)

    
    const reloadMap = () => {
        console.log('지도 reload')
        const existingScript = document.getElementById("googleMaps");
        if (existingScript) {
          existingScript.remove();
        }
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
        script.id = "googleMaps";
        document.body.appendChild(script);
    };

    // 주소 검색 api
    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: async  (data: any) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `)
            // 주소 > 위도,경도 변환 지오코딩
            const currentAddr = data.address;
            if(currentAddr){
                try{
                    // 여기에 받아온 주소로 위도,경도값을 알아내고 
                    const {lat, lng} =  await GeoCoding(currentAddr)
                    // 위도,경도값을 지도의 currentMapLocation state를 변경시킨다
                    setCurrentMapLocation({
                        latitude:lat,
                        longitude:lng
                    })
                    console.log('위치를 새로 변경하였습니다')
                    reloadMap();
                    
                }catch(e){
                    console.log('지도를 불러오는데 실패하였습니다.')
                }
            }
            setOpenPostcode(false);
        },
    }


    // 위치 설명 string
    const [inputLocation,setInputLocation] = useState('')
    
    const onChangeInput = (e:any)=>{
        setInputLocation(e.target.value)
    }
    // const loadMap = async ()=>{
    //     await loadMapScript();
    // }

    // 지도 불러오기
    window.initMap = ()=>{
        console.log('initMap 호출')
        if(mapRef.current){
            const map:any = new window.google.maps.Map(mapRef.current,{
                center:{
                    lat:currentMapLocation.latitude,
                    lng:currentMapLocation.longitude
                },
                zoom:16,
            });
            const marker = new window.google.maps.Marker({
                map:map,
                position:{
                    lat:currentMapLocation.latitude,
                    lng:currentMapLocation.longitude
                },
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
        const loadMap = () => {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
            script.id = "googleMaps";
            document.body.appendChild(script);
            script.onload = () => {
              console.log("Google Maps loaded!");
            };
          };
          loadMap();
    },[])

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
            {openPostcode ? 
                <DaumPostcodeEmbed 
                    // 값을 선택할 경우 실행되는 이벤트
                    onComplete={handle.selectAddress}  
                    // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    autoClose={false} 
                    // 팝업을 열때 기본적으로 입력되는 검색어 
                    defaultQuery='판교역로 235' 
                /> : 
                <div className='set-position-map' id="map" ref=     {mapRef}>
                    <MarkerIcon/>
                </div>}
            
            <div className='set-position-name'>
                <p>선택한 곳의 장소명을 입력해주세요</p>
                <input
                    placeholder='예) 한서대학교 대정문 앞 씨유'
                    value={inputLocation}
                    onChange={onChangeInput}
                />
            </div>
            <div className='set-position-footer'>
                <div className='search-university' onClick={handle.clickButton}>
                    <button>주소 검색</button>
                </div>
                <div className='set-position-submitBtn'>
                    <button onClick={savePosition}>주 거래 위치로 설정</button>
                </div>
            </div>
        </Container>
    );
};

export default React.memo(SetPositionUserLocation);