import React, { useState } from "react";
import { useDispatch } from "react-redux";

//react components
import { SnackBar } from "../../components/SnackBar";

// redux actions
import { createCategory } from "../../redux/actions/categoryActions";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
	addcategoryroot: {
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
	labelRoot: {
		fontSize: "14px",
		fontFamily: "Montserrat",
		fontWeight: 400,
		color: "#666666",
	},
}));

export const AddCategory = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [code, setCode] = useState("");
	const [name, setName] = useState("");
	const [title, setTitle] = useState("");
	const [checked, setChecked] = useState(false);
	const [errors, setErrors] = useState({});

	const inputValidation = () => {
		let errors = {};
		let inputsValid = true;

		if (!code) {
			inputsValid = false;
			errors["code"] = "this field is required";
		}

		if (!name) {
			inputsValid = false;
			errors["name"] = "this field is required";
		}

		if (!title) {
			inputsValid = false;
			errors["title"] = "this field is required";
		}

		setErrors(errors);
		return inputsValid;
	};

	const clearForm = () => {
		setCode("");
		setName("");
		setTitle("");
		setChecked(false);
		setErrors({});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (inputValidation()) {
			const data = {
				code: code,
				descriptions: [
					{
						description: code,
						friendlyUrl: code,
						highlights: code,
						language: "en",
						metaDescription: code,
						name: name,
						title: title,
					},
				],
				visible: checked,
			};

			dispatch(createCategory(data));
			clearForm();
		}
	};

	return (
		<div className={classes.addcategoryroot}>
			<Grid container spacing={3} justify="center" alignItems="center">
				<Grid item lg={8} md={10} xs={12}>
					<Card>
						<CardHeader title="Add Category" />

						<form onSubmit={handleSubmit} autoComplete="off">
							<CardContent>
								<Grid container spacing={3}>
									<Grid item lg={4} md={6} xs={12}>
										<TextField
											id="code"
											label="Category Code"
											variant="outlined"
											size="small"
											value={code}
											onChange={(e) => setCode(e.target.value)}
											InputLabelProps={{
												classes: {
													root: classes.labelRoot,
												},
											}}
											helperText={errors.code ? errors.code : ""}
										/>
									</Grid>

									<Grid item lg={4} md={6} xs={12}>
										<TextField
											id="name"
											label="Category Name"
											variant="outlined"
											size="small"
											value={name}
											onChange={(e) => setName(e.target.value)}
											InputLabelProps={{
												classes: {
													root: classes.labelRoot,
												},
											}}
											helperText={errors.name ? errors.name : ""}
										/>
									</Grid>

									<Grid item lg={4} md={6} xs={12}>
										<TextField
											id="title"
											label="Category Title"
											variant="outlined"
											size="small"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											InputLabelProps={{
												classes: {
													root: classes.labelRoot,
												},
											}}
											helperText={errors.title ? errors.title : ""}
										/>
									</Grid>

									<Grid item lg={4} md={6} xs={12}>
										<FormControlLabel
											value="start"
											control={
												<Checkbox
													color="primary"
													checked={checked}
													onChange={(e) => setChecked(e.target.checked)}
													name="visible"
													size="small"
												/>
											}
											label="Visible"
											labelPlacement="start"
										/>
									</Grid>
								</Grid>
							</CardContent>
							<CardActions disableSpacing>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									className={classes.submitButton}
									size="small"
									style={{ outline: "none" }}
								>
									Save
								</Button>
							</CardActions>
						</form>
					</Card>
				</Grid>
			</Grid>

			<SnackBar />
		</div>
	);
};
