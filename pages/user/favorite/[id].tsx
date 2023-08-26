import { GetServerSideProps } from "next";
import React from "react";
import LinkFooter from "../../../components/footer/LinkFooter";
import { getFavoriteList } from "../../../lib/api/product";
import { useSelector } from "react-redux";
import axios from "../../../lib/api";
import {
  FavoritePage,
  Page,
  productListType,
} from "../../../types/product/product";
import styled from "styled-components";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import ProductList from "../../../components/home/ProductList";
import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import ProductCard from "../../../components/common/ProductCard";
import DataNull from "../../../components/common/DataNull";
import Loading from "../../../components/common/Loading";
import FailFetchData from "../../../components/common/FailFetchData";
import { isEmpty } from "lodash";
import { cookieStringToObject } from "../../../lib/utils";

const Container = styled.div`
  @media only screen and (min-width: 430px) {
    min-height: 100vh;
  }
  padding: 0px 20px;
  padding-top: 20px;
  padding-bottom:70px;
`;

const favorite = ({ id }: { id: number }) => {
  const { data, fetchNextPage, hasNextPage, status, isLoading, isFetching } =
    useInfiniteQuery(
      ["favoriteList"],
      async (pageParam) =>
        (await getFavoriteList(pageParam, id)) as FavoritePage,
      {
        // 위의 fetch callback의 인자로 자동으로 pageParam을 전달.
        getNextPageParam: (lastPage: FavoritePage, pages: FavoritePage[]) => {
          const lastPageNumber = Math.ceil(lastPage.totalPage / 10);
          // 이 값으로 라스트넘버값 지정
          if (pages.length < lastPageNumber) {
            return pages.length;
          } else {
            return undefined;
          }
        },
      }
    );
  console.log("infinitquery", data);
  // return favoriteList

  // 무한스크롤 구현
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };
  // 스크롤 이벤트 타겟 지정
  const { setTarget } = useIntersectionObserver({ onIntersect });
  return (
    <>
      <Container>
        {isLoading && isFetching && <Loading />}
        {status === "error" && <FailFetchData />}
        {status === "success" &&
          data.pages.map((page, index) =>
            isEmpty(page.favorites) ? (
              <DataNull text="추가하신 관심목록이 없습니다" key={index} />
            ) : (
              page.favorites.map((content, id) => (
                <>
                  <ProductCard key={id} product={content.content} />
                  <div ref={setTarget}></div>
                </>
              ))
            )
          )}
      </Container>
      <LinkFooter />
    </>
  );
};

// 서버사이드 렌더링으로 favoriteList 가져옴
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  const cookieObject = cookieStringToObject(context.req?.headers.cookie);
  try {
    await queryClient.prefetchInfiniteQuery(["favoriteList"], async () => {
      const res = await axios.get(`/favorite/${id}`, {
        headers: {
          Authorization: "Bearer " + cookieObject.access_token,
        },
      });
      console.log("res.data", res.data);
      return res.data;
    });
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        id,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};

export default favorite;
