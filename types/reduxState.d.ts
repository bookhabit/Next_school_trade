import { Users } from "./user";

// 유저 redux state
export type UserState = Users & {
  isLogged?: boolean;
};

// 공통 redux state
export type CommonState = {
  validateMode: boolean;
};
