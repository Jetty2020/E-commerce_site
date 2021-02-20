import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { 
	UserOutlined,
	LockOutlined
} from '@ant-design/icons';
import { useDispatch } from "react-redux";
import styled from "styled-components";
// import {
// 	kakao
// } from '/imgs/kakao.png';

const { Title } = Typography;

function LoginPage(props) {
	const dispatch = useDispatch(); //dispatch for redux
	const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

	const [formErrorMessage, setFormErrorMessage] = useState('');
	const [rememberMe, setRememberMe] = useState(rememberMeChecked);

	const handleRememberMe = () => {
		setRememberMe(!rememberMe);
	};

	const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

	const KaKaoBtn = styled.button`
	margin-top: 8px;	
  width: 350px;
  height: 32px;
  color: #000000;
  background-color: #FFEB01;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    /* box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2); */
  }
`;
const GoogleBtn = styled.button`
	margin-top: 8px;	
  width: 350px;
  height: 32px;
  color: #8E95A9;
  background-color: #FFFFFF;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    /* box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2); */
  }
`;

const NaverBtn = styled.button`
	margin-top: 8px;	
  width: 350px;
  height: 32px;
  color: #FFFFFF;
  background-color: #1EC800;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    /* box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2); */
  }
`;

const Logo = styled.img`
  width: 25px;
  height: 25px;
`;

const NaverLogo = styled.img`
  width: 30px;
  height: 30px;
`;

	return (
		<Formik
			initialValues={{ //초기값
				email: initialEmail,
				password: '',
			}}
			validationSchema={
				Yup.object().shape({ //검증 규칙 설정
				email: Yup
									.string()
									.email('Email is invalid')
									.required('Email is required'),
				password: Yup
										.string()
										.min(6, 'Password must be at least 6 characters')
										.required('Password is required'),
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					let dataToSubmit = {
						email: values.email,
						password: values.password
					};
				  
					dispatch(loginUser(dataToSubmit))
						.then(response => {
							if (response.payload.success) {
								window.localStorage.setItem('userId', response.payload.userId);
								if (rememberMe === true) {
									window.localStorage.setItem('rememberMe', values.email);
								} else {
									localStorage.removeItem('rememberMe');
								}
								props.history.push("/");
							} else {
								setFormErrorMessage('Check out your Account or Password again'); //에러 메세지 세팅
							}
						})
						.catch(err => {
							setFormErrorMessage('Error occurred');
							setTimeout(() => { //일정 시간이 지난 후 함수 실행 setTimeout(실행시킬 함수, 시간)
								setFormErrorMessage("");
							}, 3000);
						});
					setSubmitting(false);
				}, 500);
			}}
		>
		  {props => {
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
				<div className="app">
					<Title level={2}>Log In</Title>
					<form onSubmit={handleSubmit} style={{ width: '350px' }}>                    
						<Form.Item required>
							<Input
								id="email"
								prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Enter your email"
								type="email"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.email && touched.email ? 'text-input error' : 'text-input'
								}
							/>
							{errors.email && touched.email && (
								<div className="input-feedback">{errors.email}</div>
							)}
						</Form.Item>

						<Form.Item required>
							<Input
								id="password"
								prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Enter your password"
								type="password"
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.password && touched.password ? 'text-input error' : 'text-input'
								}
							/>
							{errors.password && touched.password && (
								<div className="input-feedback">{errors.password}</div>
							)}
						</Form.Item>

						{formErrorMessage && (
							<label >
								<p style={{ 
									color: '#ff0000bf', 
									fontSize: '0.7rem',
									border: '1px solid', 
									padding: '1rem', 
									borderRadius: '10px' 
									}}
								>
									{formErrorMessage}
								</p>
							</label>
						)}

						<Form.Item>
							<Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >
								Remember me
							</Checkbox>
							<a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
								forgot password
							</a>
							<div>
								<Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
									Log in
								</Button>
							</div>
							<div>
								<a 
								href="/oauth/kakao"
								>
									<KaKaoBtn type="button" >
									<Logo src={"/imgs/kakao.png"} alt="kakao" />
										카카오 로그인
									</KaKaoBtn>
								</a>
							</div>
							<div>
								<a 
								href="/oauth/google"
								>
									<GoogleBtn type="button" >
									<Logo src={"/imgs/google.jpg"} alt="google" />
										구글 로그인
									</GoogleBtn>
								</a>
							</div>

							<div>
								<a 
								href="/oauth/naver"
								>
									<NaverBtn type="button" >
									<NaverLogo src={"/imgs/naver.png"} alt="naver" />
										네이버 로그인
									</NaverBtn>
								</a>
							</div>
							
							<a href="/register">
								register now!
							</a>
							
						</Form.Item>
					</form>
				</div>
			);
		  }}
		</Formik>
	);
};

export default withRouter(LoginPage);