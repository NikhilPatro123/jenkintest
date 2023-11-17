import { ORDER_LOADING, ORDER_LOADED, ORDER_LOADING_ERROR } from "../types";

const initialState = {
	loading: false,
	error: null,
	ordersList: {},
};


/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
	switch (action.type) {
		case ORDER_LOADING:
			return {
				...state,
				loading: true,
			};
		case ORDER_LOADED:
			return {
				...state,
				loading: false,
				ordersList: action.payload,
			};
		case ORDER_LOADING_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
}
