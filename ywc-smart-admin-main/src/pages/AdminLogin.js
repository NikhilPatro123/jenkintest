import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//redux actions
import { adminLogin } from "../redux/actions/authActions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
	loginroot: {
		"& .MuiFormHelperText-root": {
			color: "red",
			fontFamily: "Montserrat",
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	signinlable: {
		fontFamily: "Montserrat",
	},
	labelRoot: {
		fontSize: "14px",
		fontFamily: "Montserrat",
		fontWeight: 400,
		color: "#666666",
	},
}));

export const AdminLogin = () => {
	const classes = useStyles();
	const { loading, error, serverError } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formErrors, setFormErrors] = useState({});

	const handleInputsValidation = () => {
		let formErrors = {};
		let inputsValid = true;

		if (!email) {
			inputsValid = false;
			formErrors["email"] = "e-mail is required";
		}

		if (!password) {
			inputsValid = false;
			formErrors["password"] = "password is required";
		}

		setFormErrors(formErrors);
		return inputsValid;
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (handleInputsValidation()) {
			const adminData = {
				username: email,
				password: password,
			};

			dispatch(adminLogin(adminData, history));
		}
	};

	return (
		<div className={classes.loginroot}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>

					<Typography
						component="h1"
						variant="h5"
						className={classes.signinlable}
					>
						Sign in
					</Typography>

					<form
						onSubmit={handleSubmit}
						className={classes.form}
						autoComplete="off"
					>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoFocus
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							InputLabelProps={{
								classes: {
									root: classes.labelRoot,
								},
							}}
							helperText={formErrors.email ? formErrors.email : ""}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							InputLabelProps={{
								classes: {
									root: classes.labelRoot,
								},
							}}
							helperText={formErrors.password ? formErrors.password : ""}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							disabled={loading}
							className={classes.submit}
						>
							Sign In
						</Button>
					</form>

					{error && (
						<div
							style={{
								fontSize: "12px",
								color: "red",
							}}
						>
							{error}
						</div>
					)}

					{serverError && (
						<div
							style={{
								fontSize: "12px",
								color: "red",
							}}
						>
							{serverError}
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};
