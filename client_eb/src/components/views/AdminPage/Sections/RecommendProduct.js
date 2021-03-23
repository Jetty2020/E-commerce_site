import React from 'react';
import { Checkbox } from 'antd';

function RecommendProduct({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li style={{ padding: '10px 0' }}>
          <Checkbox checked={product.recoProduct ? true : false} />{' '}
          <img
            src={product.mainImg}
            alt="mainImg"
            style={{ width: '50px', height: '50px', margin: '0 10px' }}
          />{' '}
          <span style={{ fontWeight: 'bold' }}>{product.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default RecommendProduct;
