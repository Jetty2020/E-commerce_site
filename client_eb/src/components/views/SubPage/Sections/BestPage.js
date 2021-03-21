import React, { useState } from 'react';
import { products } from '../../../../_datas/productsData.json';
import ProductsList from '../../../utils/ProductsList';
import ProductsPages from '../../../utils/ProductsPages';

function BestPage() {
  const BEST = products.filter((product) => product.best === true);

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
      <h2 style={{ margin: '70px 20px 30px' }}>Best</h2>

      {/* products */}
      <ProductsList products={currentProducts(BEST)} />
      <ProductsPages
        productsPerPage={productsPerPage}
        totalProducts={BEST.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
}

export default BestPage;
