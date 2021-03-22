/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { searchProduct } from '../../../../_actions/product_actions';
import { Menu, Badge, Input } from "antd";
import { USER_SERVER } from "../../../Config";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const SubMenu = Menu.SubMenu;

function RightMenu(props) {
  const dispatch = useDispatch();
  const { Search } = Input;
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  //상품 검색
  const SearchBar1 = styled.div`
    margin-top: 15px;
    padding: 0 20px;

    @media only screen and (min-width: 1000px) {
      position: absolute;
      top: 18px;
      right: 190px;
      width: 150px;
      margin: 0;
      padding: 0;
    }
  `;
  const SearchBar2 = styled.div`
    position: absolute;
    bottom: -45px;
    padding: 0 20px;

    @media only screen and (min-width: 1000px) {
      top: 18px;
      right: 280px;
      width: 170px;
      padding: 0;
    }
  `;
  const onSearch = (value) => {
    props.history.push(`/search/${value}`);
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <div style={{ position: "relative" }}>
        <Menu mode={props.mode}>
          <Menu.Item key="mail">
            <Link to="/login">Signin</Link>
          </Menu.Item>

          <Menu.Item key="app">
            <Link to="/register">Signup</Link>
          </Menu.Item>
        </Menu>

        <SearchBar1>
          <Search onSearch={onSearch} placeholder="3월 추천상품" />
        </SearchBar1>
      </div>
    );
  } else {
    return (
      <div style={{ position: "relative" }}>
        <SearchBar2>
          <Search onSearch={onSearch} placeholder="3월 추천상품" />
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
                  style={{ color: "#108ee9" }}
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
