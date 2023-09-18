import axios from "./index"

// 특정 유저 알림 정보 얻기
export const getAlarmInfo = async (userId:number,pageNumber=0) =>
  await axios.get(`/notification/list/${userId}?page=${pageNumber}`)

// 특정유저 알림 확인 
export const confirmAlarm = async (notification_id:number) =>
  await axios.post(`/notification/confirm/${notification_id}`)

// 특정유저 알림 삭제
export const deleteAlarm = async (notification_id:number) =>
  await axios.post(`/notification/delete/${notification_id}`)