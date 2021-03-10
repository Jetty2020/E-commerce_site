import React, { useState } from 'react';
import ProductsList from '../../utils/ProductsList';

function WishlistPage() {
  const imageUrl =
    'https://www.kingplastic.com/wp-content/uploads/2014/12/Charcoal-Gray-300x300.jpg';

  //example wishlist
  const [products, setProducts] = useState([
    {
      id: 1,
      image: imageUrl,
      name: `Product 1`,
      price: `00000￦`,
      likes: `234`,
      reviews: `10`,
      wishlist: true,
    },
    {
      id: 2,
      image: imageUrl,
      name: `Product 2`,
      price: `00000￦`,
      likes: `234`,
      reviews: `10`,
      wishlist: true,
    },
    {
      id: 3,
      image: imageUrl,
      name: `Product 3`,
      price: `00000￦`,
      likes: `234`,
      reviews: `10`,
      wishlist: true,
    },
    {
      id: 4,
      image: imageUrl,
      name: `Product 4`,
      price: `00000￦`,
      likes: `234`,
      reviews: `10`,
      wishlist: true,
    },
  ]);

  const onRemove = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <h2 style={{ fontWeight: 'bold' }}>위시리스트</h2>

      <ProductsList products={products} onRemove={onRemove} />
    </div>
  );
}

export default WishlistPage;
