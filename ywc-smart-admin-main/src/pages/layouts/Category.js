import React from "react";
import { NavBar } from "../../components/NavBar";
import { CategoryList } from "../../components/category/CategoryList";
import { AddCategory } from "../../components/category/AddCategory";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		"& .MuiTabPanel-root": {
			textAlign: "center",
		},
		"& .Mui-selected": {
			color: "#3f51b5",
		},
	},
	indicator: {
		backgroundColor: "#3f51b5",
	},
}));

export const Category = () => {
	const classes = useStyles();

	const [value, setValue] = React.useState("1");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<NavBar title={"Category"} tabId={"2"} />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
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
								<Tab label="Categories" value="1" />
								<Tab label="Add category" value="2" />
							</TabList>
						</AppBar>

						<TabPanel value="1">
							<CategoryList />
						</TabPanel>

						<TabPanel value="2">
							<AddCategory />
						</TabPanel>
					</TabContext>
				</Container>
			</main>
		</div>
	);
};
