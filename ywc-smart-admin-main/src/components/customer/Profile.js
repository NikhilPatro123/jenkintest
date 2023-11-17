import React, { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// redux actions
import { customerProfile } from "../../redux/actions/customerActions";

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
	type: {
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
	value: {
		fontSize: 12,
		fontWeight: 600,
		fontFamily: "Montserrat",
		color: "#495057",
		padding: theme.spacing(1),
	},
	notfound: {
		fontSize: 12,
		fontWeight: 600,
		fontFamily: "Montserrat",
		color: "#495057",
		padding: theme.spacing(1),
		opacity: 0.5,
	},
}));

export const Profile = () => {
	const classes = useStyles();
	const params = useParams();
	const { loading, profile } = useSelector((state) => state.Customer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(customerProfile(params.id));
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Fragment>
			{loading ? (
				<CircularProgress />
			) : (
				Object.keys(profile).length > 0 && (
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
											{profile.firstName}
										</Typography>
										<Typography
											color="textSecondary"
											variant="body1"
											className={classes.type}
										>
											{profile.userType ? profile.userType : "-"}
										</Typography>
										<Typography
											color="textSecondary"
											variant="body1"
											className={classes.type}
										>
											{profile.emailAddress}
										</Typography>
									</Box>
								</CardContent>
							</Card>
						</Grid>

						<Grid item lg={4} md={6} xs={12}>
							<Card className={classes.profilecard}>
								<CardHeader title="Billing address" />
								<Divider />
								<CardContent>
									<Grid container spacing={3}>
										<Grid item xs={12}>
											{profile.billing ? (
												<Fragment>
													<Typography className={classes.value}>
														{profile.billing.firstName}{" "}
														{profile.billing.lastName
															? profile.billing.lastName
															: null}
													</Typography>
													<Typography className={classes.value}>
														{profile.billing.address}
													</Typography>
													<Typography className={classes.value}>
														{profile.billing.city} -{" "}
														{profile.billing.postalCode}
													</Typography>
													<Typography className={classes.value}>
														{profile.billing.stateProvince}
													</Typography>
													<Typography className={classes.value}>
														phone: {profile.billing.phone}
													</Typography>
												</Fragment>
											) : (
												<Typography className={classes.notfound}>
													Billing address not found
												</Typography>
											)}
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>

						<Grid item lg={4} md={6} xs={12}>
							<Card className={classes.profilecard}>
								<CardHeader title="Delivery address" />
								<Divider />
								<CardContent>
									<Grid container spacing={3}>
										<Grid item xs={12}>
											{profile.delivery ? (
												<Fragment>
													<Typography className={classes.value}>
														{profile.delivery.firstName}{" "}
														{profile.delivery.lastName
															? profile.delivery.lastName
															: null}
													</Typography>
													<Typography className={classes.value}>
														{profile.delivery.address}
													</Typography>
													<Typography className={classes.value}>
														{profile.delivery.city} -{" "}
														{profile.delivery.postalCode}
													</Typography>
													<Typography className={classes.value}>
														{profile.delivery.stateProvince}
													</Typography>
													<Typography className={classes.value}>
														phone: {profile.delivery.phone}
													</Typography>
												</Fragment>
											) : (
												<Typography className={classes.notfound}>
													Delivery address not found
												</Typography>
											)}
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
