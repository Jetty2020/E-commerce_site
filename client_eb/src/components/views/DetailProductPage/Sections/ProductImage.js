import React from 'react';

function ProductImage(props) {
  console.log(props.product)
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        style={{
          width: '100%',
          maxWidth: '500px',
          height: '500px',
          objectFit: 'cover',
        }}
        src={props.product.mainImg}
        alt='mainImg'
      />
    </div>
  );
}

export default ProductImage;
