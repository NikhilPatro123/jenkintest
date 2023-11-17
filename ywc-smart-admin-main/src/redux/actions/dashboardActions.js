import { LOAD_DASHBOARD, SET_DASHBOARD_DATA } from "../types";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const dashboardData = () => async (dispatch) => {
	dispatch({ type: LOAD_DASHBOARD });
	const fetchVendors = await axios.get(
		`${baseUrl}/private/users/?count=1&page=1`
	);
	const fetchCategories = await axios.get(
		`${baseUrl}/category/?count=1&page=1`
	);
	const fetchGroups = await axios.get(`${baseUrl}/private/products/groups`);
	const fetchProducts = await axios.get(
		`${baseUrl}/filter/products/?pageSize=1&pageNumber=1`
	);
	const fetchCustomers = await axios.get(
		`${baseUrl}/private/customers/?count=1&page=1`
	);
	const fetchOrders = await axios.get(
		`${baseUrl}/admin/orders/?count=1&page=1`
	);

	Promise.all([
		fetchVendors,
		fetchCategories,
		fetchGroups,
		fetchProducts,
		fetchCustomers,
		fetchOrders,
	])
		.then(([vendors, categories, groups, products, customers, orders]) => {
			dispatch({
				type: SET_DASHBOARD_DATA,
				payload: {
					vendors: vendors.data.recordsTotal ? vendors.data.recordsTotal : 0,
					category: categories.data.recordsTotal
						? categories.data.recordsTotal
						: 0,
					groups: groups.data.length ? groups.data.length : 0,
					products: products.data.recordsTotal ? products.data.recordsTotal : 0,
					customers: customers.data.recordsTotal
						? customers.data.recordsTotal
						: 0,
					orders: orders.data.recordsTotal ? orders.data.recordsTotal : 0,
				},
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
