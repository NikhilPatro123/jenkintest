import { LOAD_DASHBOARD, SET_DASHBOARD_DATA } from "../types";

const initialState = {
	loading: false,
	error: null,
	vendors: "",
	category: "",
	groups: "",
	products: "",
	customers: "",
	orders: "",
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
	switch (action.type) {
		case LOAD_DASHBOARD:
			return {
				...state,
				loading: true,
			};
		case SET_DASHBOARD_DATA:
			return {
				...state,
				loading: false,
				vendors: action.payload.vendors,
				category: action.payload.category,
				groups: action.payload.groups,
				products: action.payload.products,
				customers: action.payload.customers,
				orders: action.payload.orders,
			};
		default:
			return state;
	}
}
