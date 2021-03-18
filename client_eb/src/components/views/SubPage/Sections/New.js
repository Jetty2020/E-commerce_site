import React from 'react';
import { products } from '../../../../_datas/productsData.json';
import { Select } from 'antd';
import ProductsList from '../../../utils/ProductsList';

const New = () => {
  const { Option } = Select;

  const NEW = products.filter((product) => product.new === true);

  return (
    <div>
      <h2 style={{ margin: '70px 5px 30px' }}>New</h2>

      {/* products */}
      <ProductsList products={NEW} />
    </div>
  );
};

export default New;
