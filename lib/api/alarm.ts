import { QueryFunctionContext } from "@tanstack/react-query"
import axios from "./index"

// 특정 유저 알림 정보 얻기
export const getAlarmInfo = async (userId: string,{ pageParam = 0 }: QueryFunctionContext) =>{
  const response = await axios.get(`/notification/list/${userId}?page=${pageParam}`)
  return response.data
}

// 메인헤더 - 유저가 확인하지 않은 알림 정보 얻기
export const getNotConfirmedAlarmInfo = async (userId:number,pageParam=0) =>
  await axios.get(`/notification/list/${userId}?page=${pageParam}`)

// 특정유저 알림 확인 
export const confirmAlarm = async (notification_id:number) =>
  await axios.post(`/notification/confirm/${notification_id}`)

// 특정유저 알림 삭제
export const deleteAlarm = async (notification_id:number) =>
  await axios.post(`/notification/delete/${notification_id}`)

// 거래성사 확인 여부 api
