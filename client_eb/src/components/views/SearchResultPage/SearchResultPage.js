import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProduct } from '../../../_actions/product_actions';
// import { products } from "../../../_datas/productsData.json";
// import { Input } from "antd";
import ProductsList from '../../utils/ProductsList';

function SearchResultPage(props) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  let searchKey = props.match.params.searchKey;
  const [keyword, setKeyword] = useState('');
  let dataToSubmit = {
    searchKey,
  };
  if (!search || keyword !== searchKey) {
    dispatch(searchProduct(dataToSubmit))
      .then((response) => {
        if (response.payload.success) {
          setKeyword(searchKey);
          setSearch(response.payload.product);
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
        width: '75%',
        margin: '5rem auto 0',
      }}
    >
      <h2 style={{ marginBottom: '2rem', fontWeight: 'bold' }}>
        '{searchKey}'에 대한 검색 결과
      </h2>
      {search ? (
        <>
          <p
            style={{ marginRight: '5px', textAlign: 'right', color: '#adb5bd' }}
          >
            총 10 개의 상품이 검색되었습니다.
          </p>

          {/* products */}
          {search && <ProductsList products={search} />}
        </>
      ) : (
        <p style={{ marginTop: '100px', textAlign: 'center' }}>
          검색 결과가 없습니다. <br />
          검색어를 다시 확인해 주세요.
        </p>
      )}
    </div>
  );
}

export default SearchResultPage;
