import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//redux actions
import { customerOrders } from "../../redux/actions/customerActions";

// material ui
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: "#3f51b5",
		color: "#fff",
		fontFamily: "Montserrat",
		fontSize: 13,
		fontWeight: "bold",
		letterSpacing: 1,
	},
	body: {
		fontSize: 13,
		fontFamily: "Montserrat",
		color: "#2d2b2b",
		fontWeight: 500,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(even)": {
			backgroundColor: "#eeeeee",
		},
	},
}))(TableRow);

const useStyles = makeStyles((theme) => ({
	table: {
		"& .MuiAvatar-img": {
			width: "90%",
			height: "90%",
			objectFit: "contain",
		},
	},
	notfound: {
		fontSize: 16,
		fontWeight: 500,
		fontFamily: "Montserrat",
		opacity: 0.6,
	},
	viewbutton: {
		backgroundColor: "transparent",
		color: "#3f51b5",
	},
}));

export const Orders = () => {
	const classes = useStyles();
	const params = useParams();
	const { loading, orders } = useSelector((state) => state.Customer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(customerOrders(params.id));
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Fragment>
			{loading ? (
				<CircularProgress />
			) : orders.orders && orders.orders.length > 0 ? (
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<StyledTableRow>
										<StyledTableCell align="center">ID</StyledTableCell>
										<StyledTableCell align="center">Total</StyledTableCell>
										<StyledTableCell align="center">Order Date</StyledTableCell>
										<StyledTableCell align="center">Status</StyledTableCell>
										<StyledTableCell align="center">Details</StyledTableCell>
									</StyledTableRow>
								</TableHead>

								<TableBody>
									{orders.orders.map((order) => (
										<StyledTableRow key={order.id}>
											<StyledTableCell
												component="th"
												align="center"
												scope="row"
											>
												{order.id}
											</StyledTableCell>
											<StyledTableCell
												component="th"
												align="center"
												scope="row"
											>
												{order.total.value}
											</StyledTableCell>
											<StyledTableCell
												component="th"
												align="center"
												scope="row"
											>
												{new Date(order.datePurchased).toLocaleDateString()}
											</StyledTableCell>
											<StyledTableCell
												component="th"
												align="center"
												scope="row"
											>
												{order.orderStatus}
											</StyledTableCell>
											<StyledTableCell
												component="th"
												align="center"
												scope="row"
											>
												<IconButton
													color="secondary"
													aria-label="more"
													// onClick={() => handleClickOpen(category.id)}
												>
													<VisibilityIcon className={classes.viewbutton} />
												</IconButton>
											</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			) : (
				<Typography className={classes.notfound}>Orders not found</Typography>
			)}
		</Fragment>
	);
};
