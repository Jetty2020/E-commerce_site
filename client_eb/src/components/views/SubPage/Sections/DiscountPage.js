import React, { useState } from 'react';
import { products } from '../../../../_datas/productsData.json';
import ProductsList from '../../../utils/ProductsList';
import ProductsPages from '../../../utils/ProductsPages';

function DiscountPage() {
  const DISCOUNT = products.filter((product) => product.discountRate > 0);

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
      <h2 style={{ margin: '70px 20px 30px' }}>Discount</h2>

      {/* products */}
      <ProductsList products={currentProducts(DISCOUNT)} />
      <ProductsPages
        productsPerPage={productsPerPage}
        totalProducts={DISCOUNT.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
}

export default DiscountPage;
