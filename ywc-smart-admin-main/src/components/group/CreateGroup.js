import React, { useState } from "react";
import { useDispatch } from "react-redux";

//react components
import { SnackBar } from "../../components/SnackBar";

//redux actions
import { createGroup } from "../../redux/actions/groupActions";

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
	grouproot: {
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

export const CreateGroup = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [code, setCode] = useState("");
	const [checked, setChecked] = useState(false);
	const [errors, setErrors] = useState({});

	const inputValidation = () => {
		let errors = {};
		let inputsValid = true;

		if (!code) {
			inputsValid = false;
			errors["code"] = "Group name is required";
		}

		setErrors(errors);
		return inputsValid;
	};

	const clearForm = () => {
		setCode("");
		setChecked(false);
		setErrors({});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (inputValidation()) {
			const groupData = {
				active: checked,
				code: code,
			};

			dispatch(createGroup(groupData));
			clearForm();
		}
	};

	return (
		<div className={classes.grouproot}>
			<Grid container spacing={3}>
				<Grid item lg={6} md={10} xs={12}>
					<Card>
						<CardHeader title="Add Group" />
						<form onSubmit={handleSubmit} autoComplete="off">
							<CardContent>
								<Grid container spacing={3}>
									<Grid item xs={12}>
										<TextField
											id="code"
											label="Group Name"
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

									<Grid item xs={12}>
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
