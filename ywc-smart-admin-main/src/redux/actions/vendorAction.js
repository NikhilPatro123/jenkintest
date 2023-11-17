import {
	LOADING_VENDOR_LIST,
	SET_VENDORS_LIST,
	// SET_VENDOR_ERROR,
	CLEAR_VENDOR_LIST_ERROR,
	SET_VENDOR_PROFILE,
	SET_VENDOR_PRODUCTS,
	UPDATE_VENDOR_STATUS,
	DELETE_VENDOR_PRODUCT,
	DELETE_VENDOR,
} from "../types";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getAllVendors = (rowsPerPage, page) => async (dispatch) => {
	try {
		dispatch({ type: LOADING_VENDOR_LIST });
		const { data } = await axios.get(
			`${baseUrl}/private/users/?count=${rowsPerPage}&page=${page}`
		);
		dispatch({ type: SET_VENDORS_LIST, payload: data });
		dispatch({ type: CLEAR_VENDOR_LIST_ERROR });
	} catch (error) {
		console.log(error);
	}
};

export const deleteVendor = (vendorId) => async (dispatch) => {
	try {
		await axios.delete(`${baseUrl}/private/user/soft/${vendorId}`);
		dispatch({ type: DELETE_VENDOR, payload: vendorId });
	} catch (error) {
		console.log(error);
	}
};

export const getVendorProfile = (id) => async (dispatch) => {
	try {
		dispatch({ type: LOADING_VENDOR_LIST });
		const { data } = await axios.get(`${baseUrl}/private/users/${id}`);
		dispatch({ type: SET_VENDOR_PROFILE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const getVendorProducts = (id) => async (dispatch) => {
	try {
		dispatch({ type: LOADING_VENDOR_LIST });
		const { data } = await axios.get(
			`${baseUrl}/products/byUser?lang=en&userId=${id}`
		);
		dispatch({ type: SET_VENDOR_PRODUCTS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updateVendorStatus = (status, id) => async (dispatch) => {
	try {
		const { data } = await axios.patch(
			`${baseUrl}/private/user/${id}/status`,
			status
		);
		dispatch({ type: UPDATE_VENDOR_STATUS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deleteVendorProduct = (id) => async (dispatch) => {
	try {
		await axios.delete(`${baseUrl}/private/product/${id}`);
		dispatch({ type: DELETE_VENDOR_PRODUCT, payload: id });
	} catch (error) {
		console.log(error);
	}
};
