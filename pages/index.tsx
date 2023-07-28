import {
  dehydrate,
  InfiniteData,
  QueryClient,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import axios from "../lib/api";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import LinkFooter from "../components/footer/LinkFooter";
import { GetproductList } from "../lib/api/product";
import styled from "styled-components";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import ProductList from "../components/home/ProductList";
import { Page, productListType } from "../types/product/product";
import Loading from "../components/common/Loading";
import FailFetchData from "../components/common/FailFetchData";
import DataNull from "../components/common/DataNull";
import { isEmpty } from "lodash";
import FavoriteModal from "../components/product/FavoriteModal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { cookieStringToObject } from "../lib/utils";
import SkeletonLoading from "../components/common/SkeletonLoading";

const Container = styled.div`
  padding: 0px 20px;
  padding-top: 20px;
  .favorite-modal {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 80px !important;
  }
  @media only screen and (min-width: 430px) {
    min-height: 100vh;
    .favorite-modal {
      left: auto;
      transform: none;
    }
  }
`;

const home = () => {
  const {
    data, // 💡 data.pages를 갖고 있는 배열
    fetchNextPage, // 💡 다음 페이지를 불러오는 함수
    hasNextPage, // 다음 페이지가 있는지 여부, Boolean
    status,
  } = useInfiniteQuery(["productList"], GetproductList, {
    getNextPageParam: (lastPage: Page, pages: Page[]) => {
      const lastPageNumber = Math.ceil(lastPage.totalPage / 10);
      // 이 값으로 라스트넘버값 지정
      if (pages.length < lastPageNumber) {
        return pages.length;
      } else {
        return undefined;
      }
    },
  });
  console.log("최종 infinitquery데이터", data);

  // 무한스크롤 구현
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  // 관심목록 UI - 모달창 showState
  const showFavoriteModal = useSelector(
    (state: RootState) => state.favorite.showFavoriteModal
  );

  useEffect(() => {
    // 스크롤
    const scrollRestoration = localStorage.getItem("scrollRestoration");
    if (scrollRestoration === null) {
      window.scrollTo(0, 0);
    }
    if (scrollRestoration) {
      // 스크롤 위치를 복원합니다.
      window.scrollTo(0, Number(scrollRestoration));
      setTimeout(() => {
        window.scrollTo(0, Number(scrollRestoration));
      }, 1000);

      // 변경시킨 후 로컬스토리지에 scrollRestoration 키 제거
      localStorage.removeItem("scrollRestoration");
    }
  }, []);

  return (
    <>
      <Container>
        {status === "loading" && <SkeletonLoading />}
        {status === "error" && <FailFetchData />}
        {status === "success" &&
          data.pages.map((page, index) =>
            isEmpty(page.contents) ? (
              <DataNull text="찾으시는 상품이 없습니다" key={index} />
            ) : (
              <ProductList
                key={index}
                completedProducts={false}
                data={page.contents}
                setTarget={setTarget}
              />
            )
          )}
        {showFavoriteModal ? (
          <div className="favorite-modal">
            <FavoriteModal />
          </div>
        ) : null}
      </Container>
      <LinkFooter />
    </>
  );
};

// 서버사이드 렌더링으로 상품리스트 가져옴
export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const cookieObject = cookieStringToObject(context.req?.headers.cookie);
  try {
    if(cookieObject){
      await queryClient.prefetchInfiniteQuery(["productList"], async () => {
        const res = await axios.get("/content/list", {
          headers: {
            Authorization: "Bearer " + cookieObject.access_token,
          },
        });
        return res.data;
      });
    }else{
      await queryClient.prefetchInfiniteQuery(["productList"], async () => {
        const res = await axios.get("/content/list");
        return res.data;
      });
    }
    return {
      props: {
        // infiniteQuery를 사용하거나 Promise.all을 사용할 경우 JSON처리 필수
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default home;
