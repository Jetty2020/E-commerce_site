import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  width: 80%;
  margin: 0 auto;

  @media only screen and (min-width: 600px) {
    width: 500px;
  }
`;

function ProductImage(props) {
  return (
    <ImageContainer>
      <img width="100%" src={props.product.mainImg} alt="mainImg" />
    </ImageContainer>
  );
}

export default ProductImage;
