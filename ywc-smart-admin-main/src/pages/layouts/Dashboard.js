import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../../components/NavBar";

//redux actions
import { dashboardData } from "../../redux/actions/dashboardActions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import CategoryIcon from "@material-ui/icons/Category";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import CircularProgress from "@material-ui/core/CircularProgress";
import FaceIcon from "@material-ui/icons/Face";
import GroupWorkIcon from "@material-ui/icons/GroupWork";

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
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  card: {
    "& .MuiCardContent-root": {
      padding: 0,
    },
    "& .MuiCardActions-root": {
      justifyContent: "center",
    },
    "& .MuiAvatar-colorDefault": {
      color: "white",
      backgroundColor: "#fb8c00",
    },
  },
  cardcount: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat",
    color: "#263238",
  },
  viewbutton: {
    fontSize: 10,
    fontWeight: 600,
    fontFamily: "Montserrat",
    color: "green",
  },
}));

export const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const { loading, vendors, category, groups, products, customers, orders } =
    useSelector((state) => state.Dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dashboardData());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar title={"Dashboard"} tabId={"1"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {loading ? (
            <Grid
              container
              spacing={3}
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
              direction="column"
            >
              <CircularProgress />
            </Grid>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <PeopleIcon />
                      </Avatar>
                    }
                    title="VENDORS"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.cardcount}
                    >
                      {vendors ? vendors : 0}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      size="small"
                      onClick={() => history.push("/admin/vendors-list")}
                      className={classes.viewbutton}
                    >
                      View vendors
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <CategoryIcon />
                      </Avatar>
                    }
                    title="CATEGORY"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.cardcount}
                    >
                      {category ? category : 0}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      size="small"
                      onClick={() => history.push("/admin/category")}
                      className={classes.viewbutton}
                    >
                      View category
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <GroupWorkIcon />
                      </Avatar>
                    }
                    title="PRODUCT GROUPS"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.cardcount}
                    >
                      {groups ? groups : 0}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      size="small"
                      className={classes.viewbutton}
                      onClick={() => history.push("/admin/groups")}
                    >
                      View product groups
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <LocalMallIcon />
                      </Avatar>
                    }
                    title="PRODUCTS"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.cardcount}
                    >
                      {products ? products : 0}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      size="small"
                      className={classes.viewbutton}
                      onClick={() => history.push("/admin/products")}
                    >
                      View products
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <FaceIcon />
                      </Avatar>
                    }
                    title="CUSTOMERS"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.cardcount}
                    >
                      {customers ? customers : 0}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      size="small"
                      className={classes.viewbutton}
                      onClick={() => history.push("/admin/customers-list")}
                    >
                      View customers
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <ShoppingCartIcon />
                      </Avatar>
                    }
                    title="ORDERS"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.cardcount}
                    >
                      {orders ? orders : 0}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button size="small" className={classes.viewbutton}>
                      View orders
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          )}
        </Container>
      </main>
    </div>
  );
};
