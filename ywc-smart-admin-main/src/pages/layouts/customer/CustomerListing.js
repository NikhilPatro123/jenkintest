import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//react components
import { NavBar } from "../../../components/NavBar";

// redux actions
import { getAllCustomers } from "../../../redux/actions/customerActions";

// material ui
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";

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
	root: {
		display: "flex",
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	table: {
		minWidth: 650,
	},
	noFound: {
		color: "#030104",
		textAlign: "center",
		fontFamily: "Montserrat",
		fontWeight: 500,
	},
	statustext: {
		textAlign: "center",
		fontFamily: "Montserrat",
		fontSize: 10,
		fontWeight: "bold",
		border: "1px solid ",
		padding: 2,
		borderRadius: 6,
		color: "#fff",
		textTransform: "uppercase",
	},
	morebutton: {
		backgroundColor: "#3f51b5",
		color: "#fff",
		borderRadius: 4,
	},
	deletebutton: {
		backgroundColor: "transparent",
		color: "#DD5144",
		borderRadius: 4,
	},
}));

export const CustomerListing = () => {
	const classes = useStyles();
	const history = useHistory();
	const { loading, customers } = useSelector((state) => state.Customer);
	const dispatch = useDispatch();

	const rowsPerPage = 10;
	const [page, setPage] = useState(1);

	const handleChangePage = (event, newValue) => {
		setPage(newValue);
	};

	const handleMoreButton = (customerId) => {
		history.push(`/admin/customer/${customerId}`);
	};

	useEffect(() => {
		dispatch(getAllCustomers(rowsPerPage, page));
	}, [page]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className={classes.root}>
			<CssBaseline />
			<NavBar title={"Customers"} tabId={"5"} />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label="simple table">
									<TableHead>
										<StyledTableRow>
											<StyledTableCell align="right">ID</StyledTableCell>
											<StyledTableCell align="right">
												First name
											</StyledTableCell>
											<StyledTableCell align="right">Last Name</StyledTableCell>
											<StyledTableCell align="right">Email</StyledTableCell>
											<StyledTableCell align="right">User type</StyledTableCell>
											<StyledTableCell align="right">Actions</StyledTableCell>
											<StyledTableCell align="right">More</StyledTableCell>
										</StyledTableRow>
									</TableHead>

									{loading ? (
										<TableBody>
											<StyledTableRow>
												<StyledTableCell align="center" colSpan={7}>
													<CircularProgress />
												</StyledTableCell>
											</StyledTableRow>
										</TableBody>
									) : Object.keys(customers).length > 0 &&
									  customers.customers.length > 0 ? (
										<TableBody>
											{customers.customers.map((customer, index) => (
												<StyledTableRow key={index}>
													<StyledTableCell align="right">
														{customer.id}
													</StyledTableCell>
													<StyledTableCell align="right">
														{customer.firstName}
													</StyledTableCell>
													<StyledTableCell align="right">
														{customer.lastName ? customer.lastName : "-"}
													</StyledTableCell>
													<StyledTableCell align="right">
														{customer.emailAddress}
													</StyledTableCell>
													<StyledTableCell align="right">
														{customer.userType ? customer.userType : "-"}
													</StyledTableCell>
													<StyledTableCell align="right">
														<IconButton
															color="primary"
															aria-label="more"
															// onClick={() => handleClickOpen(vendor.id)}
														>
															<DeleteIcon className={classes.deletebutton} />
														</IconButton>
													</StyledTableCell>
													<StyledTableCell align="right">
														<IconButton
															color="primary"
															aria-label="more"
															onClick={() => handleMoreButton(customer.id)}
														>
															<MoreVertIcon className={classes.morebutton} />
														</IconButton>
													</StyledTableCell>
												</StyledTableRow>
											))}
										</TableBody>
									) : (
										<TableBody>
											<StyledTableRow>
												<StyledTableCell
													colSpan={7}
													className={classes.noFound}
												>
													Customers not found
												</StyledTableCell>
											</StyledTableRow>
										</TableBody>
									)}
								</Table>
							</TableContainer>
						</Grid>

						{Object.keys(customers).length > 0 &&
							customers.customers.length > 0 &&
							customers.totalPages > 1 && (
								<Grid item xs={12}>
									<Grid container justify="center">
										<Pagination
											page={page}
											variant="outlined"
											shape="rounded"
											count={customers.totalPages}
											onChange={handleChangePage}
										/>
									</Grid>
								</Grid>
							)}
					</Grid>
				</Container>
			</main>
		</div>
	);
};
