import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//react component
import { ConfirmDialog } from "../ConfirmDialog";

// redux action
import {
	deleteCategory,
	getCategories,
	updateCategoryVisibality,
} from "../../redux/actions/categoryActions";

// material ui
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";

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
		minWidth: 650,
	},
	notfound: {
		fontSize: 14,
		fontWeight: 500,
		fontFamily: "Montserrat",
		opacity: 0.6,
		textAlign: "center",
	},
	deletebutton: {
		backgroundColor: "transparent",
		color: "#DD5144",
		borderRadius: 4,
	},
	detailsbutton: {
		backgroundColor: "#3f51b5",
		textTransform: "none",
		color: "#fff",
		fontFamily: "Montserrat",
		fontWeight: 500,
	},
}));

export const CategoryList = () => {
	const classes = useStyles();
	const { loading, categoryList } = useSelector((state) => state.Category);
	const dispatch = useDispatch();

	const [categoryId, setCategoryId] = useState("");
	const [confirmOpen, setConfirmOpen] = useState(false);

	const handleClickOpen = (id) => {
		setConfirmOpen(true);
		setCategoryId(id);
	};

	const handleDeleteCategory = () => {
		dispatch(deleteCategory(categoryId));
	};

	const handleVisible = (visibality, data) => {
		const visibledata = {
			code: data.code,
			descriptions: [
				{
					description: data.description.description,
					friendlyUrl: data.description.friendlyUrl,
					highlights: data.description.highlights,
					language: "en",
					metaDescription: data.description.metaDescription,
					name: data.description.name,
					title: data.description.title,
				},
			],
			visible: visibality,
		};

		dispatch(updateCategoryVisibality(data.id, visibledata, visibality));
	};

	useEffect(() => {
		dispatch(getCategories());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<StyledTableRow>
									<StyledTableCell align="left">ID</StyledTableCell>
									<StyledTableCell align="left">Name</StyledTableCell>
									<StyledTableCell align="left">Code</StyledTableCell>
									<StyledTableCell align="left">Visible</StyledTableCell>
									<StyledTableCell align="center">Actions</StyledTableCell>
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
							) : Object.keys(categoryList).length > 0 &&
							  categoryList.categories.length > 0 ? (
								<TableBody>
									{categoryList.categories.map((category) => (
										<StyledTableRow key={category.id}>
											<StyledTableCell component="th" scope="row">
												{category.id}
											</StyledTableCell>
											<StyledTableCell align="left">
												{category.description.title}
											</StyledTableCell>
											<StyledTableCell align="left">
												{category.code}
											</StyledTableCell>
											<StyledTableCell align="left">
												{/* {category.visible ? "true" : "false"} */}
												<Checkbox
													color="primary"
													checked={category.visible ? true : false}
													onChange={(e) =>
														handleVisible(e.target.checked, category)
													}
													name="visible"
													size="small"
												/>
											</StyledTableCell>
											<StyledTableCell align="center">
												<IconButton
													color="secondary"
													aria-label="more"
													onClick={() => handleClickOpen(category.id)}
												>
													<DeleteIcon className={classes.deletebutton} />
												</IconButton>
											</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							) : (
								<TableBody>
									<StyledTableRow>
										<StyledTableCell colSpan={6} className={classes.notfound}>
											Categories not found
										</StyledTableCell>
									</StyledTableRow>
								</TableBody>
							)}
						</Table>
					</TableContainer>
				</Grid>
			</Grid>

			<ConfirmDialog
				title="Delete Category?"
				open={confirmOpen}
				setOpen={setConfirmOpen}
				onConfirm={handleDeleteCategory}
			>
				Are you sure you want to delete this Category?{" "}
			</ConfirmDialog>
		</div>
	);
};
