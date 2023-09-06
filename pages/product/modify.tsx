import React, { useEffect } from "react";
import styled from "styled-components";
import ModifyProduct from "../../components/product/ModifyProduct";
import { useRouter } from "next/router";
import { productListType } from "../../types/product/product";

const Container = styled.div`
`;

interface Props {
  initialProductData: productListType;
}

const modify = ({ initialProductData }: Props) => {
  console.log("initialProductData 서버사이드", initialProductData);
  return (
    <Container>
      <ModifyProduct initialProductData={initialProductData} />
    </Container>
  );
};

modify.getInitialProps = async ({ query }: any) => {
  // router의 query로 상품 데이터 가져오기
  const queryData = query.productDetail;
  console.log('queryData',queryData)
  let initialProductData: productListType;
  if (typeof queryData === "string") {
    initialProductData = JSON.parse(queryData);
    return { initialProductData };
  }
  return {};
};

export default modify;
