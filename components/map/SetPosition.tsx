import React, { useCallback } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import MarkerIcon from "../../public/static/svg/map/marker.svg";
import CloseXIcon from "../../public/static/svg/map/modal_close_x_icon.svg";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import throttle from "lodash/throttle";
import { useDispatch } from "react-redux";
import registerPosition, {
  registerPositionActions,
} from "../../store/registerPosition";
import Swal from "sweetalert2";
import { getLocationInfoAPI } from "../../lib/api/map";
import { useSelector } from "react-redux";
import GeoCoding from "./GeoCoding";
import DaumPostcodeEmbed from "react-daum-postcode";
import { RootState } from "../../store";
import Button from "../common/Button";
import axios from "axios";

const Container = styled.div`
  .mordal-close-x-icon {
    position: relative;
    left: 97px;
    bottom: 60px;
    font-size: 30px;
    color: #ffffff;
    cursor: pointer;
  }
  .set-position-header {
    position: sticky;
    top: 0;
    width: 100%;
    height: 90px;
    background-color: ${palette.main_color};
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-family: Roboto;
      font-size: 20px;
      color: ${palette.main_text_color};
      font-weight: bold;
    }
    cursor: default;
  }
  .set-position-map {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${palette.main_text_color};
    border-bottom: 1px solid ${palette.divistion_color};
  }

  .set-position-current-location {
    height: 20px;
    border-bottom: 1px solid ${palette.divistion_color};
    background-color: ${palette.main_text_color};
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      padding-top: 2px;
      color: ${palette.main_color};
      width: 100%;
      font-size: 14px;
      text-align: center;
    }
    button {
      padding-bottom: 1px;
      color: ${palette.main_color};
      width: 100%;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: ${palette.black};
      }
    }
  }

  .set-position-name {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #d9d9d9;
    padding: 0px 20px;
    p {
      width: 100%;
      font-size: 20px;
      font-weight: bold;
      text-align: left;
    }
    input {
      width: 100%;
      height: 20px;
      text-align: left;
      margin-top: 20px;
      font-size: 18px;
      &::placeholder {
        font-weight: bold;
        color: ${palette.updatedDate};
      }
    }
  }
  .set-position-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .search-address {
    cursor: pointer;
    width: 80%;
    height: 50px;
    background-color: #ded7e2;
    text-align: center;
    border-radius: 30px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    button {
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      color: #4d4747;
    }
  }
  .set-position-submitBtn {
    width: 80%;
    height: 50px;
    background-color: ${palette.main_color};
    text-align: center;
    border-radius: 30px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    button {
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      color: ${palette.main_text_color};
    }
  }

  /* 반응형 스타일링 */
  @media only screen and (min-width: 430px) {
    .mordal-close-x-icon {
      display: none;
    }
  }
  /* 태블릿 버전 */
  @media screen and (min-width: 768px) {
    .search-address {
      width: 50%;
      margin-top: 50px;
    }
    .set-position-submitBtn {
      width: 50%;
    }
    .set-position-current-location {
      height: 40px;
      p {
        font-size: 18px;
      }
      button {
        font-size: 18px;
      }
    }
  }

  /* pc버전 */
  @media screen and (min-width: 1024px) {
    .search-address {
      width: 40%;
      margin-top: 50px;
    }
    .set-position-submitBtn {
      width: 40%;
    }
  }
`;
interface IProps {
  closeModal: () => void;
}

declare global {
  interface Window {
    initMap: () => void;
  }
}

