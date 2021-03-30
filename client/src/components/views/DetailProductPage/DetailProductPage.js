import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { productDetail } from '../../../_actions/product_actions';
import styled from 'styled-components';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import ProductDetails from './Sections/ProductDetails';

const DetailContainer = styled.div`
  width: 80%;
  margin: 3rem auto 20px;
  @media only screen and (min-width: 1000px) {
    width: 60%;
    min-width: 1000px;
  }
`;
const DetailInfo = styled.div`
  display: unset;
  @media only screen and (min-width: 1000px) {
    display: flex;
    justify-content: center;
  }
`;

function DetailProductPage(props) {
  let productId = props.match.params.productId;
  const dispatch = useDispatch();
  const [productDe, setProductDe] = useState();
  let dataToSubmit = {
    productId,
  };
  useEffect(() => {
    if (!productDe) {
      dispatch(productDetail(dataToSubmit))
        .then((response) => {
          if (response.payload.success) {
            setProductDe(response.payload.product);
          } else {
            console.log(response.payload);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [productDe]);

  return (
    <DetailContainer>
      {productDe && (
        <>
          <DetailInfo>
            <ProductImage product={productDe} />
            <ProductInfo product={productDe} />
          </DetailInfo>

          <ProductDetails product={productDe} />
        </>
      )}
    </DetailContainer>
  );
}

export default DetailProductPage;
