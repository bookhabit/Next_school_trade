import React from 'react';
import LinkFooter from '../../../components/footer/LinkFooter';
import styled from 'styled-components';
import AlarmList from '../../../components/alarm/AlarmList';
import { QueryClient, dehydrate, useInfiniteQuery } from '@tanstack/react-query';
import axios from '../../../lib/api';
import { getAlarmInfo } from '../../../lib/api/alarm';
import { responseAlarmList } from '../../../types/alarm';
import { ParsedUrlQuery } from 'querystring';
import FailFetchData from '../../../components/common/FailFetchData';
import { isEmpty } from 'lodash';
import DataNull from '../../../components/common/DataNull';
import Loading from '../../../components/common/Loading';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';

const Container = styled.div`
  padding-bottom: 70px;
`
const alarm = ({userId}:{userId:string}) => {
    const {
        data, // 💡 data.pages를 갖고 있는 배열
        fetchNextPage, // 💡 다음 페이지를 불러오는 함수
        hasNextPage, // 다음 페이지가 있는지 여부, Boolean
        status,
      } = useInfiniteQuery(
        ["alarmList", userId],
        async (pageParam) => (await getAlarmInfo( userId,pageParam) as responseAlarmList),
        {
          getNextPageParam: (lastPage: responseAlarmList, pages: responseAlarmList[]) => {
            const lastPageNumber = Math.ceil(lastPage.totalPage / 10);
            // 이 값으로 라스트넘버값 지정
            if (pages.length < lastPageNumber) {
              return pages.length;
            } else {
              return undefined;
            }
          },
        }
      );
      console.log("infinitquery", data);
      console.log('hasNextPage',hasNextPage)

      // 무한스크롤 구현
      const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
        if (isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      };
      // 스크롤 이벤트 타겟 지정
      const { setTarget } = useIntersectionObserver({ onIntersect });

    

    return (
        <Container>
          {status === "loading" && <Loading />}
          {status === "error" && <FailFetchData />}
          {status === "success" &&
            data.pages.map((page, index) =>
              isEmpty(page) ? (
                <DataNull text="아직 받은 알림이 없습니다" key={index} />
              ) : 
              (
                page.notification_list.map((list,index)=>(
                  <div key={index}>
                    <AlarmList
                      key={index}
                      alarm={list}
                    />
                    <div ref={setTarget} key={index+5}></div>
                  </div>
                )))
            )}
            <LinkFooter/>
        </Container>
    );
};

alarm.getInitialProps = async ({query}:{query:ParsedUrlQuery})=>{
    const {id} = query;
    const queryClient = new QueryClient();
    try {
        await queryClient.prefetchInfiniteQuery(
          ["alarmList", id],
          async () => {
            const res = await axios.get(`/notification/list/${id}?page=${0}`)
            return res.data;
          }
        );
    
        return {
            // infiniteQuery를 사용하거나 Promise.all을 사용할 경우 JSON처리 필수
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            userId:id,
        };
      } catch (error) {
        return {
          notFound: true,
        };
      }
}

export default alarm;