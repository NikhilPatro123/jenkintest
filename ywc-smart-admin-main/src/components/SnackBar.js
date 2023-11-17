import React from "react";
import { useDispatch, useSelector } from "react-redux";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { hideSnackBar } from "../redux/actions/SnackbarActions";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	snackroot: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

export const SnackBar = () => {
	const classes = useStyles();
	const { snackbarOpen, snackbarType, snackbarMessage } = useSelector(
		(state) => state.snackbar
	);
	const dispatch = useDispatch();

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		dispatch(hideSnackBar());
	};

	return (
		<div className={classes.snackroot}>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity={snackbarType ? snackbarType : "success"}
					style={
						snackbarType === "success"
							? { backgroundColor: "#4caf50" }
							: snackbarType === "error"
							? { backgroundColor: "#f44336" }
							: snackbarType === "warning"
							? { backgroundColor: "#ff9800" }
							: { backgroundColor: "#4caf50" }
					}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};
