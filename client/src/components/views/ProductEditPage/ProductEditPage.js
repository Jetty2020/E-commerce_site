import React from 'react';
import { Select } from 'antd';
import { 
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import CreateProducts from '../../utils/CreateProducts';

function SubPage() {
  const { Option } = Select;

  // 베스트 상품 목록
  const products = [];
  const createProducts = () => {
    for (let i = 1; i <= 20; i++) {
      products.push({
        id: i,
        image: `https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg`,
        name: `Best Product${i}`,
        price: `00000￦`,
        likes: `234`,
        reviews: `10`,
      });
    }
    return products;
  };
  createProducts();

  const pages = [];
  const createPages = () => {
    for (let i = 1; i <= 5; i++) {
      pages.push({
        id: i,
      });
    }
    return pages;
  };
  createPages();

  return (
    <div
      style={{
        width: '80%',
        margin: '0 auto',
        marginTop: '-6px',
      }}
    >
      <h2 style={{ margin: '50px 5px 30px' }}>Best</h2>

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

      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <CreateProducts products={products} />
      </ul>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '70px 0',
        }}
      >
         <a
          href="/"
          style={{
            color: '#495057',
            fontSize: '1rem',
            marginBottom: '12px',
            marginLeft: '8px',
          }}
        >
          <LeftOutlined  />
        </a>
        <ul style={{ display: 'flex' }}>
          {pages.map((page) => (
            <li style={{ margin: '0 10px' }}>
              <a
                href="/"
                style={{
                  color: '#495057',
                  fontSize: '1.05rem',
                  padding: '3px',
                }}
              >
                {page.id}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/"
          style={{
            color: '#495057',
            fontSize: '1rem',
            marginBottom: '12px',
            marginLeft: '8px',
          }}
        >
          <RightOutlined  />
        </a>
      </div>
    </div>
  );
}

export default SubPage;
