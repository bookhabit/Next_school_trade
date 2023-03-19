import { Users } from "./user";

// 상품 타입
export type productListType = {
    
    body: string;
    
    category: string;
    
    chat_cnt: number;

    completed: boolean;
    
    createdAt: string;
    
    completed_date: string;
    
    deletedAt: string | null;

    id: number;

    images: Array;
    
    latitude: number;
    
    like_cnt: number;

    location: string;
    
    longitude: number;
    
    owner: Users;
    
    price: number;
    
    title: string;
  
    buyer: Users;
  
    updatedAt: string;
}