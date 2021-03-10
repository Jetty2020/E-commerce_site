import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { loginUser, findID } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Icon, Input, Button, Checkbox, Typography, Modal } from "antd";
import { useDispatch } from "react-redux";
import "../../utils/sns.css";

const { Title } = Typography;
function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialID = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  const initialPW = localStorage.getItem("rememberPW")
    ? localStorage.getItem("rememberPW")
    : "";

  const [email, setEmail] = useState("");
  const onChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  //modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);

    let dataToSubmit = {
      email,
    };
    dispatch(findID(dataToSubmit)).then((response) => {
      if (response.payload.success) {
        alert("이메일을 전송하였습니다.");
      } else {
        alert("존재하지 않는 이메일입니다.");
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Formik
      initialValues={{
        userID: initialID,
        password: initialPW,
      }}
      validationSchema={Yup.object().shape({
        userID: Yup.string()
          // .email("ID is invalid")
          .required("ID is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
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
                console.log(initialID[0]);
                window.localStorage.setItem("userId", response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem("rememberMe", values.userID);
                  window.localStorage.setItem("rememberPW", values.password);
                } else {
                  localStorage.removeItem("rememberMe");
                }
                props.history.push("/");
              } else {
                setFormErrorMessage("Check out your Account or Password again");
              }
            })
            .catch((err) => {
              setFormErrorMessage("Check out your Account or Password again");
              setTimeout(() => {
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
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <Title level={2} style={{ marginBottom: "1.5rem" }}>
              Shop
            </Title>
            <form onSubmit={handleSubmit} style={{ width: "350px" }}>
              <Form.Item required>
                <Input
                  id="userID"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="아이디"
                  type="text"
                  value={values.userID}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.userID && touched.userID
                      ? "text-input error"
                      : "text-input"
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
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="비밀번호"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
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
                      color: "#ff0000bf",
                      fontSize: "0.7rem",
                      border: "1px solid",
                      padding: "1rem",
                      borderRadius: "10px",
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
                <a
                  className="login-form-forgot"
                  style={{ float: "right" }}
                  onClick={showModal}
                >
                  계정 찾기
                </a>

                <Modal
                  title="계정을 잊어버리셨나요?"
                  visible={isModalVisible}
                  onOk={() => handleOk(email)}
                  onCancel={handleCancel}
                  okText="확인"
                  cancelText="취소"
                >
                  <p>가입하셨던 이메일을 입력해 주세요.</p>
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={onChange}
                    className={
                      errors.email && touched.email
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                </Modal>

                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ minWidth: "100%" }}
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                  >
                    로그인
                  </Button>
                </div>

                <Button style={{ minWidth: "100%" }}>
                  <Link to="/register">회원가입</Link>
                </Button>
              </Form.Item>

              <div className="sns">
                <div style={{ marginTop: "2rem" }}>
                  <button className="kakao">카카오 로그인</button>
                  <button className="naver">네이버 로그인</button>
                </div>
                <div>
                  <button className="google">구글 로그인</button>
                  <button className="facebook">페이스북 로그인</button>
                </div>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default withRouter(LoginPage);
