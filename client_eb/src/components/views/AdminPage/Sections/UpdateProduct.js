import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ImageUploader from 'react-images-upload';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Typography, Button, Form, Input, Select } from 'antd';
import { products } from '../../../../_datas/productsData.json';
import { uploadProduct } from '../../../../_actions/product_actions';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function UpdateProduct(props) {
  const dispatch = useDispatch(); //dispatch for redux
  let productId = props.match.params.productId;

  const product = () => {
    for (let product of products) {
      if (product.id == productId) {
        return product;
      }
    }
  };

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [fileData, setFileData] = useState('');
  const onFileHandler = (event) => {
    setFileData(event[0]);
  };

  return (
    <Formik
      initialValues={{
        image: product().image,
        category: product().best
          ? 'best'
          : product().new
          ? 'new'
          : product().hot
          ? 'hot'
          : 'all',
        name: product().name,
        description: product().text,
        price: product().price,
        discountRate: product().discountRate,
        stock: product().stock,
        delivery: product().delivery,
      }}
      validationSchema={Yup.object().shape({
        //검증 규칙 설정
        category: Yup.string().required('카테고리 선택은 필수입니다'),
        name: Yup.string().required('상품명 입력은 필수입니다'),
        description: Yup.string().required('상품 설명 입력은 필수입니다'),
        price: Yup.number('가격을 숫자로 입력해 주세요')
          .positive('가격을 양수로 입력해 주세요')
          .integer('가격을 정확히 입력해 주세요')
          .required('가격 입력은 필수입니다'),
        stock: Yup.number('재고 수량을 숫자로 입력해 주세요')
          .positive('재고 수량을 양수로 입력해 주세요')
          .integer('재고 수량을 정확히 입력해 주세요')
          .required('재고 수량 입력은 필수입니다'),
        discountRate: Yup.number('할인율을 숫자로 입력해 주세요')
          .positive('할인율을 양수로 입력해 주세요')
          .integer('할인율을 정확히 입력해 주세요'),
        delivery: Yup.number('배송비를 숫자로 입력해 주세요')
          .positive('배송비를 양수로 입력해 주세요')
          .integer('배송비를 정확히 입력해 주세요'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values.checkbox);
          var dataForm = new FormData();
          dataForm.append('file', fileData, fileData.name);
          dataForm.append('category', values.category);
          dataForm.append('productName', values.name);
          dataForm.append('productDes', values.description);
          dataForm.append('price', values.price);
          dataForm.append('stock', values.stock);
          dataForm.appeng('discountRate', values.dicountRate);
          dataForm.append('delivery', values.delivery);
          dispatch(uploadProduct(dataForm))
            .then((response) => {
              if (response.payload.success) {
                // props.history.push("/");
                alert('상품 정보가 수정되었습니다.');
              } else {
                setFormErrorMessage('Error occurred'); //에러 메세지 세팅
              }
            })
            .catch((err) => {
              setFormErrorMessage('Error occurred');
              setTimeout(() => {
                //일정 시간이 지난 후 함수 실행 setTimeout(실행시킬 함수, 시간)
                setFormErrorMessage('');
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
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div style={{ maxWidth: '500px', margin: '3rem auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <Title level={3}>상품 수정</Title>
            </div>
            <form
              onSubmit={handleSubmit}
              style={{ width: '500px' }}
              encType="multipart/form-data"
            >
              {/* 기등록된 이미지 */}
              <img
                src={values.image}
                alt={values.name}
                style={{ maxWidth: '200px', float: 'left', marginTop: '20px' }}
              />
              <Form.Item required>
                <ImageUploader
                  withIcon={true}
                  withPreview={true}
                  buttonText="Choose images"
                  onChange={onFileHandler}
                  imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                  maxFileSize={5242880}
                  style={{ width: '290px', float: 'right' }}
                />
              </Form.Item>
              <Form.Item label={'카테고리'} required>
                <Select onChange={handleChange} defaultValue={values.category}>
                  <Option value="all">All</Option>
                  <Option value="best">Best</Option>
                  <Option value="new">New</Option>
                  <Option value="hot">Hot</Option>
                </Select>
              </Form.Item>
              <Form.Item label={'상품명'} required>
                <Input
                  id="name"
                  placeholder="Product name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>
              <Form.Item label={'상품 설명'} required>
                <TextArea
                  id="description"
                  placeholder="Description"
                  rows={6}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.description && touched.description
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.description && touched.description && (
                  <div className="input-feedback">{errors.description}</div>
                )}
              </Form.Item>
              <Form.Item label={'판매금액(원)'} required>
                <Input
                  id="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.price && touched.price
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.price && touched.price && (
                  <div className="input-feedback">{errors.price}</div>
                )}
              </Form.Item>
              <Form.Item label={'재고수량(개)'} required>
                <Input
                  id="stock"
                  value={values.stock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.stock && touched.stock
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.stock && touched.stock && (
                  <div className="input-feedback">{errors.stock}</div>
                )}
              </Form.Item>
              <Form.Item label={'할인율(%)'}>
                <Input
                  id="discountRate"
                  value={values.discountRate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.discountRate && touched.discountRate
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.discountRate && touched.discountRate && (
                  <div className="input-feedback">{errors.discountRate}</div>
                )}
              </Form.Item>
              <Form.Item label={'배송비(원)'}>
                <Input
                  id="delivery"
                  value={values.delivery}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.delivery && touched.delivery
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.delivery && touched.delivery && (
                  <div className="input-feedback">{errors.delivery}</div>
                )}
              </Form.Item>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '30px',
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ margin: '0 2px' }}
                  disabled={isSubmitting}
                  onSubmit={handleSubmit}
                >
                  수정
                </Button>
                <Button style={{ margin: '0 2px' }}>
                  <Link to="/admin">취소</Link>
                </Button>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default UpdateProduct;
