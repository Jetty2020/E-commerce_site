import React, { useState } from "react";
import { Typography, Button, Form, Input, Select } from "antd";
// import FileUpload from '../../../utils/FileUpload';
// import Axios from "axios";
import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";
import { uploadProduct } from "../../../../_actions/product_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import ImageUploader from "react-images-upload";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function UploadProduct(props) {
  const dispatch = useDispatch(); //dispatch for redux

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [fileData, setFileData] = useState("");
  const onFileHandler = (event) => {
    setFileData(event[0]);
  };
  return (
    <Formik
      initialValues={{
        //초기값
        name: "",
        description: "",
        price: "",
        rate: "",
        stock: "",
        delivery: "",
      }}
      validationSchema={Yup.object().shape({
        //검증 규칙 설정
        name: Yup.string()
          .required("Product name is required"),
        description: Yup.string()
          .required("Description is required"),
        price: Yup.number("Price is number.")
          .positive("Price is positive number.")
          .integer("Price is integer")
          .required("Price is required"),
        rate: Yup.number("Rate is number.")
          .positive("Rate is positive number.")
          .integer("Rate is integer"),
        stock: Yup.number("Stock is number.")
          .positive("Stock is positive number.")
          .integer("Stock is integer"),
        delivery: Yup.number("Delivery is number.")
          .positive("Delivery is positive number.")
          .integer("Delivery is integer"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          var dataForm = new FormData();
          dataForm.append("file", fileData, fileData.name);
          dataForm.append("productName", values.name);
          dataForm.append("productDes", values.description);
          dataForm.append("price", values.price);
          dataForm.append("rate", values.rate);
          dataForm.append("stock", values.stock);
          dataForm.append("delivery", values.delivery);
          dispatch(uploadProduct(dataForm))
            .then((response) => {
              if (response.payload.success) {
                props.history.push("/");
              } else {
                setFormErrorMessage("Error occurred"); //에러 메세지 세팅
              }
            })
            .catch((err) => {
              setFormErrorMessage("Error occurred");
              setTimeout(() => {
                //일정 시간이 지난 후 함수 실행 setTimeout(실행시킬 함수, 시간)
                setFormErrorMessage("");
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          // dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          // handleReset,
        } = props;
        return (
          <div style={{ maxWidth: "700px", margin: "3rem auto" }}>
            <div style={{ marginBottom: "2rem" }}>
              <Title level={3}>상품 등록</Title>
            </div>

            {/* <Form onSubmit={onSubmit}> */}
            {/* DropZone */}
            {/* <FileUpload refreshFunction={updateImages} /> */}
            <form
              onSubmit={handleSubmit}
              style={{ width: "350px" }}
              encType="multipart/form-data"
            >
              <Form.Item required>
                <ImageUploader
                  withIcon={true}
                  withPreview={true}
                  buttonText="Choose images"
                  onChange={onFileHandler}
                  imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                  maxFileSize={5242880}
                />
              </Form.Item>
              {/* <br /> */}
              {/* <br /> */}
              {/* <br /> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "150px",
                }}
              >
                <Select defaultValue={"all"}>
                  <Option value="all">All</Option>
                  <Option value="best">Best</Option>
                  <Option value="new">New</Option>
                  <Option value="discount">Discount</Option>
                </Select>
              </div>
              {/* <br /> */}
              <Form.Item label={"상품명"} required>
                {/* <label>상품명</label> */}
                <Input 
                  id="name"
                  placeholder="Product name"
                  value={values.name} 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>
              {/* <br /> */}
              {/* <br /> */}
              {/* <label>상품 설명</label> */}
              <Form.Item label={"상품 설명"} required>
              <TextArea
                id="description"
                placeholder="Description"
                // type="description"
                rows={6}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.description && touched.description
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.description && touched.description && (
                <div className="input-feedback">{errors.description}</div>
              )}
              </Form.Item>
              {/* <br /> */}
              {/* <br /> */}
              <Form.Item label={"판매금액(원)"} required>
              {/* <label>판매금액(원)</label> */}
              <Input
                id="price"
                // placeholder="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                // type="number"
                className={
                  errors.price && touched.price
                    ? "text-input error"
                    : "text-input"
                }
              />
              </Form.Item>
              {/* <br /> */}
              {/* <br /> */}
              <Form.Item label={"할인율(%)"} required>
              {/* <label>할인율(%)</label> */}
              <Input
                id="rate"
                value={values.rate}
                onChange={handleChange}
                onBlur={handleBlur}
                // type="number"
                className={
                  errors.rate && touched.rate
                    ? "text-input error"
                    : "text-input"
                }
              />
              </Form.Item>
              {/* <br /> */}
              {/* <br /> */}
              <Form.Item label={"재고수량(개)"} required>
              {/* <label>재고수량(개)</label> */}
              <Input
                id="stock"
                value={values.stock}
                onChange={handleChange}
                onBlur={handleBlur}
                // type="number"
                className={
                  errors.stock && touched.stock
                    ? "text-input error"
                    : "text-input"
                }
              />
              </Form.Item>
              {/* <br /> */}
              {/* <br /> */}
              {/* <label>
                배송비(원){" "}
                <span style={{ color: "#adb5bd" }}>
                  무료일 경우 0으로 입력해 주세요.
                </span>
              </label> */}
              <Form.Item label={"배송비(원)"} required>
              <Input
                id="delivery"
                placeholder={"무료일 경우 0으로 입력해 주세요."}
                value={values.delivery}
                onChange={handleChange}
                onBlur={handleBlur}
                // type="number"
                className={
                  errors.delivery && touched.delivery
                    ? "text-input error"
                    : "text-input"
                }
              />
              </Form.Item>
              {/* <br /> */}
              {/* <br /> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ margin: "0 2px" }}
                  disabled={isSubmitting}
                  onSubmit={handleSubmit}
                >
                  등록
                </Button>
                <Button style={{ margin: "0 2px" }}>
                  <Link to="/admin">취소</Link>
                </Button>
              </div>
              {/* </Form> */}
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default UploadProduct;
