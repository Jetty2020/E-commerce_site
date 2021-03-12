import React from 'react';
import { products } from '../../../../_datas/productsData.json';
import { Select } from 'antd';
import ProductsList from '../../../utils/ProductsList';

const New = () => {
  const { Option } = Select;

  const NEW = products.filter((product) => product.new === true);

  return (
    <div>
      <h2 style={{ margin: '70px 5px 30px' }}>New</h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '20px 5px',
        }}
      >
        <Select defaultValue="recommendation_order" style={{ width: '150px' }}>
          <Option value="recommendation_order">추천순</Option>
          <Option value="new_product_order">신상품순</Option>
          <Option value="low_price_order">낮은가격순</Option>
          <Option value="high_price_order">높은가격순</Option>
          <Option value="best_likes_order">베스트하트순</Option>
          <Option value="best_review_order">베스트리뷰순</Option>
        </Select>
      </div>

      {/* products */}
      <ProductsList products={NEW} />
    </div>
  );
};

export default New;
