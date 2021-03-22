import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editPassword,
  editUserSendMail,
  editUserEmail,
  deleteUser,
} from '../../../_actions/user_actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './UserInfoPage.css';
import '../LoginPage/LoginPage.css';
import { Form, Button, Input, Modal } from 'antd';

function UserInfoPage(props) {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch(); //dispatch for redux

  const [user, setUser] = useState({
    role: '',
    name: '',
    userID: '',
    email: '',
    password: '',
    modify: false,
  });
  const [mailSend, setMailSend] = useState(false);
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (userData) {
      setUser({
        ...user,
        role: userData.isAdmin,
        name: userData.name,
        userID: userData.userID,
        email: userData.userEmail,
        password: userData.password,
        modify: false,
      });
    }
  }, [userData]);

  const [sns, setSNS] = useState([
    { corp: 'kakao', title: '카카오 로그인', connect: false },
    { corp: 'naver', title: '네이버 로그인', connect: true },
    { corp: 'google', title: '구글 로그인', connect: false },
  ]);

  const onModify = useCallback(() => {
    setUser({ ...user, modify: !user.modify });
  }, [user]);

  const onCancel = useCallback(() => {
    setUser({ ...user, modify: !user.modify });
  }, [user]);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const deleteOk = () => {
    let dataToSubmit = {
      userID: userData.userID,
    };
    dispatch(deleteUser(dataToSubmit)).then((response) => {
      if (response.payload.success) {
        props.history.push('/login');
        alert('회원정보가 삭제되었습니다.');
      } else {
        alert(response.payload.message);
      }
    });
    setDeleteUserModal(false);
  };
  const deleteCancel = () => {
    setDeleteUserModal(false);
  };
  const onWithdraw = () => {
    setDeleteUserModal(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
    setUser({ ...user });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <h2 style={{ fontWeight: 'bold' }}>회원 정보</h2>

      <div className="info_container">
        <h3 className="info_title">로그인 정보</h3>
        <div className="info">
          <p style={{ marginTop: '20px' }}>
            연결된 SNS 계정으로 로그인할 수 있습니다.
          </p>
          <div className="sns" style={{ margin: 'unset' }}>
            {sns.map((sns) =>
              sns.connect ? (
                <button className={sns.corp}>{sns.title}</button>
              ) : (
                <button
                  className={sns.corp}
                  style={{ filter: 'grayscale(100%)' }}
                >
                  {sns.title}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
      {userData ? (
        <div className="info_container">
          <h3 className="info_title">회원 정보</h3>
          {user.modify ? (
            <div className="info">
              <div className="info_detail">
                <span>성명</span> {user.name}
              </div>
              <div className="info_detail">
                <span>아이디</span> {user.userID}
              </div>
              <Formik
                initialValues={{
                  email: user.email,
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email('이메일을 올바르게 입력해 주세요')
                    .required('이메일을 입력해 주세요'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    let dataToSubmit = {
                      userID: userData.userID,
                      userEmail: values.email,
                    };
                    if (values.email === user.email) {
                      alert(
                        '이메일이 이전과 동일합니다. \n새로운 이메일을 입력해주세요.',
                      );
                      setSubmitting(false);
                    } else {
                      dispatch(editUserSendMail(dataToSubmit)).then(
                        (response) => {
                          if (response.payload.success) {
                            alert('인증번호가 전송되었습니다.');
                          } else {
                            // console.log(response.payload.err);
                            alert(response.payload.message);
                          }
                        },
                      );
                      setEmail(values.email);
                      setSubmitting(true);
                      setMailSend(true);
                    }
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
                    <div>
                      <div className="info_detail">
                        <span className="info_detail_span">이메일</span>{' '}
                        <Input
                          type="text"
                          name="email"
                          disabled={isSubmitting}
                          value={values.email}
                          style={{ width: '220px' }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.email && touched.email
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        <Button
                          type="primary"
                          style={{ margin: '0 10px', fontSize: '0.85rem' }}
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                          인증번호 보내기
                        </Button>
                      </div>
                      {errors.email && touched.email && (
                        <div
                          className="input-feedback"
                          style={{ marginTop: '5px', marginLeft: '105px' }}
                        >
                          {errors.email}
                        </div>
                      )}
                    </div>
                  );
                }}
              </Formik>
              {mailSend && (
                <Formik
                  initialValues={{
                    hash: '',
                  }}
                  validationSchema={Yup.object().shape({
                    hash: Yup.number('Hash is number.')
                      .positive('Hash is positive number.')
                      .integer('Hash is integer')
                      .required('Hash is required'),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      let dataToSubmit = {
                        userID: userData.userID,
                        userEmail: email,
                        emailHash: values.hash,
                      };
                      dispatch(editUserEmail(dataToSubmit)).then((response) => {
                        if (response.payload.success) {
                          alert('이메일이 변경되었습니다.');
                          setUser({ ...user, email, modify: !user.modify });
                        } else {
                          alert(response.payload.message);
                        }
                      });
                      setMailSend(false);
                      setSubmitting(true);
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
                      <div className="info_detail">
                        <span className="info_detail_span">인증번호</span>{' '}
                        <Input
                          type="text"
                          name="hash"
                          value={values.hash}
                          style={{ width: '150px' }}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          onBlur={handleBlur}
                          className={
                            errors.hash && touched.hash
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        <Button
                          type="primary"
                          style={{ margin: '0 10px', fontSize: '0.85rem' }}
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                          인증번호 확인
                        </Button>
                        {errors.hash && touched.hash && (
                          <div
                            className="input-feedback"
                            style={{
                              margin: '-10px 0 10px',
                              marginLeft: '105px',
                            }}
                          >
                            {errors.hash}
                          </div>
                        )}
                      </div>
                    );
                  }}
                </Formik>
              )}
            </div>
          ) : (
            <div className="info">
              <div className="info_detail">
                <span>성명</span> {user.name}
              </div>
              <div className="info_detail">
                <span>아이디</span> {user.userID}
              </div>
              <div className="info_detail">
                <span>이메일</span> {user.email}
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}

      {user.modify ? (
        <>
          <Button
            style={{
              marginTop: '5px',
              fontSize: '0.85rem',
            }}
            onClick={onCancel}
          >
            취소
          </Button>
        </>
      ) : (
        <>
          <Button
            type="primary"
            style={{
              marginTop: '5px',
              marginRight: '4px',
              fontSize: '0.85rem',
            }}
            onClick={showModal}
          >
            비밀번호 변경
          </Button>
          <Button
            style={{ marginTop: '5px', fontSize: '0.85rem' }}
            onClick={onModify}
          >
            회원정보 수정
          </Button>
        </>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
        }}
      >
        <Button type="link" onClick={onWithdraw}>
          회원탈퇴하기
        </Button>
      </div>
      <Modal
        title="회원 탈퇴"
        visible={deleteUserModal}
        onOk={deleteOk}
        onCancel={deleteCancel}
        okText="확인"
        cancelText="취소"
      >
        <p>회원탈퇴 시 모든 정보가 사라집니다.</p>
        <p>정말로 탈퇴하시겠습니까?</p>
      </Modal>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .min(6, '비밀번호를 6자리 이상 입력해 주세요')
            .required('비밀번호를 입력해 주세요'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
            .required('비밀번호를 확인해 주세요'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              userID: userData.userID,
              userPassword: values.password,
            };
            dispatch(editPassword(dataToSubmit))
              .then((response) => {
                if (response.payload.success) {
                  setIsModalVisible(false);
                  alert('비밀번호가 변경되었습니다.');
                } else {
                  setIsModalVisible(false);
                  alert('에러 발생');
                }
              })
              .catch((err) => {
                setIsModalVisible(false);
                alert('에러 발생\n', err);
              });
            // setSubmitting(false);
          }, 500);
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            // isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <Modal
                title="비밀번호를 변경하시겠습니까?"
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                okText="확인"
                cancelText="취소"
              >
                <Form.Item
                  required
                  label="비밀번호"
                  hasFeedback
                  validateStatus={
                    errors.password && touched.password ? 'error' : 'success'
                  }
                >
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 6자리 이상 입력해 주세요."
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
                <Form.Item required label="비밀번호 확인" hasFeedback>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="비밀번호를 다시 입력해 주세요."
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="input-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </Form.Item>
              </Modal>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default UserInfoPage;
