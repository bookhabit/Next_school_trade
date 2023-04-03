import axios from "axios"
import { reviewListResponseType } from "../../types/review"

// 특정회원 리뷰리스트 조회 
export const GetReviewList = (userId:Number)=>axios.get<reviewListResponseType>(`http://localhost:4000/review/list/${userId}`)