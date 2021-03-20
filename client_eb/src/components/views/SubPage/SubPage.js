import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Icon } from 'antd';
import BestPage from './Sections/BestPage';
import NewPage from './Sections/NewPage';
import DiscountPage from './Sections/DiscountPage';
import AllPage from './Sections/AllPage';

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
        <Route exact path="/sub/all" component={AllPage} />
        <Route exact path="/sub/best" component={BestPage} />
        <Route exact path="/sub/new" component={NewPage} />
        <Route exact path="/sub/discount" component={DiscountPage} />
      </Switch>
    </div>
  );
}

export default SubPage;
