import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeartIcon from "../../public/static/svg/product/heartIcon.svg";
import BorderHeartIcon from "../../public/static/svg/product/borderHeartIcon.svg";
import ChattingIcon from "../../public/static/svg/product/chattingIcon.svg";
import palette from "../../styles/palette";
import { Division } from "./Division";
import { useRouter } from "next/router";
import { FavoritePage, Page, productListType } from "../../types/product/product";
import { convertToDatetime, makeMoneyString } from "../../lib/utils";
import { isEmpty } from "lodash";
import DefaultImgIcon from "../../public/static/svg/product/default_img.svg";
import ShowCompletedIcon from "../../public/static/svg/product/showCompletedIcon.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  addFavorite,
  changeCompletedAPI,
  deleteFavorite,
} from "../../lib/api/product";
import { useDispatch } from "react-redux";
import { favoriteActions } from "../../store/favorite";
import BackImage from "./BackImage";
import Swal from "sweetalert2";
import { InfiniteData, QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';

const Container = styled.div`
  width: 100%;
  height: 105px;
  margin-bottom: 10px;
  display: flex;
  padding-bottom: 100px;
  

  .productImg {
    width: 116px;
    height: 105px;
    background-color: ${palette.gray_80};
    cursor: pointer;
    img {
      width: 116px;
      height: 100%;
    }
    .default-img {
      width: 116px;
      height: 40%;
      margin-top: 30px;
    }
  }

  .productInfo {
    padding: 5px 10px;
    width: 100%;
    .productInfo-top {
      display: flex;
      justify-content: space-between;
      .change-completed-wrap-parent {
        height: 100%;
        cursor: pointer;
        .change-completed-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row-reverse;
          .change-completed {
            background-color: white;
            color: ${palette.updatedDate};
            font-size: 15px;
            font-weight: bold;
            margin-right: 10px;
            &:hover {
              color: black;
            }
          }
        }
      }
      .productTitle {
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        display: inline-block;
      }
    }
    .productPrice {
      font-size: 14px;
      font-weight: 600;
      margin-top: 10px;
    }
    .info-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 35px;
      p {
        font-size: 13px;
        color: ${palette.updatedDate};
      }
    }
    .info-footerLeft {
      display: flex;
      align-items: center;
    }
    .info-footerRight {
      display: flex;
      align-items: center;

      .heartDiv {
        display: flex;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;
        span {
          margin-left: 3px;
          font-size: 16px;
          text-align: right;
        }
      }
      .chattingDiv {
        display: flex;
        align-items: center;
        span {
          margin-left: 3px;
          text-align: right;
        }
      }
    }
  }
`;

interface IProps {
  product: productListType;
  showChangeCompleted?: boolean;
  refetch?:<TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<InfiniteData<Page|FavoritePage>, unknown>>
}

const ProductCard: React.FC<IProps> = ({ product, showChangeCompleted,refetch }) => {
  let imagepath;
  const imageAlt = "상품이미지"
  if (product.images === undefined) {
    imagepath = undefined;
  } else if (!isEmpty(product.images[0])) {
    imagepath = product.images[0].path;
  }
  const router = useRouter();
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  // 판매자 페이지에서는 거래완료 모달 숨기기
  if (router.pathname === "/seller/[id]/sellingProducts") {
    showChangeCompleted = false;
  }

  // 거래완료로 바꾸는 버튼 모달
  const [showCompletedBtn, setShowCompletedBtn] = useState(false);

  const showCompletedHandler = () => {
    setShowCompletedBtn(!showCompletedBtn);
  };

  // 거래완료로 바꾸기 api
  const changeCompleted = async () => {
    try{
      await changeCompletedAPI(product.id);
      Swal.fire('','거래완료로 변경하였습니다','success')
      refetch
    }catch(e){
      console.log('거래 완료로 변경실패',e)
    }
  };

  // 하트아이콘 클릭하면 사용자 관심목록에 추가하고 색칠된 아이콘으로 변경
  const [favoriteProduct, setFavoriteProduct] = useState(product.like);

  const dispatch = useDispatch();

  // 하트아이콘 변경
  const toggleHeartIcon = async () => {
    // 로그인 확인
    if (isLogged) {
      if (favoriteProduct === false) {
        // 사용자의 관심목록 추가 api
        try{
          await addFavorite(product.id);
          setFavoriteProduct(!favoriteProduct);
          // 디스패치 - 관심목록 추가 모달창
          dispatch(favoriteActions.setShowFavoriteModal(true));
          setTimeout(() => {
            dispatch(favoriteActions.setShowFavoriteModal(false));
          }, 3000);
        }catch(e:any){
          console.log('관심목록 추가 실패',e)
          Swal.fire('관심목록을 추가하는데 실패하였습니다',e.code,'error')
        }
      } else if(favoriteProduct === true){
        // 사용자의 관심목록에서 삭제
        try{
          const response = await deleteFavorite(product.id);
          setFavoriteProduct(!favoriteProduct);
          refetch
          Swal.fire('관심목록에서 삭제되었습니다','','success')
        }catch(e:any){
          console.log('관심목록 삭제 실패',e)
          Swal.fire('관심목록을 삭제하는데 실패하였습니다', e.code, 'error')
        }
      }
    } else {
      alert("로그인이 필요합니다.");
      router.push("/auth");
      return false;
    }
  };
  const goToDetail = () => {
    if (document.scrollingElement) {
      const scroll = document.scrollingElement.scrollTop;
      localStorage.setItem("scrollPosition", String(scroll));
    }
    router.push({
      pathname: `/product/[id]`,
      query: { id: product.id },
    });
  };

  return (
    <>
      <Container>
        <div className="productImg" onClick={goToDetail}>
          {imagepath ? (
            <BackImage 
              src={`${imagepath}`}
              alt={`${imageAlt}`}
            />
          ) : (
            <img
              src={"/static/svg/product/default_img.svg"}
              className="default-img"
              alt="기본이미지"
            />
          )}
        </div>
        <div className="productInfo">
          <div className="productInfo-top">
            <p className="productTitle" onClick={goToDetail}>
              {product.title}
            </p>
            <div className="change-completed-wrap-parent">
              {showChangeCompleted ? (
                <div className="change-completed-wrap">
                  <ShowCompletedIcon onClick={showCompletedHandler} />
                  {showCompletedBtn ? (
                    <p className="change-completed" onClick={changeCompleted}>
                      거래완료로 변경
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          <p className="productPrice">
            {makeMoneyString(String(product.price))}원
          </p>
          <div className="info-footer">
            <p className="info-footerLeft">{convertToDatetime(product.updatedAt)}</p>
            <div className="info-footerRight">
              <div className="heartDiv">
                {favoriteProduct ? (
                  <HeartIcon onClick={toggleHeartIcon} />
                ) : (
                  <BorderHeartIcon onClick={toggleHeartIcon} />
                )}
                <span>{product.like_cnt}</span>
              </div>
              <div className="chattingDiv">
                <ChattingIcon />
                <span>{product.chat_cnt}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Division />
    </>
  );
};

export default React.memo(ProductCard);
