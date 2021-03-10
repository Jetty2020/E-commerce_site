import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images &&
        props.detail.images.map((item) => {
          images.push({
            original: `http://localhost:5000/${item}`,
            thumbnail: `http://localhost:5000/${item}`,
          });
        });
      setImages(images);
    }
  }, [props.detail]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {/* <ImageGallery items={Images} /> */}
      <img
        style={{
          minWidth: '100px',
          maxWidth: '500px',
          height: '500px',
        }}
        src="https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg"
      />
    </div>
  );
}

export default ProductImage;
