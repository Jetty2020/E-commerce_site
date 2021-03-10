import React from 'react';
import { Select } from 'antd';
import ProductsList from '../../../utils/ProductsList';

const New = () => {
  const { Option } = Select;

  //example new products
  const products = [];
  const createProducts = () => {
    for (let i = 1; i <= 20; i++) {
      products.push({
        id: i,
        image: `https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg`,
        name: `New Product ${i}`,
        price: 30000,
        likes: 234,
        reviews: 10,
      });
    }
    return products;
  };
  createProducts();

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
      <ProductsList products={products} />
    </div>
  );
};

export default New;
