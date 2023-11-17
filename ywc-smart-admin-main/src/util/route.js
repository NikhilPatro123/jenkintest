import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const AuthRoute = ({ component: Component, ...rest }) => {
	const { authenticated } = useSelector((state) => state.auth);

	return (
		<Route
			{...rest}
			render={(props) =>
				authenticated === true ? (
					<Redirect to="/admin/dashboard" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export const AdminRoute = ({ component: Component, ...rest }) => {
	const { authenticated } = useSelector((state) => state.auth);

	return (
		<Route
			{...rest}
			render={(props) =>
				authenticated === false ? (
					<Redirect to="/adminui" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};
