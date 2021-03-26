import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadProduct } from '../../../../_actions/product_actions';
import ProductsList from '../../../common/ProductsList';
import ProductsPages from '../../../common/ProductsPages';

function BestPage() {
  const dispatch = useDispatch();
  const [bestProducts, setBestProducts] = useState();
  if (!bestProducts) {
    dispatch(loadProduct('bestProduct'))
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

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const lastPage = currentPage * productsPerPage;
  const firstPage = lastPage - productsPerPage;

  const currentProducts = (items) => {
    return items.slice(firstPage, lastPage);
  };

  // 브라우저 상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div>
      <h2 style={{ margin: '70px 20px 30px' }}>Best</h2>

      {/* Best 상품 */}
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
