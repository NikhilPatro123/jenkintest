import {
	LOADING_UI,
	SET_ERROR,
	CLEAR_ERRORS,
	SERVER_ERROR,
	SET_USER,
	SET_UNAUTHENTICATED,
	SET_AUTHENTICATED,
} from "../types";

const initialState = {
	authenticated: false,
	loading: false,
	serverError: false,
	error: null,
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
	switch (action.type) {
		case LOADING_UI:
			return {
				...state,
				loading: true,
			};
		case SET_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				error: null,
			};
		case SET_USER:
			return {
				authenticated: true,
				loading: false,
			};
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			};
		case SET_UNAUTHENTICATED:
			return initialState;
		case SERVER_ERROR:
			return {
				...state,
				loading: false,
				error: null,
				serverError: action.payload,
			};
		default:
			return state;
	}
}
