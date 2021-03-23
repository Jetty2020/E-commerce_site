import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { loadProduct } from "../../../../_actions/product_actions";
import ProductsList from '../../../utils/ProductsList';
import ProductsPages from '../../../utils/ProductsPages';

function BestPage() {
  // const BEST = products.filter((product) => product.best === true);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const lastPage = currentPage * productsPerPage;
  const firstPage = lastPage - productsPerPage;

  const currentProducts = (items) => {
    return items.slice(firstPage, lastPage);
  };

  const dispatch = useDispatch();
  const [bestProducts, setBestProducts] = useState();
  if (!bestProducts) {
    dispatch(loadProduct("bestProduct"))
      .then((response) => {
        if (response.payload.success) {
          setBestProducts(response.payload.product);
        } else {
          console.log(response.payload);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <h2 style={{ margin: '70px 20px 30px' }}>Best</h2>

      {/* products */}
      {bestProducts && (
        <div>
          <ProductsList products={currentProducts(bestProducts)} />
          <ProductsPages
            productsPerPage={productsPerPage}
            totalProducts={bestProducts.length}
            currentPage={currentPage}
            paginate={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

export default BestPage;
