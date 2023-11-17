import {
	LOADING_VENDOR_LIST,
	SET_VENDORS_LIST,
	SET_VENDOR_ERROR,
	CLEAR_VENDOR_LIST_ERROR,
	SET_VENDOR_PROFILE,
	SET_VENDOR_PRODUCTS,
	UPDATE_VENDOR_STATUS,
	DELETE_VENDOR_PRODUCT,
	DELETE_VENDOR,
} from "../types";

const initialState = {
	loading: false,
	error: null,
	vendorList: {},
	vendorProfile: {},
	vendorProducts: {},
};

/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function (state = initialState, action) {
	switch (action.type) {
		case LOADING_VENDOR_LIST:
			return {
				...state,
				loading: true,
			};
		case SET_VENDOR_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_VENDOR_LIST_ERROR:
			return {
				...state,
				loading: false,
				error: null,
			};
		case SET_VENDORS_LIST:
			return {
				...state,
				vendorList: action.payload,
				loading: false,
			};
		case SET_VENDOR_PROFILE:
			return {
				...state,
				vendorProfile: action.payload,
				loading: false,
			};
		case SET_VENDOR_PRODUCTS:
			return {
				...state,
				vendorProducts: action.payload,
				loading: false,
			};
		case UPDATE_VENDOR_STATUS:
			return {
				...state,
				vendorProfile:
					state.vendorProfile.id === action.payload.id
						? { ...state.vendorProfile, userStatus: action.payload.userStatus }
						: state.vendorProfile,
			};
		case DELETE_VENDOR_PRODUCT:
			return {
				...state,
				vendorProducts: {
					...state.vendorProducts,
					products: [
						...state.vendorProducts.products.filter(
							(item) => item.id !== action.payload
						),
					],
				},
			};
		case DELETE_VENDOR:
			return {
				...state,
				vendorList: {
					...state.vendorList,
					data: [
						...state.vendorList.data.filter(
							(vendor) => vendor.id !== action.payload
						),
					],
				},
			};
		default:
			return state;
	}
}
