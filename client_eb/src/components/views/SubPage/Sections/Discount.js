import React from 'react';
import { products } from '../../../../_datas/productsData.json';
import ProductsList from '../../../utils/ProductsList';

const Discount = () => {
  const DISCOUNT = products.filter((product) => product.discountRate > 0);

  return (
    <div>
      <h2 style={{ margin: '70px 5px 30px' }}>Discount</h2>

      {/* products */}
      <ProductsList products={DISCOUNT} />
    </div>
  );
};

export default Discount;
