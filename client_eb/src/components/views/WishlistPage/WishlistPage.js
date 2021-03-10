import React from 'react';
import ProductsList from '../../utils/ProductsList';
import { products } from '../../../_datas/productsData.json';

function WishlistPage() {
  const WISHLIST = products.slice(20, 25);
  // console.log(WISHLIST);
  const onRemove = (id) => {
    products.filter((product) => product.id !== id);
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <h2 style={{ fontWeight: 'bold' }}>위시리스트</h2>

      <ProductsList products={WISHLIST} onRemove={() => onRemove()} />
    </div>
  );
}

export default WishlistPage;
