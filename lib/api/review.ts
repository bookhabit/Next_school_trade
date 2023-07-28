import axios from "./index"
import { reviewListResponseType } from "../../types/review";

// 특정회원 리뷰리스트 조회
export const GetReviewList = (userId: Number) =>
  axios.get<reviewListResponseType>(
    `/review/list/${userId}`
  );

// 특정회원 리뷰 작성하기
