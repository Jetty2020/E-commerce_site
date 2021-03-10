import React from 'react';
import { Input } from 'antd';
import ProductsList from '../../utils/ProductsList';

function SearchResultPage() {
  //example products
  const products = [];
  const createProducts = () => {
    for (let i = 1; i <= 10; i++) {
      products.push({
        id: i,
        image: `https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg`,
        name: `Product ${i}`,
        price: 30000,
        likes: 234,
        reviews: 10,
      });
    }
    return products;
  };
  createProducts();

  return (
    <div
      style={{
        width: '75%',
        margin: '5rem auto 0',
      }}
    >
      <h2 style={{ marginBottom: '2rem', fontWeight: 'bold' }}>검색어</h2>
      <p style={{ marginRight: '5px', textAlign: 'right', color: '#adb5bd' }}>
        총 10 개의 상품이 검색되었습니다.
      </p>

      {/* products */}
      <ProductsList products={products} />
    </div>
  );
}

export default SearchResultPage;
