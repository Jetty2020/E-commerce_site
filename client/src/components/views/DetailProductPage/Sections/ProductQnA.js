import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQnA, loadQnA } from '../../../../_actions/QnA_actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Button, Icon, Input, Checkbox } from 'antd';

const QnAButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 5px;
`;
const QnAContainer = styled.div`
  width: 75%;
  margin: 10px auto;
  .secret {
    width: 100%;
    margin-bottom: 3px;
  }
  .qna_input {
    width: 100%;
    margin: 5px 0;
  }
  .qna_error {
    margin-bottom: 22px;
    padding-top: 10px;
    font-size: 0.725rem;
  }
  .qna_button {
    width: 49.5%;
    &:last-child {
      margin-left: 0.5%;
    }
  }
  @media only screen and (min-width: 1000px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .secret {
      all: unset;
    }
    .qna_input {
      width: 440px;
      margin: 0 5px;
    }
    .qna_error {
      margin-bottom: unset;
      padding-top: 14px;
      padding-left: 7px;
    }
    .qna_button {
      width: unset;
      &:last-child {
        margin-left: 5px;
      }
    }
  }
`;

const ProductQnA = ({ id }) => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [QnAs, setQnAs] = useState();
  useEffect(() => {
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
  }, [QnAs]);
  const [QnAInput, setQnAInput] = useState(false);
  const toggleQnAInput = useCallback(() => {
    if (userData.isAuth) {
      setQnAInput(!QnAInput);
    } else {
      alert('로그인이 필요합니다.');
    }
  }, [QnAInput]);
  return (
    <>
      <QnAButtonContainer>
        {!QnAInput && <Button onClick={toggleQnAInput}>Q&amp;A 쓰기</Button>}
      </QnAButtonContainer>

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
                    setQnAs(
                      [
                        {
                          id: response.payload.QnA.id,
                          text: values.QnA,
                          date: response.payload.QnA.date,
                          secret: values.secret,
                          user: { userID: userData.userID },
                        },
                      ].concat(QnAs),
                    );
                  } else {
                    console.log(response.payload);
                  }
                })
                .catch((err) => {
                  alert(err);
                });
              toggleQnAInput();
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
              <QnAContainer>
                <Checkbox
                  name="secret"
                  onChange={handleChange}
                  checked={values.secret}
                  id="secret"
                  className="secret"
                >
                  <label for="secret" style={{ cursor: 'pointer' }}>
                    비밀글
                  </label>
                </Checkbox>
                <div>
                  <Input
                    type="text"
                    name="QnA"
                    disabled={isSubmitting}
                    value={values.QnA}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`qna_input
                    ${
                      errors.QnA && touched.QnA
                        ? 'text-input error'
                        : 'text-input'
                    }
                  `}
                  />
                  {errors.QnA && touched.QnA && (
                    <div className="qna_error input-feedback">{errors.QnA}</div>
                  )}
                </div>
                <Button
                  type="primary"
                  className="qna_button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  등록
                </Button>
                <Button className="qna_button" onClick={toggleQnAInput}>
                  취소
                </Button>
              </QnAContainer>
            );
          }}
        </Formik>
      )}
      {QnAs === [] ? (
        <ul>
          {QnAs.map((qna) => (
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
      ) : (
        <p style={{ margin: '60px 0', textAlign: 'center' }}>
          작성된 상품 Q&amp;A가 없습니다.
        </p>
      )}
    </>
  );
};

export default ProductQnA;
