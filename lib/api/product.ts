import axios from "./index"
import { QueryFunctionContext } from "@tanstack/react-query";

// 상품 전체 조회 - home 페이지
export const GetproductList = ({ pageParam = 0 }: QueryFunctionContext) =>
  axios
    .get(`/content/list?page=${pageParam}`)
    .then((res) => res?.data);

// 특정 회원 관심목록 - user/favorite 페이지
export const getFavoriteList = (
  { pageParam = 0 }: QueryFunctionContext,
  id: number
) =>
  axios
    .get(`/favorite/${id}?page=${pageParam}`)
    .then((res) => res?.data);

// 특정 회원 구매내역 - user/buyList 페이지
export const getBuyList = (
  { pageParam = 0 }: QueryFunctionContext,
  id: number
) =>
  axios
    .get(
      `/content/list/bought/${id}?page=${pageParam}`,
      {},
    )
    .then((res) => res?.data);

// 특정 회원 판매 중 조회 - user/sellList 페이지
export const getSellingList = (
  { pageParam = 0 }: QueryFunctionContext,
  id: number
) =>
  axios
    .get(
      `/content/list/user/selling/${id}?page=${pageParam}`
    )
    .then((res) => res?.data);

// 특정 회원 판매 완료 조회 - user/sellList 페이지
export const getSoldList = (
  { pageParam = 0 }: QueryFunctionContext,
  id: number
) =>
  axios
    .get(`/content/list/user/sold/${id}?page=${pageParam}`)
    .then((res) => res?.data);

// 상품 상세 조회
export const getProductDetail = (id: number) =>
  axios.get(`/content/read/${id}`);

// 카테고리 상품 조회
export const getCategoryProductList = (
  { pageParam = 0 }: QueryFunctionContext,
  name: string
) =>
  axios
    .get(`/content/list/category`, {
      params: { category: name, page: pageParam },
    })
    .then((res) => res?.data);

// 특정 유저 관심목록 추가
export const addFavorite = async (contentId: number) => {
  await axios.post(
    `/favorite/add/${contentId}`,
    {},
  );
};

// 특정 유저 관심목록 제거
export const deleteFavorite = async (contentId: number) => {
  await axios.post(
    `/favorite/delete/${contentId}`,
    {},
  );
};

// 특정상품 거래완료로 변경
export const changeCompletedAPI = async (contentId: number) => {
  await axios.post(
    `/content/complete/${contentId}`,
    {},
  );
};

// 상품 삭제
export const deleteProductAPI = async (contentId: number) => {
  await axios.delete(`/content/delete/${contentId}`);
};

// 상품검색
export const getSearchProductList = (
  { pageParam = 0 }: QueryFunctionContext,
  keyword: string
) =>
  axios
    .get(`/content/search?page=${pageParam}&keyword=${keyword}`).then((res) => res?.data);