import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//react component
import { ConfirmDialog } from "../ConfirmDialog";

//redux Actions
import {
	deleteGroup,
	getGroupList,
	groupVisiblity,
} from "../../redux/actions/groupActions";

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

export const GroupListing = () => {
	const classes = useStyles();
	const { loading, groups } = useSelector((state) => state.group);
	const dispatch = useDispatch();

	const [groupCode, setGroupCode] = useState("");
	const [confirmOpen, setConfirmOpen] = useState(false);

	const handleClickOpen = (code) => {
		setConfirmOpen(true);
		setGroupCode(code);
	};

	const handleDeleteGroup = () => {
		dispatch(deleteGroup(groupCode));
	};

	const handleVisible = (visible, code) => {
		const visibleData = {
			active: visible,
			code: code,
		};

		dispatch(groupVisiblity(visibleData));
	};

	useEffect(() => {
		dispatch(getGroupList());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<StyledTableRow>
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
							) : groups && groups.length > 0 ? (
								<TableBody>
									{groups.map((grp, index) => (
										<StyledTableRow key={index}>
											<StyledTableCell component="th" scope="row">
												{grp.code}
											</StyledTableCell>
											<StyledTableCell component="th" scope="row">
												<Checkbox
													color="primary"
													checked={grp.active ? true : false}
													onChange={(e) =>
														handleVisible(e.target.checked, grp.code)
													}
													name="visible"
													size="small"
												/>
											</StyledTableCell>
											<StyledTableCell align="center">
												<IconButton
													color="secondary"
													aria-label="more"
													onClick={() => handleClickOpen(grp.code)}
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
										<StyledTableCell colSpan={3} className={classes.notfound}>
											Groups not found
										</StyledTableCell>
									</StyledTableRow>
								</TableBody>
							)}
						</Table>
					</TableContainer>
				</Grid>
			</Grid>

			<ConfirmDialog
				title="Delete Group?"
				open={confirmOpen}
				setOpen={setConfirmOpen}
				onConfirm={handleDeleteGroup}
			>
				Are you sure you want to delete this Group?{" "}
			</ConfirmDialog>
		</div>
	);
};
