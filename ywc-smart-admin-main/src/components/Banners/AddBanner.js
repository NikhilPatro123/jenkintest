import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//react components
import { SnackBar } from "../../components/SnackBar";

// redux actions
import { createBannerName } from "../../redux/actions/bannerActions";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	bannerroot: {
		flexGrow: 1,
		"& .MuiCardHeader-root": {
			borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
			backgroundColor: "#f5f5f5",
		},
		"& .MuiCardHeader-title": {
			color: "#000000",
			fontFamily: "Montserrat",
			fontWeight: 600,
		},
		"& .MuiCardActions-root": {
			borderTop: "1px solid rgba(0, 0, 0, 0.12)",
			justifyContent: "center",
		},
		"& .MuiFormHelperText-root": {
			color: "red",
			fontFamily: "Montserrat",
		},
		"& .MuiFormControlLabel-label": {
			fontSize: 14,
			fontFamily: "Montserrat",
			color: "#000000",
			fontWeight: 600,
		},
	},
	input: {
		"&::placeholder": {
			fontFamily: "Montserrat",
		},
	},
	errorBlock: {
		fontSize: 15,
		fontFamily: "Montserrat",
		color: "red",
		fontWeight: 400,
		margin: "10px auto",
	},
}));

const stringRegex = RegExp(/^[A-Za-z]*$/);

export const AddBanner = () => {
	const classes = useStyles();
	const { loading, error } = useSelector((state) => state.Banners);
	const dispatch = useDispatch();

	const [banner, setBanner] = useState("");
	const [formErrors, setFormErrors] = useState({});

	const inputValidation = () => {
		let formErrors = {};
		let inputsValid = true;

		if (!banner) {
			inputsValid = false;
			formErrors["bannerName"] = "Please enter your Banner Name";
		}

		if (!stringRegex.test(banner)) {
			inputsValid = false;
			formErrors["bannerName"] = "Special characters and space not allowed";
		}

		setFormErrors(formErrors);
		return inputsValid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValidation()) {
			const bannerData = {
				bannerName: banner,
			};

			dispatch(createBannerName(bannerData));
			setBanner("");
		}
	};

	return (
		<div className={classes.bannerroot}>
			<Grid container spacing={3} justify="center">
				<Grid item lg={6} md={10} xs={12}>
					<Card>
						<CardHeader title="Create a Banner" />
						<form onSubmit={handleSubmit} autoComplete="off">
							<CardContent>
								<Grid container spacing={3}>
									<Grid item xs={12}>
										<TextField
											id="code"
											placeholder="Enter banner name"
											variant="outlined"
											size="small"
											value={banner}
											onChange={(e) => setBanner(e.target.value)}
											InputProps={{
												classes: { input: classes.input },
											}}
											helperText={
												formErrors.bannerName ? formErrors.bannerName : ""
											}
										/>
									</Grid>
								</Grid>
							</CardContent>

							<CardActions disableSpacing>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									size="small"
									style={{ outline: "none" }}
									disabled={loading}
								>
									Create
								</Button>
							</CardActions>
						</form>
					</Card>

					{error ? (
						<Typography component="p" className={classes.errorBlock}>
							{error}
						</Typography>
					) : (
						""
					)}
				</Grid>
			</Grid>

			<SnackBar />
		</div>
	);
};
