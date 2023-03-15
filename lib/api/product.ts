import axios from "axios"

// 상품 전체 조회
export const GetproductList = ()=>axios.get("http://localhost:4000/content/list")