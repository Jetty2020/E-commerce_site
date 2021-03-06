import React, { useCallback, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  loginUser,
  findID,
  findPassword,
} from '../../../_actions/user_actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Form, Icon, Input, Button, Checkbox, Typography, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import logo from '../../images/logo.png';
import sns_img from '../../images/bg_sns.png';

const { Title } = Typography;
const Sns = styled.div`
  width: 150px;
  margin: 0 auto;
  a {
    width: 40px;
    height: 40px;
    display: inline-block;
    text-indent: -9999px;
    background: url(${sns_img}) no-repeat;
    margin: 0.3rem;
    border: none;
    border-radius: 20px;
    outline: none;
    cursor: pointer;
    &.naver {
      background-position-y: -40px;
    }
    &.google {
      background-position-y: -80px;
    }
  }
`;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = useCallback(() => {
    setRememberMe(!rememberMe);
  }, [rememberMe]);

  const initialID = localStorage.getItem('rememberMe')
    ? localStorage.getItem('rememberMe')
    : '';

  const initialPW = localStorage.getItem('rememberPW')
    ? localStorage.getItem('rememberPW')
    : '';

  //계정 찾기 모달
  const [isEmailModal, setIsEmailModal] = useState(false);
  const showEmailModal = useCallback(() => {
    setIsEmailModal(true);
  }, [isEmailModal]);
  const emailModalCancel = useCallback(() => {
    setIsEmailModal(false);
  }, [isEmailModal]);

  //비밀번호 찾기 모달
  const [isPasswordModal, setIsPasswordModal] = useState(false);
  const showPasswordModal = useCallback(() => {
    setIsPasswordModal(true);
  }, [isPasswordModal]);
  const passwordModalCancel = useCallback(() => {
    setIsPasswordModal(false);
  }, [isPasswordModal]);

  return (
    <>
      <Formik
        initialValues={{
          userID: initialID,
          password: initialPW,
        }}
        validationSchema={Yup.object().shape({
          userID: Yup.string().required('ID를 입력해 주세요'),
          password: Yup.string()
            .min(6, '비밀번호를 최소 6자리 이상 입력해 주세요')
            .required('비밀번호를 입력해 주세요'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              userID: values.userID,
              password: values.password,
            };
            dispatch(loginUser(dataToSubmit))
              .then((response) => {
                if (response.payload.success) {
                  window.localStorage.setItem(
                    'userId',
                    response.payload.userId,
                  );
                  if (rememberMe === true) {
                    window.localStorage.setItem('rememberMe', values.userID);
                    window.localStorage.setItem('rememberPW', values.password);
                  } else {
                    localStorage.removeItem('rememberMe');
                    localStorage.removeItem('rememberPW');
                  }
                  props.history.push('/');
                } else {
                  setFormErrorMessage('이메일과 비밀번호를 확인해 주세요');
                }
              })
              .catch((err) => {
                setFormErrorMessage('이메일과 비밀번호를 확인해 주세요');
                setTimeout(() => {
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
            <div className="app">
              <Title level={2} style={{ marginBottom: '3rem' }}>
                <img src={logo} alt="logo" />
              </Title>
              <form onSubmit={handleSubmit} style={{ width: '350px' }}>
                <Form.Item required>
                  <Input
                    id="userID"
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="아이디"
                    type="text"
                    value={values.userID}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.userID && touched.userID
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  {errors.userID && touched.userID && (
                    <div className="input-feedback">{errors.userID}</div>
                  )}
                </Form.Item>

                <Form.Item required>
                  <Input
                    id="password"
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="비밀번호"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                </Form.Item>

                {formErrorMessage && (
                  <label>
                    <p
                      style={{
                        color: '#ff0000bf',
                        fontSize: '0.7rem',
                        border: '1px solid',
                        padding: '1rem',
                        borderRadius: '10px',
                      }}
                    >
                      {formErrorMessage}
                    </p>
                  </label>
                )}

                <Form.Item>
                  <Checkbox
                    id="rememberMe"
                    onChange={handleRememberMe}
                    checked={rememberMe}
                  >
                    ID / Password 저장
                  </Checkbox>

                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ minWidth: '100%' }}
                      disabled={isSubmitting}
                      onSubmit={handleSubmit}
                    >
                      로그인
                    </Button>
                  </div>

                  <Button style={{ minWidth: '100%' }}>
                    <Link to="/register">회원가입</Link>
                  </Button>
                </Form.Item>
              </form>
              <Sns>
                <a href="https://server-29concept.herokuapp.com/api/users/oauth/kakao">
                  카카오 로그인
                </a>
                <a
                  href="https://server-29concept.herokuapp.com/api/users/oauth/naver"
                  className="naver"
                >
                  네이버 로그인
                </a>
                <a
                  href="https://server-29concept.herokuapp.com/api/users/oauth/google"
                  className="google"
                >
                  구글 로그인
                </a>
              </Sns>
              <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <span
                  onClick={showEmailModal}
                  style={{
                    cursor: 'pointer',
                    margin: '0 10px',
                    textDecoration: 'underline',
                    fontSize: '0.8rem',
                    color: 'rgba(0,0,0,0.65)',
                  }}
                >
                  계정 찾기
                </span>
                <span
                  onClick={showPasswordModal}
                  style={{
                    cursor: 'pointer',
                    margin: '0 10px',
                    textDecoration: 'underline',
                    fontSize: '0.8rem',
                    color: 'rgba(0,0,0,0.65)',
                  }}
                >
                  비밀번호 찾기
                </span>
              </div>
            </div>
          );
        }}
      </Formik>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('이메일 형식을 맞춰주세요.')
            .required('이메일 값이 비었습니다.'),
        })}
        onSubmit={useCallback(
          (values, { setSubmitting }) => {
            let dataToSubmit = {
              email: values.email,
            };
            setIsEmailModal(false);
            dispatch(findID(dataToSubmit)).then((response) => {
              if (response.payload.success) {
                alert('메일을 전송하였습니다.');
              } else {
                alert('등록되지 않은 이메일입니다.');
              }
            });
          },
          [props],
        )}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <Modal
              title="계정을 잊어버리셨나요?"
              visible={isEmailModal}
              onOk={handleSubmit}
              onCancel={emailModalCancel}
              okText="확인"
              cancelText="취소"
            >
              <p>가입하셨던 이메일을 입력해 주세요.</p>
              <Input
                id="email"
                type="email"
                placeholder="이메일"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  errors.email && touched.email
                    ? 'text-input error'
                    : 'text-input'
                }
              />
              {errors.email && touched.email && (
                <div style={{ margin: '5px 0' }} className="input-feedback">
                  {errors.email}
                </div>
              )}
            </Modal>
          );
        }}
      </Formik>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('이메일을 올바르게 입력해 주세요')
            .required('이메일을 입력해 주세요'),
          userID: Yup.string()
            .min(6, 'ID를 최소 6자리 이상 입력해 주세요')
            .required('ID를 입력해 주세요'),
        })}
        onSubmit={useCallback(
          (values, { setSubmitting }) => {
            let dataToSubmit = {
              email: values.email,
              userID: values.userID,
            };
            setIsPasswordModal(false);
            dispatch(findPassword(dataToSubmit)).then((response) => {
              if (response.payload.success === 2) {
                alert('ID와 이메일을 다시 확인해 주세요');
              } else if (response.payload.success) {
                alert('메일을 전송하였습니다');
              } else {
                alert('잘못된 접근입니다');
              }
            });
          },
          [props],
        )}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <Modal
              title="비밀번호를 잊어버리셨나요?"
              visible={isPasswordModal}
              onOk={handleSubmit}
              onCancel={passwordModalCancel}
              okText="확인"
              cancelText="취소"
            >
              <p style={{ margin: '0 0 5px' }}>
                가입하셨던 이메일을 입력해 주세요.
              </p>
              <Input
                id="email"
                type="email"
                placeholder="이메일"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  errors.email && touched.email
                    ? 'text-input error'
                    : 'text-input'
                }
              />
              {errors.email && touched.email && (
                <div style={{ margin: '5px 0' }} className="input-feedback">
                  {errors.email}
                </div>
              )}
              <p style={{ margin: '15px 0 5px' }}>
                가입하셨던 ID를 입력해 주세요.
              </p>
              <Input
                id="userID"
                type="text"
                placeholder="ID"
                value={values.userID}
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  errors.userID && touched.userID
                    ? 'text-input error'
                    : 'text-input'
                }
              />
              {errors.userID && touched.userID && (
                <div style={{ margin: '5px 0' }} className="input-feedback">
                  {errors.userID}
                </div>
              )}
            </Modal>
          );
        }}
      </Formik>
    </>
  );
}

export default withRouter(LoginPage);
