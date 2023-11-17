import {
	LOADING_GROUPS,
	GET_GROUP_LIST,
	DELETE_GROUP,
	SET_GROUP_VISIBILITY,
	SET_GROUPS_ERROR,
	CLEAR_GROUPS_ERROR,
} from "../types";

const initialState = {
	loading: false,
	error: null,
	groups: [],
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
	switch (action.type) {
		case LOADING_GROUPS:
			return {
				...state,
				loading: true,
			};
		case GET_GROUP_LIST:
			return {
				...state,
				loading: false,
				groups: action.payload,
			};
		case DELETE_GROUP:
			return {
				...state,
				groups: state.groups.filter((group) => group.code !== action.payload),
			};
		case SET_GROUP_VISIBILITY:
			return {
				...state,
				groups: state.groups.map((group) =>
					group.code === action.payload.code
						? { ...group, active: action.payload.active }
						: group
				),
			};
		case SET_GROUPS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_GROUPS_ERROR:
			return {
				...state,
				loading: false,
				error: null,
			};
		default:
			return state;
	}
}
