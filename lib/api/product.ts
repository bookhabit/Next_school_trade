import axios from "axios"
import { QueryFunctionContext } from '@tanstack/react-query';
import { productListType } from "../../types/product/product";
import { AxiosResponse } from 'axios'



// 상품 전체 조회 - home 페이지
export const GetproductList = ({pageParam=0}:QueryFunctionContext)=>axios.get(`http://localhost:4000/content/list?page=${pageParam}`).then(res=>res?.data)


// 특정 회원 관심목록 - user/favorite 페이지
export const getFavoriteList = (id:number)=>axios.get(`http://localhost:4000/favorite/${id}`)


// 특정 회원 판매 중 조회 - user/sellList 페이지
export const getSellingList = (id:number)=>axios.get(`http://localhost:4000/content/list/user/selling/${id}`)


// 특정 회원 판매 완료 조회 - user/sellList 페이지
export const getSoldList = (id:number)=>axios.get(`http://localhost:4000/content/list/user/sold/${id}`)

// 상품 상세 조회 
export const getProductDetail = (id:number)=>axios.get(`http://localhost:4000/content/read/${id}`)

// 카테고리 상품 조회
export const getCategoryProductList = ({pageParam=0}:QueryFunctionContext,name:string)=>axios.get(`http://localhost:4000/content/list/category`,{params: {category: name,page:pageParam}}).then(res=>res?.data)