/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { Menu, Badge, Input } from 'antd';
import { USER_SERVER } from '../../../Config';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const SubMenu = Menu.SubMenu;

function RightMenu(props) {
  const { Search } = Input;
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
      top: 18px;
      right: 280px;
      width: 170px;
    }
  `;
  const [searchTerms, setSearchTerms] = useState('');
  const onChangeSearch = useCallback(
    (e) => {
      const { value } = e.target;
      console.log(value);
      setSearchTerms(value);
    },
    [searchTerms],
  );
  const onSubmit = (e) => {
    e.preventDefault();
    props.history.push('/search');
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
          <Search
            type="text"
            value={searchTerms}
            onChange={onChangeSearch}
            placeholder="search"
          />
        </SearchBar1>
      </div>
    );
  } else {
    return (
      <div style={{ position: 'relative' }}>
        <SearchBar2>
          <form onSubmit={onSubmit}>
            <Search
              value={searchTerms}
              onChange={onChangeSearch}
              placeholder="search"
            />
          </form>
        </SearchBar2>

        <Menu mode={props.mode}>
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
