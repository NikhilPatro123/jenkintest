import {
	LOADING_CATEGORIES,
	GET_CATEGORIES_LIST,
	DELETE_CATEGORY,
	SET_CATEGORY_VISIBILITY,
	SET_CATEGORIES_ERROR,
	CLEAR_CATEGORIES_ERROR,
} from "../types";

const initialState = {
	loading: false,
	error: null,
	categoryList: {},
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
	switch (action.type) {
		case LOADING_CATEGORIES:
			return {
				...state,
				loading: true,
			};
		case SET_CATEGORIES_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_CATEGORIES_ERROR:
			return {
				...state,
				loading: false,
				error: null,
			};
		case GET_CATEGORIES_LIST:
			return {
				...state,
				loading: false,
				categoryList: action.payload,
			};
		case DELETE_CATEGORY:
			return {
				...state,
				categoryList: {
					...state.categoryList,
					categories: [
						...state.categoryList.categories.filter(
							(category) => category.id !== action.payload
						),
					],
				},
			};
		case SET_CATEGORY_VISIBILITY:
			return {
				...state,
				categoryList: {
					...state.categoryList,
					categories: [
						...state.categoryList.categories.map((category) =>
							category.id === action.payload.id
								? { ...category, visible: action.payload.visible }
								: category
						),
					],
				},
			};
		default:
			return state;
	}
}
