import React, { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//redux actions
import {
	getVendorProfile,
	updateVendorStatus,
} from "../../redux/actions/vendorAction";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import EventIcon from "@material-ui/icons/Event";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import CallIcon from "@material-ui/icons/Call";
import Fab from "@material-ui/core/Fab";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

const useStyles = makeStyles((theme) => ({
	card: {
		boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 2px 0 rgba(63,63,68,0.15)",
	},
	avatar: {
		height: 100,
		width: 100,
	},
	username: {
		fontSize: 24,
		fontWeight: 500,
		fontFamily: "Montserrat",
		textTransform: "capitalize",
	},
	vendortype: {
		fontSize: 16,
		fontWeight: 500,
		fontFamily: "Montserrat",
	},
	profilecard: {
		"& .MuiCardHeader-title": {
			fontSize: 18,
			fontWeight: 600,
			fontFamily: "Montserrat",
			color: "#ffffff",
		},
		"& .MuiCardHeader-root": {
			backgroundColor: "#3f51b5",
		},
	},
	buttons: {
		"& > *": {
			margin: theme.spacing(1),
			fontSize: 12,
			fontWeight: "bold",
			color: "#fff",
			fontFamily: "Montserrat",
			textTransform: "capitalize",
		},
	},
	labelRoot: {
		fontSize: "14px",
		fontFamily: "Montserrat",
		fontWeight: 400,
		color: "#666666",
	},
	textField: {
		"& input:disabled": {
			fontSize: "12px",
			fontFamily: "Montserrat",
			fontWeight: 400,
			color: "#495057",
			textAlign: "initial",
			background: "#F7F7F7",
		},
	},
	inactive: {
		backgroundColor: "#FF3D57",
		"&:hover": {
			backgroundColor: "#FF3D57",
		},
	},
	active: {
		backgroundColor: "#08ad6c",
		"&:hover": {
			backgroundColor: "#08ad6c",
		},
	},
	pending: {
		backgroundColor: "#FFAF38",
		"&:hover": {
			backgroundColor: "#FFAF38",
		},
	},
	lable: {
		fontSize: 13,
		fontWeight: 600,
		fontFamily: "Montserrat",
	},
	value: {
		fontSize: 12,
		fontWeight: 600,
		fontFamily: "Montserrat",
		color: "#495057",
		padding: theme.spacing(1),
	},
	iconwithlable: {
		fontSize: 13,
		fontWeight: 600,
		fontFamily: "Montserrat",
		display: "flex",
		alignItems: "center",
		flexWrap: "wrap",
		textAlign: "center",
		justifyContent: "center",
	},
	margin: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
}));

export const Profile = () => {
	const classes = useStyles();
	const params = useParams();
	const { loading, vendorProfile } = useSelector((state) => state.vendorlist);
	const dispatch = useDispatch();

	const handleChangeStatus = (data) => {
		const status = {
			userStatus: data,
		};

		dispatch(updateVendorStatus(status, params.id));
	};

	useEffect(() => {
		dispatch(getVendorProfile(params.id));
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	console.log(vendorProfile);

	return (
		<Fragment>
			{loading ? (
				<CircularProgress />
			) : (
				Object.keys(vendorProfile).length > 0 && (
					<Grid container spacing={3}>
						<Grid item lg={4} md={6} xs={12}>
							<Card className={classes.card}>
								<CardContent>
									<Box
										alignItems="center"
										display="flex"
										flexDirection="column"
									>
										<Avatar
											className={classes.avatar}
											src="/broken-image.jpg"
										/>
										<Typography
											color="textPrimary"
											gutterBottom
											variant="h3"
											className={classes.username}
										>
											{vendorProfile.firstName}
										</Typography>
										<Typography
											color="textSecondary"
											variant="body1"
											className={classes.vendortype}
										>
											{vendorProfile.userType ? vendorProfile.userType : "-"}
										</Typography>
									</Box>
								</CardContent>
							</Card>
						</Grid>

						<Grid item lg={8} md={6} xs={12}>
							<Card className={classes.profilecard}>
								<CardHeader title="Profile" />
								<Divider />
								<CardContent>
									<Grid container spacing={3}>
										<Grid item lg={4} md={6} xs={12}>
											<FormLabel component="legend" className={classes.lable}>
												ID
											</FormLabel>
											<Typography className={classes.value}>
												{vendorProfile.id}
											</Typography>
										</Grid>

										<Grid item lg={4} md={6} xs={12}>
											<FormLabel component="legend" className={classes.lable}>
												First Name
											</FormLabel>
											<Typography className={classes.value}>
												{vendorProfile.firstName}
											</Typography>
										</Grid>

										<Grid item lg={4} md={6} xs={12}>
											<FormLabel component="legend" className={classes.lable}>
												Last name
											</FormLabel>
											<Typography className={classes.value}>
												{vendorProfile.lastName ? vendorProfile.lastName : "-"}
											</Typography>
										</Grid>

										<Grid item lg={4} md={6} xs={12}>
											<FormLabel component="legend" className={classes.lable}>
												Email Address
											</FormLabel>
											<Typography className={classes.value}>
												{vendorProfile.emailAddress}
											</Typography>
										</Grid>

										<Grid item lg={4} md={6} xs={12}>
											<FormLabel component="legend" className={classes.lable}>
												User Type
											</FormLabel>
											<Typography className={classes.value}>
												{vendorProfile.userType}
											</Typography>
										</Grid>

										<Grid item lg={4} md={6} xs={12}>
											<FormLabel component="legend" className={classes.lable}>
												Current Status
											</FormLabel>
											<Typography className={classes.value}>
												{vendorProfile.userStatus}
											</Typography>
										</Grid>

										<Grid item xs={12}>
											<Typography className={classes.lable}>
												Change Account Status
											</Typography>
											{vendorProfile.userStatus === "ACTIVE" ? (
												<div className={classes.buttons}>
													<Button
														variant="contained"
														onClick={(event) => handleChangeStatus("INACTIVE")}
														className={classes.inactive}
													>
														Inactive
													</Button>
													<Button
														variant="contained"
														onClick={(event) => handleChangeStatus("PENDING")}
														className={classes.pending}
													>
														Pending
													</Button>
												</div>
											) : vendorProfile.userStatus === "PENDING" ? (
												<div className={classes.buttons}>
													<Button
														variant="contained"
														onClick={(event) => handleChangeStatus("INACTIVE")}
														className={classes.inactive}
													>
														Inactive
													</Button>
													<Button
														variant="contained"
														onClick={(event) => handleChangeStatus("ACTIVE")}
														className={classes.active}
													>
														Active
													</Button>
												</div>
											) : vendorProfile.userStatus === "INACTIVE" ? (
												<div className={classes.buttons}>
													<Button
														variant="contained"
														onClick={(event) => handleChangeStatus("ACTIVE")}
														className={classes.active}
													>
														Active
													</Button>
													<Button
														variant="contained"
														onClick={(event) => handleChangeStatus("PENDING")}
														className={classes.pending}
													>
														Pending
													</Button>
												</div>
											) : (
												<div className={classes.buttons}>
													<Button
														variant="contained"
														onClick={(event) => handleChangeStatus("ACTIVE")}
														className={classes.active}
													>
														Active
													</Button>
													<Button
														variant="contained"
														onClick={(event) => handleChangeStatus("PENDING")}
														className={classes.pending}
													>
														Pending
													</Button>
												</div>
											)}
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>

						<Grid item lg={4} md={6} xs={12}>
							<Card className={classes.profilecard}>
								<CardHeader title="Company address" />
								<Divider />
								<CardContent>
									<Grid
										container
										spacing={3}
										alignItems="center"
										justify="center"
									>
										<Grid item md={6} xs={12}>
											<Typography className={classes.value}>
												{
													vendorProfile.supplierInfoRes.supplierDetailInfo
														.address.addressLine1
												}
											</Typography>
											<Typography className={classes.value}>
												{vendorProfile.supplierInfoRes.supplierDetailInfo
													.address.addressLine2
													? vendorProfile.supplierInfoRes.supplierDetailInfo
															.address.addressLine2
													: null}
											</Typography>
											<Typography className={classes.value}>
												{
													vendorProfile.supplierInfoRes.supplierDetailInfo
														.address.city
												}{" "}
												-{" "}
												{
													vendorProfile.supplierInfoRes.supplierDetailInfo
														.address.pincode
												}
											</Typography>
											<Typography className={classes.value}>
												{
													vendorProfile.supplierInfoRes.supplierDetailInfo
														.address.state
												}
											</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>

						<Grid item lg={8} md={6} xs={12}>
							<Card className={classes.profilecard}>
								<CardHeader title="Company Details" />
								<Divider />
								<CardContent>
									<Grid container spacing={3}>
										<Grid item lg={4} md={6} xs={12}>
											<FormLabel component="legend" className={classes.lable}>
												Name
											</FormLabel>
											<Typography className={classes.value}>
												{vendorProfile.supplierInfoRes.supplierDetailInfo.name}
											</Typography>
										</Grid>

										<Grid item lg={4} md={6} xs={12}>
											<FormLabel component="legend" className={classes.lable}>
												PAN
											</FormLabel>
											<Typography className={classes.value}>
												{
													vendorProfile.supplierInfoRes.supplierDetailInfo
														.panNumber
												}
											</Typography>
										</Grid>

										<Grid item lg={4} md={6} xs={12}>
											<FormLabel
												component="legend"
												className={classes.iconwithlable}
											>
												<EventIcon />
												Register Date
											</FormLabel>
											<Typography className={classes.value}>
												{new Date(
													vendorProfile.supplierInfoRes.supplierDetailInfo.vendorRegDate
												).toLocaleString()}
											</Typography>
										</Grid>

										<Grid item lg={4} md={6} xs={12}>
											<FormLabel
												component="legend"
												className={classes.iconwithlable}
											>
												<PhoneAndroidIcon />
												Mobile Number
											</FormLabel>
											<Typography className={classes.value}>
												{
													vendorProfile.supplierInfoRes.supplierDetailInfo
														.phoneNumber
												}
											</Typography>
										</Grid>

										<Grid item lg={4} md={6} xs={12}>
											<FormLabel
												component="legend"
												className={classes.iconwithlable}
											>
												<CallIcon />
												Phone Number
											</FormLabel>
											<Typography className={classes.value}>
												{vendorProfile.supplierInfoRes.supplierDetailInfo
													.mobileNumber === 0
													? "-"
													: vendorProfile.supplierInfoRes.supplierDetailInfo
															.mobileNumber}
											</Typography>
										</Grid>

										<Grid item lg={4} md={6} xs={12}>
											<FormLabel component="legend" className={classes.lable}>
												MSME
											</FormLabel>
											<Typography className={classes.value}>
												{
													vendorProfile.supplierInfoRes.supplierDetailInfo
														.msmeNumber
												}
											</Typography>
										</Grid>

										<Grid item lg={4} md={6} xs={12}>
											<Fab
												variant="extended"
												size="small"
												color="primary"
												aria-label="add"
												className={classes.margin}
												href={
													vendorProfile.supplierInfoRes.supplierDetailInfo
														.panUrl
												}
												target="_blank"
											>
												<CloudDownloadIcon className={classes.extendedIcon} />
												Document
											</Fab>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				)
			)}
		</Fragment>
	);
};
