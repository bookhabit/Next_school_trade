import React from 'react';
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import ProductList from "../../components/home/ProductList";
import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios from '../../lib/api';
import { Page } from "../../types/product/product";
import Loading from "../../components/common/Loading";
import FailFetchData from "../../components/common/FailFetchData";
import DataNull from "../../components/common/DataNull";
import { isEmpty } from "lodash";
import SkeletonLoading from "../../components/common/SkeletonLoading";
import styled from "styled-components";
import LinkFooter from '../../components/footer/LinkFooter';
import { getSearchProductList } from '../../lib/api/product';
import { GetServerSideProps } from 'next';
import FavoriteModal from '../../components/product/FavoriteModal';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

interface IProps{
    keyword:string;
}

const Container = styled.div`
  padding: 0px 20px;
  padding-top: 20px;
  padding-bottom:70px;
  .favorite-modal {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 80px !important;
  }
  @media only screen and (min-width: 430px) {
    .favorite-modal {
      left: auto;
      transform: none;
    }
  }
`;

const index = ({keyword}:IProps) => {
    const {
        data, // 💡 data.pages를 갖고 있는 배열
        fetchNextPage, // 💡 다음 페이지를 불러오는 함수
        hasNextPage, // 다음 페이지가 있는지 여부, Boolean
        status,
      } = useInfiniteQuery(
        ["searchList",keyword],
        async (pageParam) => await getSearchProductList(pageParam, keyword),
        {
          getNextPageParam: (lastPage: Page, pages: Page[]) => {
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
      console.log("searchList", data);
    
      // 무한스크롤 구현
      const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
        if (isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      };
      // 스크롤 이벤트 타겟 지정
      const { setTarget } = useIntersectionObserver({ onIntersect });

      // 관심목록 UI - 모달창 showState
        const showFavoriteModal = useSelector(
            (state: RootState) => state.favorite.showFavoriteModal
        );
    
      return (
        <>
          <Container>
            {status === "loading" && <SkeletonLoading />}
            {status === "error" && <FailFetchData />}
            {status === "success" &&
              data.pages.map((page, index) =>
                isEmpty(page.contents) ? (
                  <DataNull text="검색한 상품이 없습니다" key={index} />
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

// 서버사이드 렌더링으로 카테고리의 쿼리를 보내서 상품리스트 가져옴
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { keyword } = query;
    const queryClient = new QueryClient();
  
    try {
      await queryClient.prefetchInfiniteQuery(
        ["searchList", keyword],
        async () => {
          const res = await axios.get(
            `/content/search?page=0&keyword=${keyword}`
          );
          return res.data;
        }
      );
  
      return {
        props: {
          // infiniteQuery를 사용하거나 Promise.all을 사용할 경우 JSON처리 필수
          dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
          keyword,
        },
      };
    } catch (error) {
      return {
        notFound: true,
      };
    }
  };

export default index;