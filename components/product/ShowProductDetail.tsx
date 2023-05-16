import React, { useEffect } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import BeforeIcon from "../../public/static/svg/header/commonHeader/beforeIcon.svg";
import HeartIcon from "../../public/static/svg/product/detail_heartIcon.svg";
import DivisionIcon from "../../public/static/svg/product/divisionIcon.svg";
import ModalClickIcon from "../../public/static/svg/product/modal_click_icon.svg";
import DownArrowIcon from "../../public/static/svg/product/down_arrow.svg";
import PositionIcon from "../../public/static/svg/product/position.svg";
import BorderHeartIcon from "../../public/static/svg/product/detailBorderHeartIcon.svg";
import SellerStarIcon from "../../public/static/svg/product/sellerStarIcon.svg";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import Selector from "../common/Selector";
import { makeMoneyString } from "../../lib/utils";
import Slider from "react-slick";
import Item from "./Item";
import Slick from "./Slick";
import { productListType } from "../../types/product/product";
import moment from "moment";
import "moment/locale/ko";
import { isEmpty } from "lodash";
import { RootState } from "../../store";
import FooterButton from "../common/FooterButton";
import {
  addFavorite,
  deleteFavorite,
  deleteProductAPI,
} from "../../lib/api/product";
import { favoriteActions } from "../../store/favorite";
import { useDispatch } from "react-redux";
import FavoriteModal from "./FavoriteModal";
import { Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";

interface cssProps {
  postOwner: boolean;
}

const Container = styled.div<cssProps>`
  width: 100%;
  height: 100%;
  @media only screen and (min-width: 430px) {
    min-height: 100vh;
  }
  /* 헤더 css */
  .detail-header {
    position: sticky;
    top: 0;
    width: 100%;
    height: 90px;
    background-color: ${palette.main_color};
    display: flex;
    align-items: center;
    .detail-header-left {
      display: flex;
      align-items: center;
      padding: 0px 20px;
      width: 100%;
      height: 45px;
      p {
        color: ${palette.main_text_color};
        font-size: 25px;
        font-weight: bold;
      }
      .detail-header-left-icon {
        cursor: pointer;
        margin-right: 15px;
      }
    }
  }

  .detail-body {
    width: 100%;
    padding-bottom: 70px;
    /* 이미지 슬라이드 부분 css */
    .detail-product-image {
      width: 100%;
      height: 230px;
      border-bottom: 1px solid ${palette.divistion_color};

      .slick-slider {
        .slick-arrow {
          display: none !important;
        }
        .slick-list {
          width: 100%;
          height: 230px;
          .slick-track {
            width: 100%;
            height: 230px;
            div {
              width: 100%;
              height: 230px;
              background-color: ${palette.gray_80};
              img {
                width: 100%;
                height: 230px;
                object-fit: fill;
              }
              .default-img {
                width: 116px;
                height: 40%;
                margin-top: 50px;
              }
            }
          }
          img {
            width: 100%;
            height: auto;
          }
        }
        .slick-dots {
          bottom: 15px !important;
        }
      }
    }

    /* 판매자 정보 or 셀렉터 및 수정,삭제 */
    .detail-seller-info {
      width: 100%;
      height: 64px;
      padding: 0px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #eaeaea;
      border-bottom: 1px solid ${palette.divistion_color};
      .seller-info-left {
        /* width: 100%; */
        display: flex;
        align-items: center;
        /* 작성자가 아닐 경우 */
        /* .profile-image-wrapper {
          background: white;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
        } */
        p {
          cursor: pointer;
          font-size: 20px;
          font-weight: bold;
        }
        /* 작성자일경우 */
        .seller-product-completed {
          margin-left: 10px;
          p {
            cursor: default;
          }
        }
      }
      .seller-info-right {
        /* width: 100%; */
        .correct-remove-modal-wrapper {
          position: relative;
          .correct-remove-modal-icon {
            cursor: pointer;
          }
          .correct-remove-modal {
            width: 80px;
            height: 60px;
            background-color: white;
            font-size: 13px;
            color: ${palette.updatedDate};
            text-align: center;
            padding: 15px;
            position: absolute;
            right: 15px;
            top: -16px;
            p {
              cursor: pointer;
              margin-bottom: 10px;
              &:hover {
                color: black;
              }
            }
          }
        }
      }
    }

    /* 상품 상세 정보 css */
    .detail-product-info {
      width: 100%;
      padding: 20px;
      .detail-product-title {
        width: 100%;
        height: 40px;
        background-color: #fbfbfb;
        margin-bottom: 10px;
        padding: 10px;
        p {
          font-size: 20px;
          font-weight: bold;
        }
      }
      .detail-product-sub-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 35px;
        background-color: #fbfbfb;
        margin-bottom: 10px;
        padding: 0px 10px;

        p {
          font-size: 15px;
          font-weight: bold;
          color: ${palette.updatedDate};
        }
      }
      .detail-product-desc {
        width: 100%;
        min-height: 180px;
        background-color: #fbfbfb;
        margin-bottom: 10px;
        padding: 10px;
        p {
          font-size: 16px;
          line-height: 25px;
        }
      }
      .detail-product-position {
        display: flex;
        align-items: center;
        width: 100%;
        min-height: 55px;
        background-color: #fbfbfb;
        .detail-product-positionIcon {
          margin: 0px 10px;
        }
        p {
          font-size: 15px;
          font-weight: bold;
        }
      }
    }
  }
  /* 관심목록 모달창 */
  .favorite-modal {
    position: fixed;
    left: 75%;
    transform: translateX(-80%);
    bottom: 80px !important;
  }
  @media only screen and (min-width: 430px) {
    min-height: 100vh;
    .favorite-modal {
      margin-left: 20px;
      left: auto;
      transform: none;
    }
  }
  /* 푸터 css */
  .detail-footer {
    position: fixed;
    bottom: 0;
    background-color: ${palette.main_color};
    width: 100%;
    max-width: 430px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .detail-footer-icon {
      margin-left: 20px;
      margin-right: 20px;
      .detail-heartIcon {
        cursor: pointer;
        margin-right: 10px;
      }
    }

    .detail-footer-price {
      font-size: 30px;
      font-weight: bold;
      color: ${palette.main_text_color};
      flex-grow: 1;
    }
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
  productDetail: productListType;
}

const ShowProductDetail: React.FC<IProps> = ({ productDetail }) => {
  console.log("props로 데이터 받음", productDetail);
  let imagepath: string;
  let imageAlt: string;
  if (!isEmpty(productDetail.images[0])) {
    console.log(productDetail.images[0].path);
    imagepath = productDetail.images[0].path;
    imageAlt = productDetail.images[0].filename;
  }
  const router = useRouter();

  const [favoriteProduct, setFavoriteProduct] = useState(productDetail.like);
  console.log("productDetail.like", productDetail.like);

  const isLogged = useSelector((state: RootState) => state.user.isLogged);

  // 이전 페이지 이동
  const goToBackpage = () => {
    window.history.back();
  };
  // 판매자 정보 페이지로 이동 - seller.id 넘김
  const goToSellerProfile = () => {
    router.push({
      pathname: `/seller/${productDetail.seller.id}`,
    });
  };

  // 게시글 주인이 아닐 경우 채팅하기 버튼 이벤트
  const goToChattingRoom = () => {
    if (isLogged) {
      router.push({
        pathname: `/user/chatting/[id]`,
        query: { id: productDetail.seller.id },
      });
    } else {
      alert("로그인이 필요합니다.");
      router.push("/auth");
      return false;
    }
  };

  // 게시글 주인일 경우 채팅방 버튼 이벤트
  const goToChattinList = () => {
    if (isLogged) {
      router.push({
        pathname: `/user/chatting`,
      });
    } else {
      alert("로그인이 필요합니다.");
      router.push("/auth");
      return false;
    }
  };

  // 판매자 정보
  const ownerInfo = productDetail.seller;

  // 로그인 - 현재 유저 id
  const userId = useSelector((state: RootState) => state.user.id);

  // 로그인된 사용자의 id와 상품의 seller.id 비교
  const postOwner = userId === productDetail.seller.id;

  // 수정,삭제 버튼 모달보이기 state
  const [showBtnModal, setShowBtnModal] = useState(false);
  const clickShowBtnModal = () => {
    setShowBtnModal(!showBtnModal);
  };

  //  판매자 별점 개수에 따라서 별점아이콘 출력하기
  const starLoop = () => {
    let starCount = [];
    for (let i = 0; i < ownerInfo.grade; i++) {
      starCount.push(i);
    }
    return starCount;
  };

  const dispatch = useDispatch();

  // 하트아이콘 변경
  const toggleHeartIcon = async () => {
    // 로그인 확인
    if (isLogged) {
      if (favoriteProduct === false) {
        // 사용자의 관심목록 추가 api
        const response = await addFavorite(productDetail.id);
        console.log("addFavorite response", response);

        // 디스패치 - 관심목록 추가 모달창
        dispatch(favoriteActions.setShowFavoriteModal(true));
        setFavoriteProduct(!favoriteProduct);
        setTimeout(() => {
          dispatch(favoriteActions.setShowFavoriteModal(false));
        }, 3000);
      } else {
        // 사용자의 관심목록에서 삭제
        const response = await deleteFavorite(productDetail.id);
        console.log("delete response", response);
        alert("관심목록에서 삭제되었습니다");
        setFavoriteProduct(!favoriteProduct);
      }
    } else {
      alert("로그인이 필요합니다.");
      router.push("/auth");
      return false;
    }
  };

  // 관심목록 UI - 모달창 showState
  const showFavoriteModal = useSelector(
    (state: RootState) => state.favorite.showFavoriteModal
  );

  // dateTime 상대시간으로 출력하기
  const now = moment();
  const productDate = moment(productDetail.updatedAt);

  // 상품 삭제
  const deleteProduct = () => {
    deleteProductAPI(productDetail.id);
    alert("삭제되었습니다");
    window.history.back();
  };

  // 상품 수정
  const goToModifyProduct = () => {
    router.push(
      {
        pathname: `/product/modify`,
        query: { productDetail: JSON.stringify(productDetail) },
      },
      "/product/modify"
    );
  };

  // 카테고리 한글 변환
  const switchCategoryName = () => {
    switch (productDetail.category) {
      case "electronic":
        return "전자제품";
      case "clothes":
        return "의류";
      case "lecture":
        return "강의자료";
      case "furniture":
        return "가구/주방";
      case "book":
        return "책";
      case "householdGoods":
        return "생활용품";
      case "sports":
        return "스포츠/레저";
      case "hobby":
        return "취미/게임";
      case "beauty":
        return "뷰티/미용";
      default:
        return "잘못된경로";
    }
  };
  console.log("유저프로필", ownerInfo);

  return (
    <Container postOwner={postOwner}>
      {/* 헤더 */}
      <div className="detail-header">
        <div className="detail-header-left">
          <div className="detail-header-left-icon">
            <BeforeIcon onClick={goToBackpage} />
          </div>
          <p>{productDetail.title}</p>
        </div>
      </div>
      {/* 본문 */}
      <div className="detail-body">
        <div className="detail-product-image">
          <Slick>
            {!isEmpty(productDetail.images[0]) ? (
              productDetail.images.map((item: any, index: number) => (
                <SliderItem key={index}>
                  <img
                    src={`http://localhost:4000/${imagepath}`}
                    alt={`http://localhost:4000/${imageAlt}`}
                  />
                </SliderItem>
              ))
            ) : (
              <img
                src={"/static/svg/product/default_img.svg"}
                className="default-img"
                alt="기본이미지"
              />
            )}
          </Slick>
        </div>

        <div className="detail-seller-info">
          <div className="seller-info-left">
            {postOwner ? (
              <>
                {productDetail.completed ? (
                  <div className="seller-product-completed">
                    <p>거래완료</p>
                  </div>
                ) : (
                  <div className="seller-product-completed">
                    <p>판매중</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {ownerInfo.profileImage?.path && (
                  <Avatar
                    src={`http://localhost:4000/${ownerInfo.profileImage?.path}`}
                    alt="판매자 프로필"
                    sx={{ width: 25, height: 25, bgcolor: grey[50], mr: 1 }}
                  />
                )}
                <p onClick={goToSellerProfile}>{ownerInfo.nickname}</p>
              </>
            )}
          </div>
          <div className="seller-info-right">
            {postOwner ? (
              <div className="correct-remove-modal-wrapper">
                <ModalClickIcon
                  onClick={productDetail.completed ? null : clickShowBtnModal}
                  className="correct-remove-modal-icon"
                />
                {!showBtnModal ? null : (
                  <div className="correct-remove-modal">
                    <p className="correct-btn" onClick={goToModifyProduct}>
                      수정하기
                    </p>
                    <p className="remove-btn" onClick={deleteProduct}>
                      삭제하기
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                {starLoop().map((index) => (
                  <SellerStarIcon key={index} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="detail-product-info">
          <div className="detail-product-title">
            <p>{productDetail.title}</p>
          </div>
          <div className="detail-product-sub-info">
            <div className="detail-product-category">
              <p>{switchCategoryName()}</p>
            </div>
            <div className="detail-product-updateDate">
              <p>{productDate.from(now)}</p>
            </div>
          </div>
          <div className="detail-product-desc">
            <p>{productDetail.body}</p>
          </div>
          <div className="detail-product-position">
            <PositionIcon className="detail-product-positionIcon" />
            <p>
              거래희망장소 : <span>{productDetail.location}</span>
            </p>
          </div>
        </div>
      </div>
      {/* 관심목록 모달창 */}
      {showFavoriteModal ? (
        <div className="favorite-modal">
          <FavoriteModal />
        </div>
      ) : null}
      {/* 푸터 */}
      <div className="detail-footer">
        <div className="detail-footer-icon">
          {productDetail.like ? (
            <HeartIcon className="detail-heartIcon" onClick={toggleHeartIcon} />
          ) : (
            <BorderHeartIcon
              className="detail-heartIcon"
              onClick={toggleHeartIcon}
            />
          )}
          <DivisionIcon />
        </div>
        <p className="detail-footer-price">
          {makeMoneyString(String(productDetail.price))} 원
        </p>
        {postOwner ? (
          <FooterButton onClick={goToChattinList}>채팅목록</FooterButton>
        ) : (
          <FooterButton onClick={goToChattingRoom}>채팅하기</FooterButton>
        )}
      </div>
    </Container>
  );
};

export default ShowProductDetail;
