import { LOADING_TRANSACTIONS, TRANSACTIONS_LIST } from "../types";

const initialState = {
  loading: false,
  transactions: {},
  error: null,
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_TRANSACTIONS:
      return {
        ...state,
        loading: true,
      };
    case TRANSACTIONS_LIST:
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    default:
      return state;
  }
}
