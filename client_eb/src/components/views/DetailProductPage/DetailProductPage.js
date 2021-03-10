import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import ProductDetails from './Sections/ProductDetails';

function DetailProductPage(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then(
      (response) => {
        setProduct(response.data[0]);
      },
    );
  }, []);

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId));
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
          <ProductImage detail={Product} />
        </Col>
        <Col lg={12} xs={24} style={{ width: '40%' }}>
          <ProductInfo addToCart={addToCartHandler} detail={Product} />
        </Col>
      </Row>

      <ProductDetails />
    </div>
  );
}

export default DetailProductPage;
