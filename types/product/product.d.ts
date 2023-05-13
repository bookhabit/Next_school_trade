import { Users } from "../user";

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

  images: Array<ImageType>;

  latitude: number;

  like: boolean;

  like_cnt: number;

  location: string;

  longitude: number;

  owner: Users;

  price: number;

  title: string;

  buyer: Users;

  updatedAt: string;
};

type ImageType = {
  id: number;
  filename: string;

  path: string;

  fieldname: string;

  originalname: string;

  encoding: string;

  mimetype: string;

  destination: string;

  size: number;

  createdAt: Date;

  updatedAt: Date;
};

// 상품 등록 타입
export type registerProductType = {
  images: File[];

  title: string;

  price: number;

  body: string;

  category: string;

  latitude: number;

  location: string;

  longitude: number;
};

// 리액트쿼리 - infinitePage

interface Page {
  contents: productListType[];
  totalPage: number;
}

interface FavoriteProduct {
  id: number;
  content: productListType;
}

interface FavoritePage {
  favorites: FavoriteProduct[];
  totalPage: number;
}
