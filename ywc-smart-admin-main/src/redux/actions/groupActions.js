import {
	LOADING_GROUPS,
	GET_GROUP_LIST,
	SET_GROUP_VISIBILITY,
	DELETE_GROUP,
	SET_SNACKBAR,
} from "../types";

import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getGroupList = () => async (dispatch) => {
	try {
		dispatch({ type: LOADING_GROUPS });
		const { data } = await axios.get(`${baseUrl}/private/products/groups`);
		dispatch({ type: GET_GROUP_LIST, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deleteGroup = (code) => async (dispatch) => {
	try {
		await axios.delete(`${baseUrl}/products/group/${code}`);
		dispatch({ type: DELETE_GROUP, payload: code });
	} catch (error) {
		console.log(error);
	}
};

export const createGroup = (groupData) => async (dispatch) => {
	try {
		await axios.post(`${baseUrl}/private/products/group`, groupData);
		dispatch({
			type: SET_SNACKBAR,
			payload: { alert: "success", message: "Group created successfully" },
		});
	} catch (error) {
		console.log(error);
	}
};

export const groupVisiblity = (visibleData) => async (dispatch) => {
	try {
		await axios.patch(
			`${baseUrl}/private/products/group/${visibleData.code}`,
			visibleData
		);
		dispatch({ type: SET_GROUP_VISIBILITY, payload: visibleData });
	} catch (error) {
		console.log(error);
	}
};
