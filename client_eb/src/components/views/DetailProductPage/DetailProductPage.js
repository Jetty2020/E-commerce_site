import React, { useState } from "react";
// import { products } from '../../../_datas/productsData.json';
import { useDispatch } from "react-redux";
import { productDetail } from "../../../_actions/product_actions";
import { Row, Col } from "antd";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import ProductDetails from "./Sections/ProductDetails";

function DetailProductPage(props) {
  let productId = props.match.params.productId;

  // const product = () => {
  //   for (let product of products) {
  //     if (product.id === productId) {
  //       return product;
  //     }
  //   }
  // };
  const dispatch = useDispatch();
  const [productDe, setProductDe] = useState();
  let dataToSubmit = {
    productId,
  };
  if (!productDe) {
    dispatch(productDetail(dataToSubmit))
      .then((response) => {
        if (response.payload.success) {
          setProductDe(response.payload.product);
        } else {
          console.log(response.payload);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      {productDe && (
        <div
          className="postPage"
          style={{
            width: "80%",
            padding: "3rem 4rem",
            margin: "0 auto",
          }}
        >
          <Row gutter={[2, 2]}>
            <Col lg={12} xs={24} style={{ width: "60%" }}>
              <ProductImage product={productDe} />
            </Col>
            <Col lg={12} xs={24} style={{ maxWidth: "40%" }}>
              <ProductInfo product={productDe} />
            </Col>
          </Row>

          <ProductDetails product={productDe} />
        </div>
      )}
    </>
  );
}

export default DetailProductPage;
