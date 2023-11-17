import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

/* react components */
import { getTransactionsList } from "../../redux/actions/transactionsActions";
import { OrderDetails } from "../../components/transactions/OrderDetails";
import { NavBar } from "../../components/NavBar";

/* material ui */
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
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
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
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  table: {
    minWidth: 650,
  },
  search: {
    position: "relative",
    float: "right",
    "& .MuiOutlinedInput-inputAdornedStart": {
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "Avenir",
      color: "#7c7c7c",
      opacity: 0.54,
    },
  },
  searchIcon: {
    color: "#7c7c7c",
  },
  button: {
    margin: theme.spacing(1),
    color: "#7C7C7C",
  },
}));

export const Transaction = () => {
  const classes = useStyles();

  const { loading, transactions } = useSelector((state) => state.Transaction);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionsList());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar title={"Transactions"} tabId={"8"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item>
              <TextField
                className={classes.search}
                id="input-with-icon-textfield"
                size="small"
                placeholder="search"
                variant="outlined"
                // onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className={classes.searchIcon} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right">ID</StyledTableCell>
                      <StyledTableCell align="right">Order ID</StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  {loading ? (
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell align="center" colSpan={6}>
                          <CircularProgress />
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  ) : Object.keys(transactions).length > 0 ? (
                    <TableBody>
                      {Object.entries(transactions).map(([key, value]) =>
                        value.map((item, index) => (
                          <Fragment key={index}>
                            <OrderDetails item={item} />
                          </Fragment>
                        ))
                      )}
                    </TableBody>
                  ) : (
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="right">
                          No Products
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
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
