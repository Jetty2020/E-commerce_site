import React from 'react';

function ProductImage(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        style={{
          width: '100%',
          maxWidth: '500px',
          height: '500px',
          objectFit: 'cover',
        }}
        src={props.detail.image}
      />
    </div>
  );
}

export default ProductImage;
