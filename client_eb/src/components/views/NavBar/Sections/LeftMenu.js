import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="best_menu">
        <Link to="/sub/best">Best</Link>
      </Menu.Item>
      <Menu.Item key="new_menu">
        <Link to="/sub/new">New</Link>
      </Menu.Item>
      <Menu.Item key="discount_menu">
        <Link to="/sub/discount">Discount</Link>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
