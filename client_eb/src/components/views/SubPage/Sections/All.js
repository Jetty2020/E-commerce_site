import React from 'react';
import { products } from '../../../../_datas/productsData.json';
import ProductsList from '../../../utils/ProductsList';

const All = () => {
  const PRODUCTS = products;

  return (
    <div>
      <h2 style={{ margin: '70px 5px 30px' }}>All products</h2>

      {/* products */}
      <ProductsList products={PRODUCTS} />
    </div>
  );
};

export default All;
