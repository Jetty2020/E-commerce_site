import React from 'react';
import { Checkbox } from 'antd';

function RecommendProduct({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li style={{ margin: '8px 0' }}>
          <Checkbox checked={product.recommend ? true : false} />{' '}
          <img
            src={product.image}
            alt="image"
            style={{ width: '50px', height: '50px', margin: '0 10px' }}
          />{' '}
          <span style={{ fontWeight: 'bold' }}>{product.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default RecommendProduct;
