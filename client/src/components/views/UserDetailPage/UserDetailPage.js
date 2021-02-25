import React from "react";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useAsync } from "react-async"
import { Typography } from 'antd';
import './UserDetailPage.css';

const { Title } = Typography;

const loadUser = async () => {
	const res = await axios.get(`/api/users/detail`);
	return res.data;
};


function UserDetailPage(props) {
	const { data: user, error, isLoading } = useAsync({ promiseFn: loadUser })
  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`
  if (user) {
		return (
			<div className="topContainer">
				<div  className="userContainer">
					<div className="userItemContainer" style={{ width: '39%' }}>
						<Title level={2} >{user.name}</Title>
					</div>
					<div className="userItemContainer" style={{ width: '19%' }}>
						<Title level={2} >{user.name}</Title>
					</div>
					<div className="userItemContainer" style={{ width: '19%' }}>
						<Title level={2} >{user.name}</Title>
					</div>
					<div className="userItemContainer" style={{ width: '19%' }}>
						<Title level={2} >{user.name}</Title>
					</div>
      	</div>
			</div>
		);
	}
};

export default withRouter(UserDetailPage);