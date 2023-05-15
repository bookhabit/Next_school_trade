import styled from "styled-components";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface MapProps {
  latitude: number;
  longitude: number;
  setCurrentMapLocation: Dispatch<
    SetStateAction<{ latitude: number; longitude: number }>
  >;
}

declare global {
  interface Window {
    kakao: any;
    google: any;
  }
}

const KAKAO_API_KEY = "0292e60416960470863fce8c75ff0a78";

function KaKaoMap({ latitude, longitude, setCurrentMapLocation }: MapProps) {
  console.log("props latitude", latitude);
  console.log("props longitude", longitude);
  const [currentLatitude, setCurrentLatitude] = useState(latitude);
  const [currentLogitude, setCurrentLogitude] = useState(longitude);
  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(
            currentLatitude,
            currentLogitude
          ),
        };
        // 지도 생성
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          currentLatitude,
          currentLogitude
        );

        // 지도를 클릭한 위치에 표출할 마커
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        // 드래그 이벤트 발생 시 중심좌표 변경
        kakao.maps.event.addListener(map, "dragend", function () {
          // 지도 중심좌표를 얻어옵니다
          var latlng = map.getCenter();
          console.log("위도", latlng.Ma);
          console.log("경도", latlng.La);
          setCurrentLatitude(latlng.Ma);
          setCurrentLogitude(latlng.La);
        });
      });
    };

    // 로드 이벤트 시 카카오맵 로드
    mapScript.addEventListener("load", onLoadKakaoMap);

    // 부모요소의 위도,경도 state 동기화시켜주기
    setCurrentMapLocation({
      latitude: currentLatitude,
      longitude: currentLogitude,
    });
    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [currentLatitude, currentLogitude]);

  return <MapContainer id="map" />;
}

const MapContainer = styled.div`
  width: 100%;
  height: 50%;
`;

export default KaKaoMap;
