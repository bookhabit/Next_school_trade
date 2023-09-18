import { Users } from "./user";

type Notificaitions = {
  id: number;

  // 알림 타입
  type: number;

  // 알림 내용
  msg: string;

  // 알림 확인 여부
  confirmed: boolean;

  // 알림 발생자(?)
  notifier: Users;

  // 수신자
  receiver: Users;
}

type responseAlarmList = {
  currentPage:number;
  notification_list:Notificaitions[];
  totalPage:number;
}
