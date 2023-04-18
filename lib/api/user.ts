import axios from "axios"

// 쿠키의 access_token의 유저 정보를 받아오는 api
export const meAPI = async ()=> await axios.post("http://localhost:4000/user/islogin",{},{withCredentials: true,}).then(res=>res?.data)


// 특정 유저 닉네임 조회 api
export const getSellerName = async (id:number)=> await axios.get(`http://localhost:4000/user/find/nickName/${id}`)