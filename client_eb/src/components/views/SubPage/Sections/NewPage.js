import React, { useState } from 'react';
import { products } from '../../../../_datas/productsData.json';
import ProductsList from '../../../utils/ProductsList';
import ProductsPages from '../../../utils/ProductsPages';

function NewPage() {
  const NEW = products.filter((product) => product.new === true);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const lastPage = currentPage * productsPerPage;
  const firstPage = lastPage - productsPerPage;

  const currentProducts = (items) => {
    return items.slice(firstPage, lastPage);
  };

  return (
    <div>
      <h2 style={{ margin: '70px 20px 30px' }}>New</h2>

      {/* products */}
      <ProductsList products={currentProducts(NEW)} />
      <ProductsPages
        productsPerPage={productsPerPage}
        totalProducts={NEW.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
}

export default NewPage;
