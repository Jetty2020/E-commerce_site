import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Typography, Button, Form, Input, Select } from 'antd';
import { products } from '../../../../_datas/productsData.json';
import { uploadProduct } from '../../../../_actions/product_actions';

const { Title } = Typography;
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
        category: product().best ? 'best' : product().new ? 'new' : 'all',
        name: product().name,
        price: product().price,
        discountRate: product().discountRate,
      }}
      validationSchema={Yup.object().shape({
        //검증 규칙 설정
        category: Yup.string().required('카테고리 선택은 필수입니다'),
        discountRate: Yup.number('할인율을 숫자로 입력해 주세요')
          .positive('할인율을 양수로 입력해 주세요')
          .integer('할인율을 정확히 입력해 주세요'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values.checkbox);
          var dataForm = new FormData();
          dataForm.append('category', values.category);
          dataForm.appeng('discountRate', values.dicountRate);
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
                style={{ width: '400px', marginTop: '20px' }}
              />
              <Form.Item label={'상품명'} required>
                <Input
                  id="name"
                  disabled={true}
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
              <Form.Item label={'판매금액(원)'} required>
                <Input
                  id="price"
                  disabled={true}
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
              <Form.Item label={'카테고리'} required>
                <Select onChange={handleChange} defaultValue={values.category}>
                  <Option value="all">All</Option>
                  <Option value="best">Best</Option>
                  <Option value="new">New</Option>
                </Select>
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
