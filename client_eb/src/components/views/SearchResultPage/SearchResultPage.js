import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../../_actions/product_actions";
// import { products } from "../../../_datas/productsData.json";
// import { Input } from "antd";
import ProductsList from "../../utils/ProductsList";

function SearchResultPage(props) {
  const dispatch = useDispatch();
  const [SEARCH, setSEARCH] = useState();
  let searchResult = props.match.params.searchKey;
  let dataToSubmit = {
    searchKey: searchResult,
  };
  if (!SEARCH) {
    dispatch(searchProduct(dataToSubmit))
      .then((response) => {
        if (response.payload.success) {
          setSEARCH(response.payload.product);
        } else {
          console.log(response.payload);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div
      style={{
        width: "75%",
        margin: "5rem auto 0",
      }}
    >
      <h2 style={{ marginBottom: "2rem", fontWeight: "bold" }}>검색어</h2>
      <p style={{ marginRight: "5px", textAlign: "right", color: "#adb5bd" }}>
        총 10 개의 상품이 검색되었습니다.
      </p>

      {/* products */}
      {SEARCH && <ProductsList products={SEARCH} />}
    </div>
  );
}

export default SearchResultPage;
