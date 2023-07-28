import axios from "./index"

// 쿠키의 access_token의 유저 정보를 받아오는 api
export const meAPI = async () =>
  await axios
    .post("/user/islogin", {})
    .then((res) => res?.data);

// 토큰을 직접 전달해서 유저 정보 조회 api
export const getUserInfo = async (token: string) =>
  await axios.post(
    "/user/islogin",
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

// 특정 유저 닉네임 조회 api
export const getSellerName = async (id: number) =>
  await axios.get(`/user/find/nickName/${id}`);

// 로그아웃 api
export const logoutAPI = () => axios.delete("/api/auth/logout");
