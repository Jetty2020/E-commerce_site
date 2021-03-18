import React from 'react';
import { products } from '../../../../_datas/productsData.json';
import { Select } from 'antd';
import ProductsList from '../../../utils/ProductsList';

const Best = () => {
  const { Option } = Select;

  const BEST = products.filter((product) => product.best === true);

  return (
    <div>
      <h2 style={{ margin: '70px 5px 30px' }}>Best</h2>

      {/* products */}
      <ProductsList products={BEST} />
    </div>
  );
};

export default Best;
