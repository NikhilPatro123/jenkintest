import {
	CLEAR_CATALOG_ERROR,
	EDIT_CATALOG,
	EDIT_CATALOG_DATA_SET,
	ERROR_LOADING_PRODUCTS_FOR_CATEGORY,
	GET_CATALOG_LIST,
	LOADING_CATALOGS,
	SET_CATALOG_ERROR,
	SET_CATEGORY_ID,
	SET_PRODUCTS_LIST_FETCHED,
	SET_SELECTED_PRODUCTS_LIST,
	SET_UNSELECTED_PRODUCT_LIST
} from "../types";


const initialState = {
	loading: false,
	error: null,
	catalogsList: {},
	editCatalog : "",
	productsList : [],
	allProductsList : [],
	selectedProductsList : [],
	selectedCategoryId: 0
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
	switch (action.type) {
		case LOADING_CATALOGS:
			return {
				...state,
				loading: true,
			};
		case GET_CATALOG_LIST:
			return {
				...state,
				catalogsList: action.payload,
				loading: false,
			};
		case EDIT_CATALOG:
			return {
				...state,
				editCatalog: action.payload,
			};
		case SET_CATALOG_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_CATALOG_ERROR:
			return {
				...state,
				loading: false,
				error: null,
			};
		case SET_PRODUCTS_LIST_FETCHED:
			return {
				...state,
				loading: false,
				productsList: action.payload.productsList,
				allProductsList : action.payload.allProductsList,
				error: null,
			};
		case ERROR_LOADING_PRODUCTS_FOR_CATEGORY:
			return {
				...state,
				loading: false,
				productsList: [],
				error: action.payload,
			};
		case SET_SELECTED_PRODUCTS_LIST:
			return {
				...state,
				loading: false,
				selectedProductsList: action.payload,
				error: null,
			};
		case  SET_UNSELECTED_PRODUCT_LIST:
			return {
				...state,
				loading: false,
				productsList: action.payload,
				error: null,
			};
		case  SET_CATEGORY_ID:
			return {
				...state,
				loading: false,
				selectedCategoryId: action.payload,
				error: null,
			};
		case EDIT_CATALOG_DATA_SET:
			return {
				...state,
				loading:false,
				selectedProductsList: action.payload.selectedProductsList,
				selectedCategoryId: action.payload.selectedCategoryId
			};
		default:
			return state;
	}
}
