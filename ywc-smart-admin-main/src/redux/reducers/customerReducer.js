import {
	CUSTOMER_LODING,
	SET_CUSTOMER_LIST,
	CUSTOMER_PROFILE,
	CUSTOMER_ORDERS,
	SET_CUSTOMER_ERROR,
	CLEAR_CUSTOMER_ERROR,
} from "../types";

const initialState = {
	loading: false,
	error: null,
	customers: {},
	profile: {},
	orders: {},
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
	switch (action.type) {
		case CUSTOMER_LODING:
			return {
				...state,
				loading: true,
			};
		case SET_CUSTOMER_LIST:
			return {
				...state,
				loading: false,
				customers: action.payload,
			};
		case CUSTOMER_PROFILE:
			return {
				...state,
				loading: false,
				profile: action.payload,
			};
		case CUSTOMER_ORDERS:
			return {
				...state,
				loading: false,
				orders: action.payload,
			};
		case SET_CUSTOMER_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_CUSTOMER_ERROR:
			return {
				...state,
				loading: false,
				error: null,
			};
		default:
			return state;
	}
}
