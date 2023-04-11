import React from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import ChattingList from '../../../components/chattingList/ChattingList';
import styled from 'styled-components';

const Container = styled.div`
    @media only screen and (min-width: 430px) {
	    min-height:100vh;
    }
`

const chattingList = () => {
        // 사용자의 정보를 불러와서 채팅목록 개수에 맞게 리스트를 map함수를 불러준다
        const testChattingListCount = [
            {
                id:1,
                name:"김상원",
                profileImage:"/static/svg/myPage/userProfileIcon.svg",
                content:"대정문으로 와주실 수 있나요?",
                chattingDate:"1일 전"
            },
            {
                id:2,
                name:"차민재",
                profileImage:"/static/svg/myPage/userProfileIcon.svg",
                content:"25000원 가능한가요?",
                chattingDate:"2일 전",
            },
            {
                id:3,
                name:"박태웅",
                profileImage:"/static/svg/myPage/userProfileIcon.svg",
                content:"네 거기서 봅시다~",
                chattingDate:"3일 전"
            },
            {
                id:4,
                name:"신동민",
                profileImage:"/static/svg/myPage/userProfileIcon.svg",
                content:"네 맞습니다.",
                chattingDate:"1주 전"
            },
            {
                id:5,
                name:"조윤재",
                profileImage:"/static/svg/myPage/userProfileIcon.svg",
                content:"감사합니다.",
                chattingDate:"1개월 전"
    
            }
    ]
    return (
        <Container>
            {testChattingListCount.map((chatting)=>(
                <ChattingList chatting={chatting} key={chatting.id}/>
            ))}
            <LinkFooter/>
        </Container>
    );
};

export default chattingList;