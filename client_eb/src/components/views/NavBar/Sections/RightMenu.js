/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { Menu, Icon, Badge, Modal, Button } from 'antd';
import { USER_SERVER } from '../../../Config';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchFeature from '../../LandingPage/Sections/SearchFeature';
const SubMenu = Menu.SubMenu;

function RightMenu(props) {
  //상품 검색
  const SearchBar1 = styled.div`
    margin: 20px;

    @media only screen and (min-width: 769px) {
      position: absolute;
      top: 18px;
      right: 190px;
      width: 150px;
      margin: 0;
    }
  `;
  const SearchBar2 = styled.div`
    @media only screen and (min-width: 769px) {
      position: absolute;
      top: -53px;
      right: 30px;
      width: 150px;
    }
  `;

  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push('/login');
      } else {
        alert('Log Out Failed');
      }
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [SearchTerms, setSearchTerms] = useState('');

  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    // getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    Axios.post('/api/product/getProducts', variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...Products, ...response.data.products]);
        } else {
          setProducts(response.data.products);
        }
        setPostSize(response.data.postSize);
      } else {
        alert('Failed to fectch product datas');
      }
    });
  };

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerms(newSearchTerm);

    getProducts(variables);
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <div style={{ position: 'relative' }}>
        <Menu mode={props.mode}>
          <Menu.Item key="mail">
            <Link to="/login">Signin</Link>
          </Menu.Item>

          <Menu.Item key="app">
            <Link to="/register">Signup</Link>
          </Menu.Item>
        </Menu>

        <SearchBar1>
          <SearchFeature refreshFunction={updateSearchTerms} />
        </SearchBar1>
      </div>
    );
  } else {
    return (
      <div style={{ position: 'relative' }}>
        <Menu mode={props.mode}>
          <Menu.Item>
            <SearchBar2>
              <SearchFeature refreshFunction={updateSearchTerms} />
            </SearchBar2>
          </Menu.Item>

          <SubMenu title={<span>My Page</span>}>
            <Menu.Item key="userInfo">
              <Link to="/user/info">Profile</Link>
            </Menu.Item>
            <Menu.Item key="cart">
              <Link to="/user/cart">
                <Badge
                  // count={user.userData && user.userData.cart.length}
                  style={{ color: '#108ee9' }}
                >
                  Cart
                </Badge>
              </Link>
            </Menu.Item>
            <Menu.Item key="wishlist">
              <Link to="/user/wishlist">Wishlist</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu title={<span>Admin</span>}>
            <Menu.Item key="admin">
              <Link to="/admin">My products</Link>
            </Menu.Item>
            <Menu.Item key="upload">
              <Link to="/admin/upload">Upload</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="logout">
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default withRouter(RightMenu);
