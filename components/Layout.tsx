import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	@media only screen and (min-width: 430px) {
	    min-height:100vh;
    }
`

interface LayoutProps {
    children: ReactNode; // ReactNode를 사용하여 어떤 유형의 컴포넌트도 children으로 전달할 수 있도록 합니다.
  }
  

const Layout = ({ children }: LayoutProps) => {
    return <Container>{children}</Container>;
};

export default Layout;