import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadProduct } from "../../../../_actions/product_actions";
import ProductsList from "../../../utils/ProductsList";
import ProductsPages from "../../../utils/ProductsPages";

function NewPage() {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const lastPage = currentPage * productsPerPage;
  const firstPage = lastPage - productsPerPage;

  const currentProducts = (items) => {
    return items.slice(firstPage, lastPage);
  };

  const dispatch = useDispatch();
  const [newProducts, setNewProducts] = useState();
  if (!newProducts) {
    dispatch(loadProduct("newProduct"))
      .then((response) => {
        if (response.payload.success) {
          setNewProducts(response.payload.product);
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
      <h2 style={{ margin: "70px 20px 30px" }}>New</h2>

      {/* products */}
      {newProducts && (
        <div>
          <ProductsList products={currentProducts(newProducts)} />
          <ProductsPages
            productsPerPage={productsPerPage}
            totalProducts={newProducts.length}
            currentPage={currentPage}
            paginate={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

export default NewPage;
