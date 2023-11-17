import { LOADING_PRODUCTS, PRODUCTS_DELETED, PRODUCTS_DELETE_CALL, PRODUCTS_DELETE_ERROR, PRODUCTS_LIST } from "../types";

import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getProductList = (count, page) => async (dispatch) => {
	try {
		dispatch({ type: LOADING_PRODUCTS });
		const { data } = await axios.get(
			`${baseUrl}/filter/products/?pageSize=${count}&pageNumber=${page}`
		);
		dispatch({ type: PRODUCTS_LIST, payload: data });
	} catch (error) {
		console.log(error);
	}
};



export const  deleteProduct = (productId , productsList) => async(dispatch) => {
	try {
		dispatch({ type: PRODUCTS_DELETE_CALL });
		const { data } = await axios.delete(
			`${baseUrl}/private/product/${productId}`
		);
		
		let filteredProductList = productsList.products.filter(prod => prod.id !== productId);
		productsList.products = filteredProductList;
		dispatch({ type: PRODUCTS_DELETED, payload: productsList });

	} catch (error) {
		console.log(error);
		dispatch({ type: PRODUCTS_DELETE_ERROR, payload: "Error in delete" });
	}

	
};
