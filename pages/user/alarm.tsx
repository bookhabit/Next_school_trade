import React from 'react';
import LinkFooter from '../../components/footer/LinkFooter';
import AlarmList from './../../components/alarm/AlarmList';
import styled from 'styled-components';

const Container = styled.div`
    min-height:100vh;
`
const alarm = () => {
    // 사용자의 정보를 불러와서 알림내용 개수에 맞게 리스트를 map함수를 불러준다
    const testAlarmListCount = [
        {
            id:1,
            content:"축구화 살사람?? - 게시글의 거래가 완료되었습니다.",
            alarmDate:"1일 전"
        },
        {
            id:2,
            content:"김상원 님이 채팅을 신청했습니다.",
            alarmDate:"2일 전",
        },
        {
            id:3,
            content:"운영체제 책 살 사람~? - 게시글의 거래가 완료되었습니다.",
            alarmDate:"3일 전"
        },
        {
            id:4,
            content:"사용자 님의 거래후기가 작성되었습니다.",
            alarmDate:"1주 전"
        },
        {
            id:5,
            content:"박태웅 님이 채팅을 신청했습니다.",
            alarmDate:"1개월 전"

        }
]

    return (
        <Container>
            {testAlarmListCount.map((alarm)=>(
                <AlarmList alarm={alarm} key={alarm.id}/>
            ))}
            <LinkFooter/>
        </Container>
    );
};

export default alarm;