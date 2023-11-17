import { SET_SNACKBAR, SNACKBAR_CLEAR } from "../types";

const initialState = {
	snackbarOpen: false,
	snackbarType: "",
	snackbarMessage: "",
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_SNACKBAR:
			return {
				...state,
				snackbarOpen: true,
				snackbarType: action.payload.alert,
				snackbarMessage: action.payload.message,
			};
		case SNACKBAR_CLEAR:
			return {
				...state,
				snackbarOpen: false,
				snackbarType: "",
				snackbarMessage: "",
			};
		default:
			return state;
	}
}
