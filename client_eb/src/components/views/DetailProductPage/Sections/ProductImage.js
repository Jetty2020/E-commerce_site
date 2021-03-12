import React from 'react';
import { products } from '../../../../_datas/productsData.json';

function ProductImage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        style={{
          // minWidth: '500px',
          maxWidth: '500px',
          height: '500px',
          objectFit: 'cover',
        }}
        src={products[0].image}
      />
    </div>
  );
}

export default ProductImage;
