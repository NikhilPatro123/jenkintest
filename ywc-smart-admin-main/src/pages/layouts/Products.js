import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../../components/NavBar";

//redux actions
import { getProductList , deleteProduct } from "../../redux/actions/productActions";

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
		"& .MuiTabPanel-root": {
			textAlign: "center",
		},
		"& .Mui-selected": {
			color: "#3f51b5",
		},
	},
	indicator: {
		backgroundColor: "#3f51b5",
	},
	noFound: {
		color: "#030104",
		textAlign: "center",
		fontFamily: "Montserrat",
		fontWeight: 500,
	},
	deletebutton: {
		backgroundColor: "transparent",
		color: "#DD5144",
		borderRadius: 4,
	},
}));

export const Products = () => {
	const classes = useStyles();
	const { loading, productsList } = useSelector((state) => state.Products);
	const dispatch = useDispatch();

	const rowsPerPage = 10;
	const [page, setPage] = useState(1);

	const handleChangePage = (event, newValue) => {
		setPage(newValue);
	};

	useEffect(() => {
		dispatch(getProductList(rowsPerPage, page));
	}, [page]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleDelete = (productId , productsList) => {
		dispatch(deleteProduct(productId , productsList));
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<NavBar title={"Products"} tabId={"6"} />
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
											<StyledTableCell align="right">Name</StyledTableCell>
											<StyledTableCell align="right">sku</StyledTableCell>
											<StyledTableCell align="right">Category</StyledTableCell>
											<StyledTableCell align="right">Type</StyledTableCell>
											<StyledTableCell align="right">Actions</StyledTableCell>
										</StyledTableRow>
									</TableHead>

									{loading ? (
										<TableBody>
											<StyledTableRow>
												<StyledTableCell align="center" colSpan={6}>
													<CircularProgress />
												</StyledTableCell>
											</StyledTableRow>
										</TableBody>
									) : Object.keys(productsList).length > 0 &&
									  productsList.products.length > 0 ? (
										<TableBody>
											{productsList.products.map((product) => (
												<StyledTableRow key={product.id}>
													<StyledTableCell align="right">
														{product.id}
													</StyledTableCell>
													<StyledTableCell align="right">
														{product.description.title}
													</StyledTableCell>
													<StyledTableCell align="right">
														{product.sku}
													</StyledTableCell>
													<StyledTableCell align="right">
														{product.categories[0].code}
													</StyledTableCell>
													<StyledTableCell align="right">
														{product.bargain === "YES" ? "Bargained" : "Fixed"}
													</StyledTableCell>
													<StyledTableCell align="right">
														<IconButton color="primary" aria-label="more" onClick={() => handleDelete(product.id , productsList)}>
															<DeleteIcon className={classes.deletebutton} />
														</IconButton>
													</StyledTableCell>
												</StyledTableRow>
											))}
										</TableBody>
									) : (
										<TableBody>
											<StyledTableRow>
												<StyledTableCell
													colSpan={6}
													className={classes.noFound}
												>
													Products not found
												</StyledTableCell>
											</StyledTableRow>
										</TableBody>
									)}
								</Table>
							</TableContainer>
						</Grid>

						{Object.keys(productsList).length > 0 &&
							productsList.products.length > 0 &&
							productsList.totalPages > 1 && (
								<Grid item xs={12}>
									<Grid container justify="center">
										<Pagination
											page={page}
											variant="outlined"
											shape="rounded"
											count={productsList.totalPages}
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
