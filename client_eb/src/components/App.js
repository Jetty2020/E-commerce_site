import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
// pages for this product
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import AdminPage from './views/AdminPage/AdminPage';
import UploadProduct from './views/AdminPage/Sections/UploadProduct';
import UpdateProduct from './views/AdminPage/Sections/UpdateProduct';
import DetailProductPage from './views/DetailProductPage/DetailProductPage';
import SubPage from './views/SubPage/SubPage';
import SearchResultPage from './views/SearchResultPage/SearchResultPage';
import MyCartPage from './views/CartPage/MyCartPage';
import WishlistPage from './views/WishlistPage/WishlistPage';
import UserInfoPage from './views/UserInfoPage/UserInfoPage';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/admin" component={Auth(AdminPage, true)} />
          <Route
            exact
            path="/admin/upload"
            component={Auth(UploadProduct, true)}
          />
          <Route
            exact
            path="/admin/update"
            component={Auth(UpdateProduct, true)}
          />
          <Route exact path="/sub/best" component={Auth(SubPage, null)} />
          <Route exact path="/sub/new" component={Auth(SubPage, null)} />
          <Route exact path="/sub/hot" component={Auth(SubPage, null)} />
          <Route exact path="/sub/discount" component={Auth(SubPage, null)} />
          <Route
            exact
            path="/search"
            component={Auth(SearchResultPage, null)}
          />
          <Route
            exact
            path="/product/:productId"
            component={Auth(DetailProductPage, null)}
          />
          <Route exact path="/user/info" component={Auth(UserInfoPage, true)} />
          <Route exact path="/user/cart" component={Auth(MyCartPage, true)} />
          <Route
            exact
            path="/user/wishlist"
            component={Auth(WishlistPage, true)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
