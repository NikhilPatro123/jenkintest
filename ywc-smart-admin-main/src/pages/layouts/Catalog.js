import React, {useEffect, useState} from "react";
import {NavBar} from "../../components/NavBar";

// material ui
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import {CatalogList} from "../../components/catalog/CatalogList";
import {AddCatalog} from "../../components/catalog/AddCatalog";
import {CatalogContext} from "../../context/CatalogContext";
import {SET_CATEGORY_ID, SET_SELECTED_PRODUCTS_LIST, SET_UNSELECTED_PRODUCT_LIST} from "../../redux/types";
import {useDispatch} from "react-redux";


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

export const Catalog = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState("1");
  const [selectedCatalogObj , setSelectedCatalogObj] = useState({});

  const dispatch = useDispatch();

  const setCatalogContextValue = (selectedCatalogReceived) => {
    if(selectedCatalogReceived != null && selectedCatalogReceived != undefined) {
      setSelectedCatalogObj(selectedCatalogReceived);
    } else {
      setSelectedCatalogObj({});
    }
  }

  const handleChange = (event, tabValue , selectedCatalogReceived) => {
    setCatalogContextValue(selectedCatalogReceived);
    resetScreen();
    setValue(tabValue);
  };


  const resetScreen = async () =>  {

    await dispatch({ type : SET_CATEGORY_ID , payload : 0 });
    await dispatch({ type : SET_SELECTED_PRODUCTS_LIST , payload : [] });
    await dispatch({ type : SET_UNSELECTED_PRODUCT_LIST , payload : [] });

  };

  useEffect(() => {

  }, []);

  return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar title={"Catalog"} tabId={"12"} />
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
                  <Tab label="Catalog" value="1"  onClick={(e) => setCatalogContextValue(null)}/>
                  <Tab label="Add Catalog" value="2" onClick={(e) => setCatalogContextValue(null)}/>
                </TabList>
              </AppBar>

              <TabPanel value="1">
                <CatalogList  handleChange={handleChange}/>
              </TabPanel>

              <TabPanel value="2">
                <CatalogContext.Provider value={selectedCatalogObj}>
                  <AddCatalog />
                </CatalogContext.Provider>
              </TabPanel>
            </TabContext>
          </Container>
        </main>
      </div>
  );
}
