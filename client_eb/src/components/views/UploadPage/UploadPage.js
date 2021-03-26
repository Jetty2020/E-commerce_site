import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import { uploadProduct } from '../../../_actions/product_actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import ImageUploader from 'react-images-upload';

const { Title } = Typography;

function UploadPage(props) {
  const dispatch = useDispatch();

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [fileData, setFileData] = useState([]);
  const onFileHandler = (event) => {
    // setFileData(event[0]);
    setFileData(event);
    console.log(fileData);
  };
  return (
    <Formik
      initialValues={{
        name: '',
        // description: "",
        price: '',
        stock: '',
      }}
      validationSchema={Yup.object().shape({
        //검증 규칙 설정
        name: Yup.string().required('상품명을 입력해 주세요'),
        // description: Yup.string().required("Description is required"),
        price: Yup.number('가격을 숫자로 입력해 주세요')
          .positive('가격을 정확히 입력해 주세요')
          .integer('가격을 정확히 입력해 주세요')
          .required('가격을 입력해 주세요'),
        stock: Yup.number('재고수량을 숫자로 입력해 주세요')
          .positive('재고수량을 정확히 입력해 주세요')
          .integer('재고수량을 정확히 입력해 주세요')
          .required('재고수량을 입력해 주세요'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          var dataForm = new FormData();
          fileData.map((file) => dataForm.append('file', file, file.name));
          dataForm.append('productName', values.name);
          // dataForm.append("productDes", values.description);
          dataForm.append('price', values.price);
          dataForm.append('stock', values.stock);
          console.log(dataForm);
          dispatch(uploadProduct(dataForm))
            .then((response) => {
              if (response.payload.success) {
                // props.history.push("/");
                alert('상품이 업로드되었습니다.');
              } else {
                setFormErrorMessage('잘못 입력되었습니다. 다시 확인해 주세요.'); //에러 메세지 세팅
              }
            })
            .catch((err) => {
              setFormErrorMessage('잘못 입력되었습니다. 다시 확인해 주세요.');
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
          <div style={{ maxWidth: '450px', margin: '3rem auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <Title level={3}>상품 등록</Title>
            </div>
            <form
              onSubmit={handleSubmit}
              style={{ width: '450px' }}
              encType="multipart/form-data"
            >
              <Form.Item required>
                <ImageUploader
                  withIcon={true}
                  withPreview={true}
                  label="Max file size: 5mb, accepted: jpg, gif, png, jpeg"
                  buttonText="파일 선택"
                  onChange={onFileHandler}
                  imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                  maxFileSize={5242880}
                />
                <p
                  style={{
                    marginTop: '-10px',
                    textAlign: 'center',
                    fontSize: '0.725rem',
                  }}
                >
                  첫번째 파일은 썸네일 이미지, 두번째 파일은 상세 이미지로
                  등록됩니다.
                </p>
              </Form.Item>
              <Form.Item label={'상품명'} required>
                <Input
                  id="name"
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
                  등록
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

export default withRouter(UploadPage);
