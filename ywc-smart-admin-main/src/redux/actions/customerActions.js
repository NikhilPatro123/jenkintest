import {
	CUSTOMER_LODING,
	SET_CUSTOMER_LIST,
	CUSTOMER_PROFILE,
	CUSTOMER_ORDERS,
	CLEAR_CUSTOMER_ERROR,
} from "../types";

import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getAllCustomers = (rowsPerPage, page) => async (dispatch) => {
	try {
		dispatch({ type: CUSTOMER_LODING });
		const { data } = await axios.get(
			`${baseUrl}/private/customers/?count=${rowsPerPage}&page=${page}`
		);
		dispatch({ type: SET_CUSTOMER_LIST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const customerProfile = (id) => async (dispatch) => {
	try {
		dispatch({ type: CUSTOMER_LODING });
		const { data } = await axios.get(`${baseUrl}/private/customer/${id}`);
		dispatch({ type: CUSTOMER_PROFILE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const customerOrders = (id) => async (dispatch) => {
	try {
		dispatch({ type: CUSTOMER_LODING });
		const { data } = await axios.get(
			`${baseUrl}/private/orders/customers/${id}`
		);
		dispatch({ type: CUSTOMER_ORDERS, payload: data });
		dispatch({ type: CLEAR_CUSTOMER_ERROR });
	} catch (error) {
		if (error.response.status === 500) {
			dispatch({ type: CUSTOMER_ORDERS, payload: {} });
		} else {
			console.log(error);
		}
	}
};
