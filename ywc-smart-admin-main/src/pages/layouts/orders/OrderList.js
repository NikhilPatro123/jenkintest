import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NavBar } from "../../../components/NavBar";
import { loadOrders } from "../../../redux/actions/ordersAction";
// material ui
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CircularProgress from "@material-ui/core/CircularProgress";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3F51B5",
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  body: {
    fontSize: 13,
    fontFamily: "Montserrat",
    color: "#2D2B2B",
    fontWeight: 500,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#EEEEEE",
    },
  },
}))(TableRow);
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
      color: "#3F51B5",
    },
  },
  indicator: {
    backgroundColor: "#3F51B5",
  },
  noFound: {
		color: "#030104",
		textAlign: "center",
		fontFamily: "Montserrat",
		fontWeight: 500,
	}
}));
export const OrderList = () => {
  const classes = useStyles();
  const { loading, ordersList } = useSelector((state) => state.Orders);
  const dispatch = useDispatch();
  // const [orderList, setOrderList] = React.useState({});

  useEffect(() => {
    dispatch(loadOrders());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(orderList);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar title={"Orders"} tabId={"7"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell align="left">ID</StyledTableCell>
                      <StyledTableCell align="left">Total</StyledTableCell>
                      <StyledTableCell align="left">Order Date</StyledTableCell>
                      <StyledTableCell align="left">Status</StyledTableCell>
                      <StyledTableCell align="left">Details</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>


                  {loading ? (
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell align="center" colSpan={6}>
                          <CircularProgress />
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>

                  ) : Object.keys(ordersList).length > 0 &&
                    ordersList.orders.length > 0 ? (
                    <TableBody>
                      {
                        ordersList.orders.map((order) => (
                          <StyledTableRow key={order.id}>
                            <StyledTableCell
                              component="th"
                              align="left"
                              scope="row"
                            >
                              {order.id}
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="left"
                              scope="row"
                            >
                              {order?.orderTotal}
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="left"
                              scope="row"
                            >
                              {new Date(order.datePurchased).toLocaleDateString()}
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="left"
                              scope="row"
                            >
                              {order?.products.length > 0 ?   order.products[0].orderStatus :  '' }
                            </StyledTableCell>
                            <StyledTableCell
                              component="th"
                              align="left"
                              scope="row"
                            >
                              <IconButton
                                color="secondary"
                                aria-label="more"
                              // onClick={() => handleClickOpen(category.id)}
                              >
                                <VisibilityIcon className={classes.viewbutton} />
                              </IconButton>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  ) : (
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell
                          colSpan={6}
                          className={classes.noFound}
                        >
                          Orders not found
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>

                  )}




                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};
