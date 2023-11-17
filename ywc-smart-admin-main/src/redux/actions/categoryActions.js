import {
	LOADING_CATEGORIES,
	GET_CATEGORIES_LIST,
	DELETE_CATEGORY,
	SET_CATEGORY_VISIBILITY,
	SET_SNACKBAR,
	// SET_CATEGORIES_ERROR,
	// CLEAR_CATEGORIES_ERROR,
} from "../types";

import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getCategories = () => async (dispatch) => {
	try {
		dispatch({ type: LOADING_CATEGORIES });
		const { data } = await axios.get(`${baseUrl}/category`);
		dispatch({ type: GET_CATEGORIES_LIST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const createCategory = (categoryData) => async (dispatch) => {
	try {
		await axios.post(`${baseUrl}/private/category`, categoryData);
		dispatch({
			type: SET_SNACKBAR,
			payload: { alert: "success", message: "Category created successfully" },
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteCategory = (id) => async (dispatch) => {
	try {
		await axios.delete(`${baseUrl}/private/category/${id}`);
		dispatch({ type: DELETE_CATEGORY, payload: id });
	} catch (error) {
		console.log(error);
	}
};

export const updateCategoryVisibality = (id, visibleData, visible) => async (
	dispatch
) => {
	try {
		await axios.patch(`${baseUrl}/private/category/${id}/visible`, visibleData);
		dispatch({
			type: SET_CATEGORY_VISIBILITY,
			payload: { id: id, visible: visible },
		});
	} catch (error) {
		console.log(error);
	}
};
