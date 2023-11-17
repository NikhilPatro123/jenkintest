import React from "react";
import { useHistory } from "react-router-dom";

// react components
import { Profile } from "../../../components/vendor/Profile";
import { Products } from "../../../components/vendor/Products";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBarSpacer: theme.mixins.toolbar,
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
		"& .MuiTabPanel-root": {
			border: "1px solid #66D3FA",
			boxShadow:
				"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.08)",
			textAlign: "center",
			marginTop: 18,
			borderRadius: 4,
			backgroundColor: "aliceblue",
		},
		"& .Mui-selected": {
			color: "#3f51b5",
			fontSize: 14,
			fontWeight: 600,
			fontFamily: "Montserrat",
		},
	},
	indicator: {
		backgroundColor: "#3f51b5",
	},
}));

export const Vendor = () => {
	const classes = useStyles();
	const history = useHistory();

	const [value, setValue] = React.useState("1");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const goToPreviousPage = () => {
		history.goBack();
	};

	return (
		<div className={classes.root}>
			<main className={classes.content}>
				<Button
					variant="outlined"
					color="primary"
					className={classes.backbutton}
					startIcon={<ArrowBackIosIcon />}
					onClick={goToPreviousPage}
				>
					Back to vendor list
				</Button>

				<Container maxWidth="lg" className={classes.container}>
					<TabContext value={value}>
						<AppBar position="static" color="transparent" elevation={0}>
							<TabList
								onChange={handleChange}
								aria-label="simple tabs example"
								classes={{
									indicator: classes.indicator,
								}}
							>
								<Tab label="Profile" value="1" />
								<Tab label="Products" value="2" />
							</TabList>
						</AppBar>

						<TabPanel value="1">
							<Profile />
						</TabPanel>

						<TabPanel value="2">
							<Products />
						</TabPanel>
					</TabContext>
				</Container>
			</main>
		</div>
	);
};
