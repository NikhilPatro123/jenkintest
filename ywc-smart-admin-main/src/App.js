import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

//axios
import axios from "axios";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";

import { SET_AUTHENTICATED } from "./redux/types";

//restrict routes
import { AuthRoute, AdminRoute } from "./util/route";

import { AdminLogin } from "../src/pages/AdminLogin";
import { Dashboard } from "../src/pages/layouts/Dashboard";
import { VendorList } from "./pages/layouts/vendor/VendorList";
import { Vendor } from "./pages/layouts/vendor/Vendor";
import { Category } from "./pages/layouts/Category";
import { Products } from "./pages/layouts/Products";
import { Groups } from "./pages/layouts/Groups";
import { CustomerListing } from "./pages/layouts/customer/CustomerListing";
import { Customer } from "./pages/layouts/customer/Customer";
import { OrderList } from "./pages/layouts/orders/OrderList";
import { Banners } from "./pages/layouts/banners/Banners";
import { EditBanner } from "./pages/layouts/banners/EditBanner";
import { BannerImage } from "./pages/layouts/banners/BannerImage";
import { Transaction } from "./pages/layouts/Transaction";
import { Catalog } from "./pages/layouts/Catalog";

const token = localStorage.jwt;

if (token) {
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common["Authorization"] = token;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
        <AuthRoute exact path="/"  component={AdminLogin} />
          <AuthRoute exact path="/adminui" component={AdminLogin} />
          <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
          <AdminRoute exact path="/admin/vendors-list" component={VendorList} />
          <AdminRoute exact path="/admin/vendor/:id" component={Vendor} />
          <AdminRoute exact path="/admin/category" component={Category} />
          <AdminRoute exact path="/admin/products" component={Products} />
          <AdminRoute exact path="/admin/groups" component={Groups} />
          <AdminRoute
            exact
            path="/admin/customers-list"
            component={CustomerListing}
          />
          <AdminRoute exact path="/admin/customer/:id" component={Customer} />
          <AdminRoute exact path="/admin/order-list" component={OrderList} />
          <AdminRoute
            exact
            path="/admin/transactions"
            component={Transaction}
          />
          <AdminRoute exact path="/admin/banners" component={Banners} />
          <AdminRoute exact path="/admin/banner/:id" component={EditBanner} />
          <AdminRoute
            exact
            path="/admin/banner/upload-banner/:id"
            component={BannerImage}
          />
          <AdminRoute exact path="/admin/catalog" component={Catalog} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