const SetPosition: React.FC<IProps> = ({ closeModal }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  // 주소 검색 api
  const [openPostcode, setOpenPostcode] = React.useState<boolean>(false);

  // 유저 정보의 위도,경도 값을 받아서 첫 위치로 지정하여 지도를 표시해준다 - 지금은 한서대학교 위도경도로 테스트
  const userLocation = useSelector((state: RootState) => state.user.location);
  const userLatitude = useSelector((state: RootState) => state.user.latitude);
  const userLongitude = useSelector((state: RootState) => state.user.longitude);
  const [currentMapLocation, setCurrentMapLocation] = useState({
    latitude: userLatitude,
    longitude: userLongitude,
  });
  console.log(
    "위치 정보 ",
    currentMapLocation.latitude,
    currentMapLocation.longitude
  );

  // 위치 설명 string
  const [inputLocation, setInputLocation] = useState(userLocation);

  const onChangeInput = (e: any) => {
    setInputLocation(e.target.value);
  };

  // 지도
  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          currentMapLocation.latitude,
          currentMapLocation.longitude
        ),
      };
      // 지도 생성
      const map = new window.kakao.maps.Map(container, options);
      const markerPosition = new window.kakao.maps.LatLng(
        currentMapLocation.latitude,
        currentMapLocation.longitude
      );

      // 지도를 클릭한 위치에 표출할 마커
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // 드래그 이벤트 발생 시 중심좌표 변경
      window.kakao.maps.event.addListener(map, "dragend", function () {
        // 지도 중심좌표를 얻어옵니다
        var latlng = map.getCenter();
        setCurrentMapLocation({
          latitude: latlng.Ma,
          longitude: latlng.La,
        });
      });
    });
  };

  // 주소 검색 api
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: async (data: any) => {
      console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `);
      // 주소 > 위도,경도 변환 지오코딩
      const currentAddr = data.address;
      if (currentAddr) {
        try {
          console.log("지오코딩 시작", currentAddr);
          // 여기에 받아온 주소로 위도,경도값을 알아내기 - 지오코딩 ( 카카오로 변경 )
          const REST_API_KEY = "1e71e50aa0333c4fc579cf84718fdd4b";
          const response = await axios.get(
            `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
              currentAddr
            )}`,
            {
              headers: {
                Authorization: `KakaoAK ${REST_API_KEY}`,
              },
            }
          );
          // 위도,경도값을 지도의 currentMapLocation state를 변경시킨다
          setCurrentMapLocation({
            latitude: response.data.documents[0].y,
            longitude: response.data.documents[0].x,
          });
        } catch (e) {
          console.log("지도를 불러오는데 실패하였습니다.");
        }
      }
      setOpenPostcode(false);
    },
  };

  useEffect(() => {
    console.log("지도 로드");
    onLoadKakaoMap();
  }, [currentMapLocation]);

  const [loading, setLoading] = useState(false);
  // 현재 위치 불러오기에 성공했을 때
  const onSuccessGetLocation = async ({ coords }: any) => {
    try {
      console.log(coords.latitude, coords.longitude);
      setCurrentMapLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setInputLocation("");
      Swal.fire("현재 위치를 설정하였습니다.");
    } catch (e) {
      console.log(e);
      alert(e);
    }
    setLoading(false);
  };

  // 현재 위치 설정하기 클릭 시
  const setCurrentPosition = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log(e);
      alert(e?.message);
    });
  };
  // 지도 위치,위도,경도 입력값 확인하는 함수
  const validateLocation = () => {
    // 폼 요소의 값이 없다면
    if (!currentMapLocation || inputLocation == "") {
      return false;
    }
    return true;
  };

  // 주 거래 위치로 설정하기  - 위치,위도,경도를 registerPositon 리덕스 스토어에 저장한다
  const savePosition = () => {
    if (validateLocation() === false) {
      Swal.fire("장소명을 입력해주세요.");
      return false;
    }
    dispatch(registerPositionActions.setLatitude(currentMapLocation.latitude));
    dispatch(
      registerPositionActions.setLongitude(currentMapLocation.longitude)
    );
    dispatch(registerPositionActions.setLocation(inputLocation));
    // sweetAlert로 알림창 꾸미기
    Swal.fire({
      title: "거래 위치를 설정하시겠습니까?",

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#54AA76", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "완료", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        Swal.fire("거래 위치가 설정되었습니다.");
      }
    });
    closeModal();
  };

  return (
    <Container className="modal-contents">
      <div className="set-position-header">
        <p>거래 위치 설정하기</p>
        <CloseXIcon className="mordal-close-x-icon" onClick={closeModal} />
      </div>
      {openPostcode ? (
        <DaumPostcodeEmbed
          // 값을 선택할 경우 실행되는 이벤트
          onComplete={handle.selectAddress}
          // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          autoClose={false}
          // 팝업을 열때 기본적으로 입력되는 검색어
          defaultQuery="판교역로 235"
        />
      ) : (
        <div className="set-position-map" id="map" ref={mapRef}>
          <MarkerIcon />
        </div>
      )}

      <div className="set-position-name">
        <p>선택한 곳의 장소명을 입력해주세요</p>
        <input
          placeholder="예) 한서대학교 대정문 앞 씨유"
          value={inputLocation}
          onChange={onChangeInput}
        />
      </div>
      <div className="set-position-current-location">
        {loading ? (
          <p>불러오는 중...</p>
        ) : (
          <button onClick={setCurrentPosition}>현재위치로 설정하기</button>
        )}
      </div>
      <div className="set-position-footer">
        <div className="search-address" onClick={handle.clickButton}>
          <button>주소 검색</button>
        </div>
        <div className="set-position-submitBtn">
          <button onClick={savePosition}>주 거래 위치로 설정</button>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(SetPosition);
