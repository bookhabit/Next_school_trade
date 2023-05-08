import React, { useEffect } from "react";
import styled from "styled-components";
import ModifyProduct from "../../components/product/ModifyProduct";
import { useRouter } from "next/router";
import { productListType } from "../../types/product/product";

const Container = styled.div`
  @media only screen and (min-width: 430px) {
    min-height: 100vh;
  }
`;

const modify = () => {
  // router의 query로 상품 데이터 가져오기
  const router = useRouter();
  const queryData = router.query.productDetail;
  let initialProductData: productListType | null = null;
  if (typeof queryData === "string") {
    initialProductData = JSON.parse(queryData);
  }

  useEffect(() => {
    console.log("초기데이터 렌더링");
  }, []);

  return (
    <Container>
      <ModifyProduct
        initialProductData={
          initialProductData == null ? null : initialProductData
        }
      />
    </Container>
  );
};

export default modify;
