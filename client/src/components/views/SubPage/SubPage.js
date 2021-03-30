import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AllPage from './Sections/AllPage';
import BestPage from './Sections/BestPage';
import NewPage from './Sections/NewPage';
import DiscountPage from './Sections/DiscountPage';

function SubPage() {
  return (
    <div style={{ width: '75%', margin: '1rem auto' }}>
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
