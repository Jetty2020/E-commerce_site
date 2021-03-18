import React from 'react';
import { products } from '../../../../_datas/productsData.json';
import { Select } from 'antd';
import ProductsList from '../../../utils/ProductsList';

const Hot = () => {
  const { Option } = Select;

  const HOT = products.filter((product) => product.hot === true);
  console.log(HOT);

  return (
    <div>
      <h2 style={{ margin: '70px 5px 30px' }}>Hot</h2>

      {/* products */}
      <ProductsList products={HOT} />
    </div>
  );
};

export default Hot;
