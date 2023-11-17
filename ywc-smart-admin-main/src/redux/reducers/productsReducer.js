import {
	LOADING_PRODUCTS,
	PRODUCTS_LIST,
	PRODUCTS_ERROR,
	CLERAR_PRODUCTS_ERROR,
	PRODUCTS_DELETE_CALL,
	PRODUCTS_DELETED,
	PRODUCTS_DELETE_ERROR
} from "../types";

const initialState = {
	loading: false,
	error: null,
	productsList: {},
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
	switch (action.type) {
		case LOADING_PRODUCTS:
			return {
				...state,
				loading: true,
			};
		case PRODUCTS_LIST:
			return {
				...state,
				loading: false,
				productsList: action.payload,
			};
		case PRODUCTS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLERAR_PRODUCTS_ERROR:
			return {
				...state,
				loading: false,
				error: null,
			};
		case PRODUCTS_DELETE_CALL:
				return {
			...state,
			loading: true,
			error: null,
		};
		case PRODUCTS_DELETED:
				return {
			...state,
			loading: false,
			error: null
		};
		case PRODUCTS_DELETE_ERROR:
				return {
			...state,
			loading: false,
			error: action.payload,
		};
		default:
			return state;
	}
}
