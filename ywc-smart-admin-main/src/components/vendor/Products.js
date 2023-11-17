import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//react components
import { ConfirmDialog } from "../ConfirmDialog";

//redux actions
import {
	deleteVendorProduct,
	getVendorProducts,
} from "../../redux/actions/vendorAction";

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
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

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
	large: {
		width: theme.spacing(8),
		height: theme.spacing(8),
	},
	deletebutton: {
		backgroundColor: "transparent",
		color: "#DD5144",
		borderRadius: 4,
	},
}));

const imageUrl = "http://104.237.9.45:32122";

export const Products = () => {
	const classes = useStyles();
	const params = useParams();
	const { loading, vendorProducts } = useSelector((state) => state.vendorlist);
	const dispatch = useDispatch();

	const [productId, setProductId] = useState("");
	const [confirmOpen, setConfirmOpen] = useState(false);

	const handleClickOpen = (id) => {
		setConfirmOpen(true);
		setProductId(id);
	};

	const handleDelete = () => {
		dispatch(deleteVendorProduct(productId));
	};

	useEffect(() => {
		dispatch(getVendorProducts(params.id));
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			{loading ? (
				<CircularProgress />
			) : vendorProducts.products && vendorProducts.products.length > 0 ? (
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<StyledTableRow>
										<StyledTableCell align="center">ID</StyledTableCell>
										<StyledTableCell align="center">Image</StyledTableCell>
										<StyledTableCell align="center">
											Product name
										</StyledTableCell>
										<StyledTableCell align="center">Category</StyledTableCell>
										<StyledTableCell align="center">Price</StyledTableCell>
										<StyledTableCell align="center">Type</StyledTableCell>
										<StyledTableCell align="center">Actions</StyledTableCell>
									</StyledTableRow>
								</TableHead>

								<TableBody>
									{vendorProducts.products.map((product) => (
										<StyledTableRow key={product.id}>
											<StyledTableCell align="center">
												{product.id}
											</StyledTableCell>
											<StyledTableCell align="center">
												{product.image ? (
													<Avatar
														alt={product.description.title}
														src={`${imageUrl}${product.image.imageUrl}`}
														className={classes.large}
													/>
												) : (
													""
												)}
											</StyledTableCell>
											<StyledTableCell align="center">
												{product.description.title}
											</StyledTableCell>
											<StyledTableCell align="center">
												{product.categories[0].code}
											</StyledTableCell>
											<StyledTableCell align="center">
												{product.price}
											</StyledTableCell>
											<StyledTableCell align="center">
												{product.bargain === "YES" ? "BARGAIN" : "FIXED"}
											</StyledTableCell>
											<StyledTableCell align="center">
												<IconButton
													aria-label="delete"
													onClick={(e) => handleClickOpen(product.id)}
												>
													<DeleteForeverIcon className={classes.deletebutton} />
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
				<Typography className={classes.notfound}>Products not found</Typography>
			)}

			<ConfirmDialog
				title="Delete Product?"
				open={confirmOpen}
				setOpen={setConfirmOpen}
				onConfirm={handleDelete}
			>
				Are you sure you want to delete this Product?{" "}
			</ConfirmDialog>
		</div>
	);
};
