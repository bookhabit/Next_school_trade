import { Users } from "./user";

// 테스트타입
export type reviewListType = {
    reviewer_profileImg:string;
    reviewer_name:string;
    reviewer_content:string;
}

// 리뷰리스트 타입
export type reviewListResponseType = {
    id:number;
    review:string;
    buyer:Users;
    seller:Users;
}
