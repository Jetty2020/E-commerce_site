import React from 'react';
import { products } from '../../../_datas/productsData.json';
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import ProductDetails from './Sections/ProductDetails';

function DetailProductPage(props) {
  let productId = props.match.params.productId;

  const product = () => {
    for (let product of products) {
      if (product.id == productId) {
        return product;
      }
    }
  };

  return (
    <div
      className="postPage"
      style={{
        width: '80%',
        padding: '3rem 4rem',
        margin: '0 auto',
      }}
    >
      <Row gutter={[2, 2]}>
        <Col lg={12} xs={24} style={{ width: '60%' }}>
          <ProductImage detail={product()} />
        </Col>
        <Col lg={12} xs={24} style={{ maxWidth: '40%' }}>
          <ProductInfo detail={product()} />
        </Col>
      </Row>

      <ProductDetails detail={product()} />
    </div>
  );
}

export default DetailProductPage;
