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
export const getUserName = async (id: number) =>
  await axios.get(`/user/find/nickName/${id}`);

// 로그아웃 api
export const logoutAPI = () => axios.delete("/api/auth/logout");

// 유저의 위치 정보 업데이트 api
export const updateUserLocation = async (latitude:number,longitude:number,inputLocation:string) => axios.post(`/user/changeLocation`,{
  latitude: latitude,
  longitude:longitude,
  location:inputLocation
}).then((response)=>response.data)