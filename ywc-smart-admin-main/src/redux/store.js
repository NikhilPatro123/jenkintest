import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//reducers
import adminReducer from "./reducers/adminReducer";
import vendorReducer from "./reducers/vendorReducer";
import categoryReducer from "./reducers/categoryReducer";
import snackbarReducer from "./reducers/snackbarReducer";
import groupReducer from "./reducers/groupReducer";
import customerReducer from "./reducers/customerReducer";
import productsReducer from "./reducers/productsReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import bannersReducer from "./reducers/bannersReducer";
import transactionsReducer from "./reducers/transactionsReducer";
import orderReducer from "./reducers/orderReducer";
import catalogReducer from "./reducers/catalogReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  auth: adminReducer,
  vendorlist: vendorReducer,
  Category: categoryReducer,
  snackbar: snackbarReducer,
  group: groupReducer,
  Customer: customerReducer,
  Products: productsReducer,
  Dashboard: dashboardReducer,
  Banners: bannersReducer,
  Transaction: transactionsReducer,
  Orders: orderReducer,
  Catalog: catalogReducer
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
