import { SNACKBAR_CLEAR, SET_SNACKBAR } from "../types";

export const hideSnackBar = () => (dispatch) => {
	dispatch({ type: SNACKBAR_CLEAR });
};

export const showSnackBar = (alert, message) => (dispatch) => {
	dispatch({
		type: SET_SNACKBAR,
		payload: { alert: alert, message: message },
	});
};
