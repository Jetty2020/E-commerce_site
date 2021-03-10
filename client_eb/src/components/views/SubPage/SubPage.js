import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Icon } from 'antd';
import Best from './Sections/Best';
import New from './Sections/New';
import Discount from './Sections/Discount';

function SubPage() {
  //pagination
  const pages = [];
  const createPages = () => {
    for (let i = 1; i <= 5; i++) {
      pages.push({
        id: i,
      });
    }
    return pages;
  };
  createPages();

  return (
    <div
      style={{
        width: '75%',
        margin: '1rem auto',
      }}
    >
      <Switch>
        <Route exact path="/sub/best" component={Best} />
        <Route exact path="/sub/new" component={New} />
        <Route exact path="/sub/discount" component={Discount} />
      </Switch>

      {/* pagination */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '70px 0',
        }}
      >
        {/*  <a
          href="/"
          style={{
            color: '#495057',
            fontSize: '1rem',
            marginBottom: '12px',
            marginLeft: '8px',
          }}
        >
          <Icon type="left" />
        </a> */}
        <ul style={{ display: 'flex' }}>
          {pages.map((page) => (
            <li style={{ margin: '0 10px' }}>
              <a
                href="/"
                style={{
                  color: '#495057',
                  fontSize: '1.05rem',
                  padding: '3px',
                }}
              >
                {page.id}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/"
          style={{
            color: '#495057',
            fontSize: '1rem',
            marginBottom: '12px',
            marginLeft: '8px',
          }}
        >
          <Icon type="right" />
        </a>
      </div>
    </div>
  );
}

export default SubPage;
