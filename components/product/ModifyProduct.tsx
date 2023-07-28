import React, { ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import PriceWonIcon from "../../public/static/svg/product/price_won.svg";
import MapIcon from "../../public/static/svg/product/map.svg";
import PositionIcon from "../../public/static/svg/product/register_position.svg";
import useModal from "./../../hooks/useModal";
import SetPosition from "../map/SetPosition";
import { useState, useMemo } from "react";
import { makeMoneyNumber, makeMoneyString } from "../../lib/utils";
import Delete from "../../public/static/svg/product/thumnailXicon.svg";
import Slick from "./Slick";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { registerPositionActions } from "./../../store/registerPosition";
import axios from "../../lib/api";
import { isEmpty } from "lodash";
import { RootState } from "../../store";
import FooterButton from "../common/FooterButton";
import { productListType } from "../../types/product/product";

const Container = styled.form`
  /* 이미지 css */
  .register-image-box {
    width: 100%;
    height: 156px;
    display: flex;
    align-items: center;
    background-color: #fffbfb;
    border-bottom: 1px solid ${palette.divistion_color};
    overflow: hidden;
    .register-image-slide {
      width: 100%;
      display: flex;
      align-items: center;
      .file-image-box {
        width: 80px !important;
        height: 80px;
        margin: 0px 20px;
        background-color: #a19b9b;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        label {
          cursor: pointer;
          background-image: url("/static/svg/product/register_image.svg");
          background-position: center;
          background-repeat: no-repeat;
          width: 25px;
          height: 30px;
        }
        input[type="file"] {
          display: none;
        }
        .file-image-count {
          position: relative;
          font-size: 15px;
          font-weight: bold;
        }
      }

      .preview-image-box-wrap {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        .preview-image-box-error-message {
          width: 100%;
          color: ${palette.error_message};
          p {
            color: ${palette.error_message};
          }
        }
        section {
          width: 100%;
          .slick-slider {
            width: 100%;
            .slick-arrow {
              display: none !important;
            }
            .slick-track {
              width: 100%;
              display: flex;
              align-items: center;
              .slick-slide {
                width: 80px !important;
                height: 80px !important;
                margin-right: 20px;
                div {
                  width: 100%;
                  height: 100%;
                  .preview-image-box {
                    width: 100%;
                    height: 100%;
                    img {
                      width: 80px;
                      height: 80px;
                      object-fit: fill;
                      margin-right: 20px;
                      border-radius: 10px;
                    }
                    .preview-image-delete-icon {
                      cursor: pointer;
                      position: relative;
                      left: 70px;
                      bottom: 83px;
                      background-color: white;
                      border-radius: 50px;
                    }
                  }
                }
              }
            }
            .slick-dots {
              display: none !important;
            }
          }
        }
      }
    }
  }

  /* 제목 css */
  .register-input-title {
    width: 100%;
    height: 70px;
    padding: 20px;
    input {
      width: 100%;
      font-size: 20px;
    }
    border-bottom: 1px solid ${palette.divistion_color};
  }

  /* 가격 css */
  .register-input-price {
    width: 100%;
    height: 50px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${palette.divistion_color};
    svg {
      margin-right: 5px;
    }
    input {
      width: 100%;
    }
  }

  /* 설명 css */
  .register-input-desc {
    padding: 10px 20px;
    min-height: 170px;
    border-bottom: 1px solid ${palette.divistion_color};
    textarea {
      width: 100%;
      border: none;
      outline: none;
      padding: 10px;
      min-height: 150px;
      line-height: 20px;
    }
  }

  /* 카테고리 css */
  .register-select-category {
    width: 100%;
    height: 50px;
    padding: 15px 20px;
    border-bottom: 1px solid ${palette.divistion_color};
    select {
      width: 100%;
      border: none;
      outline: none;
    }
  }

  /* 지도 모달창 연결 css */
  .register-setPosition-modal {
    display: flex;
    align-items: center;
    background-color: #edebeb;
    width: 100%;
    height: 80px;
    padding: 0px 20px;
    border-bottom: 1px solid ${palette.divistion_color};
    svg {
      margin-right: 10px;
    }
    p {
      font-size: 20px;
    }
  }

  /* 위치 인풋받기 css */
  .register-setPosition-input {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${palette.divistion_color};
    padding: 0px 20px;
    svg {
      margin-right: 10px;
      // 크기조절
    }
    input {
      background-color: #faf8f8;
      width: 310px;
      height: 40px;
      padding: 3px 12px;
    }
  }

  /* 푸터 css */
  .register-footer {
    position: fixed;
    bottom: 0;
    background-color: ${palette.main_color};
    width: 100%;
    max-width: 430px;
    height: 70px;
  }
`;

const SliderItem = styled.div`
  width: 100%;
  img {
    max-width: 100%;
    height: auto;
  }
`;

interface IProps {
  initialProductData: productListType;
}

const ModifyProduct: React.FC<IProps> = ({ initialProductData }) => {
  console.log("initialProductData", initialProductData);
  const { openModal, ModalPortal, closeModal } = useModal();
  const router = useRouter();

  // Declare State

  // Redux

  // 지도
  const mapLocation = useSelector(
    (state: RootState) => state.registerPosition.location
  );
  const latitude = useSelector(
    (state: RootState) => state.registerPosition.latitude
  );
  const longitude = useSelector(
    (state: RootState) => state.registerPosition.longitude
  );

  // Local

  // 썸네일 초기이미지
  console.log("초기데이터 이미지 타입", initialProductData?.images);
  const prevImgList: string[] = initialProductData?.images.map((image) => {
    return image.path;
  });

  // 등록폼 초기이미지
  useEffect(() => {
    const getPrevRegisterImgList = async () => {
      if (!isEmpty(initialProductData?.images)) {
        const prevRegisterImgList = await Promise.all(
          initialProductData.images.map(async (image) => {
            const prevRegisterImgRes = await axios.get(
              `/${image.path}`,
              {
                responseType: "blob",
              }
            );

            console.log(
              "prevRegisterImgRes.data 바이너리형태: ",
              prevRegisterImgRes.data
            );
            const prevRegisterBinaryImg: Blob = new Blob(
              [prevRegisterImgRes.data],
              { type: prevRegisterImgRes.headers["content-type"] }
            );
            console.log(
              "prevRegisterBinaryImg  Blob형태: ",
              prevRegisterBinaryImg
            );
            const prevRegisterImg = new File(
              [prevRegisterBinaryImg],
              image.path,
              { type: prevRegisterImgRes.headers["content-type"] }
            );
            console.log("prevRegisterImg 파일형태", prevRegisterImg);
            return prevRegisterImg;
          })
        );
        setRegisterImages(prevRegisterImgList);
        setServerImgLength(prevRegisterImgList.length)
      }
    };
    getPrevRegisterImgList();
    // 지도데이터를 상품의 초기값으로 설정
    dispatch(
      registerPositionActions.setLocation(
        initialProductData ? initialProductData.location : ""
      )
    );
    dispatch(
      registerPositionActions.setLatitude(
        initialProductData ? initialProductData.latitude : 0
      )
    );
    dispatch(
      registerPositionActions.setLongitude(
        initialProductData ? initialProductData.longitude : 0
      )
    );
  }, []);

  const [serverImgLength,setServerImgLength] = useState<number>(0);
  const [thumbnail, setThumbnail] = useState<string[]>(prevImgList);
  console.log("thumbnail", thumbnail);
  console.log('serverImgLength',serverImgLength)

  const [registerImages, setRegisterImages] = useState<Blob[]>([]);
  const [errorImgCountMessage, setErrorImgCountMessage] = useState<string>("");
  console.log("regiseterImages", registerImages);
  // 상품 등록 폼
  const [productInputs, setProductInputs] = useState({
    title: initialProductData ? initialProductData.title : "",
    body: initialProductData ? initialProductData.body : "",
    category: initialProductData ? initialProductData.category : "",
  });
  const [price, setPrice] = useState(
    initialProductData ? makeMoneyString(String(initialProductData.price)) : ""
  );
  const { title, body, category } = productInputs;

  // Event Handler

  const dispatch = useDispatch();
  const onChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(registerPositionActions.setLocation(e.target.value));
  };
  // 가격 input - 콤마찍기
  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const commaPrice = makeMoneyString(String(e.target.value));
    setPrice(commaPrice);
  };

  // input과 select onChange함수들
  const onChangeInput = (event: any) => {
    const { name, value } = event.target;
    setProductInputs({
      ...productInputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  // 이미지 상대경로 저장 (썸네일 미리보기)
  const handleAddImages = (event: ChangeEvent<HTMLInputElement>) => {
    const imageLists = event.target.files;
    if (imageLists == null) {
      console.error("handleAddImages imageLists is Null");
      return;
    }

    if (imageLists && imageLists.length > 5) {
      setErrorImgCountMessage("이미지는 최소 1개, 최대 5개 등록가능합니다");
      return;
    } else {
      // 썸네일
      let imageUrlLists = [...thumbnail]; // 썸네일
      let registerImageList = [...registerImages]; // 등록 이미지
      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        const currentRegisterImage = imageLists[i];
        imageUrlLists.push(currentImageUrl);
        registerImageList.push(currentRegisterImage);
      }
      // 썸네일 배열 최대 5개
      if (imageUrlLists.length > 5) {
        imageUrlLists = imageUrlLists.slice(0, 5);
      }

      // 등록 폼 이미지 배열 최대 5개
      if (registerImageList.length > 5) {
        registerImageList = registerImageList.slice(0, 5);
      }

      setThumbnail(imageUrlLists);
      console.log(imageUrlLists);
      setRegisterImages(registerImageList);
    }
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    // 해당 썸네일 이미지 삭제
    setThumbnail(thumbnail.filter((_, index) => index !== id));
    // 해당 상품등록 폼 이미지 삭제
    const files = Array.from(registerImages);
    files.splice(id, 1); // 인덱스 id에 해당하는 원소 1개 삭제
    setRegisterImages(files);
    setServerImgLength((prev:number)=>prev-1)
  };

  // 상품등록 폼 검증
  const validateRegisterForm = () => {
    // 폼 요소의 값이 없다면
    if (
      !registerImages ||
      !title ||
      !price ||
      !body ||
      !category ||
      !latitude ||
      !longitude ||
      !mapLocation
    ) {
      console.log(
        title,
        price,
        body,
        category,
        latitude,
        longitude,
        mapLocation
      );
      return false;
    }
    return true;
  };

  // 상품등록 api
  const registerProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData();
    // formData에 데이터 넣기

    if (registerImages) {
      for (const image of registerImages) {
        formData.append("images", image);
      }
    }
    formData.append("title", title);
    formData.append("price", makeMoneyNumber(price));
    formData.append("body", body);
    formData.append("category", category);
    formData.append("latitude", String(latitude));
    formData.append("longitude", String(longitude));
    formData.append("location", mapLocation);

    console.log(formData.getAll("images"));

    // 현재 모든 formData는 string으로 되어있음
    if (validateRegisterForm()) {
      // formdata 출력하기
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      try {
        // 상품수정 api 호출
        const res = await axios.patch(
          `/content/update/${initialProductData.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
        );
        console.log("상품수정 res", res);
        // 응답값에 따라서 라우팅처리
        if (res.status === 200) {
          alert("상품수정이 완료되었습니다");
          router.push("/");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container onSubmit={registerProduct}>
      <div className="register-image-box">
        <div className="register-image-slide">
          <div className="file-image-box">
            <label htmlFor="file-image" />
            <input
              name="file"
              type="file"
              id="file-image"
              accept="image/png,image/jpg,image/jpeg"
              multiple
              onChange={handleAddImages}
            />
            <p className="file-image-count">{thumbnail?.length}/5</p>
          </div>
          <div className="preview-image-box-wrap">
            {isEmpty(thumbnail) && errorImgCountMessage !== "" ? (
              <p className="preview-image-box-error-message">
                {errorImgCountMessage}
              </p>
            ) : null}
            <Slick>
              {!isEmpty(thumbnail) &&
                thumbnail.map((image: string, id: number) => (
                  <SliderItem key={id} className="preview-image-box">
                    {/* BackImage로 변경하기 - onChange도 string으로 변환하면 모두 string처리 */}
                    <img
                      src={
                        id < serverImgLength
                          ? `http://localhost:4000/${image}`
                          : image
                      }
                      alt={`${image}-${id}`}
                    />
                    <Delete
                      onClick={() => handleDeleteImage(id)}
                      className="preview-image-delete-icon"
                    />
                  </SliderItem>
                ))}
            </Slick>
          </div>
        </div>
      </div>
      <div className="register-input-title">
        <input
          type="text"
          placeholder="상품 제목을 입력해주세요."
          name="title"
          value={title}
          onChange={onChangeInput}
        />
      </div>
      <div className="register-input-price">
        <PriceWonIcon />
        <input
          type="text"
          name="price"
          value={price}
          onChange={onChangePrice}
        />
      </div>
      <div className="register-input-desc">
        <textarea
          placeholder="상품에 대해서 설명해주세요."
          name="body"
          value={body}
          onChange={onChangeInput}
        />
      </div>
      <div className="register-select-category">
        <select name="category" value={category} onChange={onChangeInput}>
          <option disabled>카테고리</option>
          <option value="electronic">전자제품</option>
          <option value="clothes">의류</option>
          <option value="lecture">강의자료</option>
          <option value="furniture">가구/주방</option>
          <option value="book">책</option>
          <option value="householdGoods">생활용품</option>
          <option value="sports">스포츠/레저</option>
          <option value="hobby">취미/게임</option>
          <option value="beauty">뷰티/미용</option>
        </select>
      </div>
      <div className="register-setPosition-modal">
        <MapIcon />
        <p onClick={openModal}>거래 희망 장소 지도로 설정하기</p>
      </div>
      <div className="register-setPosition-input">
        <PositionIcon />
        <input
          type="text"
          placeholder="거래 희망장소명 입력"
          name="location"
          value={mapLocation}
          onChange={onChangeLocation}
        />
      </div>
      <div className="register-footer">
        <FooterButton type="submit">수정하기</FooterButton>
      </div>
      <ModalPortal>
        <SetPosition closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default ModifyProduct;
