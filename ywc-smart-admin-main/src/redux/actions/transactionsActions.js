import { LOADING_TRANSACTIONS, TRANSACTIONS_LIST } from "../types";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getTransactionsList = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_TRANSACTIONS });
    const { data } = await axios.get(
      `${baseUrl}//private/allOrderTranscations`
    );
    dispatch({ type: TRANSACTIONS_LIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
