import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { uploadItem } from "../../../_actions/item_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { 
  Form, 
  Input, 
  Button, 
  Typography, 
  Upload, 
  // message 
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;

function UploadPage(props) {
  const dispatch = useDispatch(); //dispatch for redux
  
	const [formErrorMessage, setFormErrorMessage] = useState('');

	return (
		<Formik
			initialValues={{ //초기값
				name: '',
				description: '',
			}}
			validationSchema={
				Yup.object().shape({ //검증 규칙 설정
          name: Yup
						.string()
						.required('Product name is required'),
				  description: Yup
					  .string()
					  .required('Description is required'),
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					let dataToSubmit = {
						name: values.name,
						description: values.description,
					};
				  
					dispatch(uploadItem(dataToSubmit))
						.then(response => {
							if (response.payload.success) {
								props.history.push("/");
							} else {
								setFormErrorMessage('Error occurred'); //에러 메세지 세팅
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
					<Title level={2}>Upload</Title>
					<form onSubmit={handleSubmit} style={{ width: '350px' }}>                    
						<Form.Item required>
							<Input
								id="name"
								placeholder="Product name"
								type="name"
								value={values.name}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.name && touched.name ? 'text-input error' : 'text-input'
								}
							/>
							{errors.name && touched.name && (
								<div className="input-feedback">{errors.name}</div>
							)}
						</Form.Item>

						<Form.Item required>
							<TextArea
								id="description"
								placeholder="Description"
								type="description"
                rows={6}
								value={values.description}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.description && touched.description ? 'text-input error' : 'text-input'
								}
							/>
							{errors.description && touched.description && (
								<div className="input-feedback">{errors.description}</div>
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
            <Form.Item required>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            </Form.Item>
						<Form.Item>
							<div>
								<Button 
                  type="primary" 
                  htmlType="submit" 
                  className="login-form-button" 
                  style={{ minWidth: '100%' }} 
                  disabled={isSubmitting} 
                  onSubmit={handleSubmit}
                >
									Submit
								</Button>
							</div>
							
						</Form.Item>
            
					</form>
				</div>
			);
		  }}
		</Formik>
	);
};

export default withRouter(UploadPage);