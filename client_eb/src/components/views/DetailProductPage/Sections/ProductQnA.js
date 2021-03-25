import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQnA, loadQnA } from '../../../../_actions/QnA_actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Icon, Input, Checkbox } from 'antd';

const ProductQnA = ({ id }) => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [QnAs, setQnAs] = useState();
  if (!QnAs) {
    dispatch(loadQnA(id))
      .then((response) => {
        if (response.payload.success) {
          setQnAs(response.payload.QnA);
        } else {
          console.log(response.payload);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  const [QnAInput, setQnAInput] = useState(false);
  const showQnAInput = () => {
    setQnAInput(!QnAInput);
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          margin: '5px',
        }}
      >
        {!QnAInput && <Button onClick={showQnAInput}>Q&amp;A 쓰기</Button>}
      </div>

      {QnAInput && (
        <Formik
          initialValues={{
            QnA: '',
            secret: false,
          }}
          validationSchema={Yup.object().shape({
            QnA: Yup.string().required('Q&A를 입력해 주세요'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              let dataToSubmit = {
                QnAText: values.QnA,
                secret: values.secret,
              };
              dispatch(addQnA(id, dataToSubmit))
                .then((response) => {
                  if (response.payload.success) {
                    setQnAs([{
                      id: response.payload.QnA.id,
                      text: values.QnA,
                      date: response.payload.QnA.date,
                      secret: values.secret,
                      user: { userID: userData.userID },
                    }].concat(QnAs));
                  } else {
                    console.log(response.payload);
                  }
                })
                .catch((err) => {
                  alert(err);
                });
              showQnAInput();
              setSubmitting(true);
              setQnAInput(false);
            }, 0);
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '0 0 30px',
                }}
              >
                <Input
                  type="text"
                  name="QnA"
                  disabled={isSubmitting}
                  value={values.QnA}
                  style={{ width: '60%' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.QnA && touched.QnA
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                <Checkbox
                  name="secret"
                  onChange={handleChange}
                  checked={values.secret}
                >
                  비밀글
                </Checkbox>
                <Button
                  type="primary"
                  style={{ margin: '0 10px', fontSize: '0.85rem' }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  작성하기
                </Button>
                {errors.QnA && touched.QnA && (
                  <div
                    className="input-feedback"
                    style={{ marginTop: '5px', marginLeft: '105px' }}
                  >
                    {errors.QnA}
                  </div>
                )}
              </div>
            );
          }}
        </Formik>
      )}
      <ul>
        {QnAs &&
          QnAs.map((qna) => (
            <li
              key={qna.id}
              style={{
                padding: '20px 10px',
                borderBottom: '1px solid #e9ecef',
                cursor: 'pointer',
              }}
              onClick={() => qna.secret && alert('비밀글입니다.')}
            >
              <span>{qna.user.userID}</span>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {qna.secret ? (
                  <div>
                    <Icon type="lock" />
                    <span style={{ marginLeft: '5px' }}>비밀글입니다.</span>
                  </div>
                ) : (
                  <div>{qna.text}</div>
                )}
                <div>
                  <span style={{ margin: '0 15px' }}>{qna.date}</span>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default ProductQnA;
