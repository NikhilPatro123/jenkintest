import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// redux actions
import { updateBanner } from "../../../redux/actions/bannerActions";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& .MuiCardHeader-root": {
			borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
			backgroundColor: "#f5f5f5",
			textAlign: "center",
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
	backbutton: {
		marginLeft: 28,
		marginTop: 24,
	},
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
}));

const stringRegex = RegExp(/^[A-Za-z]*$/);

export const EditBanner = () => {
	const classes = useStyles();
	const location = useLocation();
	const { loading } = useSelector((state) => state.Banners);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		setBannerId(location.state.bannerId ? location.state.bannerId : "");
		setBannerName(location.state.banner ? location.state.banner : "");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const [bannerId, setBannerId] = useState("");
	const [bannerName, setBannerName] = useState("");
	const [formErrors, setFormErrors] = useState({});

	const inputValidation = () => {
		let formErrors = {};
		let inputsValid = true;

		if (!bannerName) {
			inputsValid = false;
			formErrors["bannerName"] = "Please enter your Banner Name";
		}

		if (!stringRegex.test(bannerName)) {
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
				bannerName: bannerName,
			};
			dispatch(updateBanner(bannerData, bannerId, history));
		}
	};

	return (
		<div className={classes.root}>
			<main className={classes.content}>
				<Button
					variant="outlined"
					color="primary"
					className={classes.backbutton}
					startIcon={<ArrowBackIosIcon />}
					onClick={() => {
						history.goBack();
					}}
				>
					Back to Banner list
				</Button>

				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3} justify="center" alignItems="center">
						<Grid item lg={6} md={6} xs={12}>
							<Card>
								<CardHeader title="Update Banner" />

								<form onSubmit={handleSubmit} autoComplete="off">
									<CardContent style={{ textAlign: "center" }}>
										<Grid container spacing={3}>
											<Grid item xs={12}>
												<TextField
													id="code"
													placeholder="Enter banner name"
													variant="outlined"
													size="small"
													value={bannerName}
													onChange={(e) => setBannerName(e.target.value)}
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
											Update
										</Button>
									</CardActions>
								</form>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
};
