import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../../../components/NavBar";
import { ConfirmDialog } from "../../../components/ConfirmDialog";

//redux actions
import {
  deleteVendor,
  getAllVendors,
} from "../../../redux/actions/vendorAction";

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
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  body: {
    fontSize: 13,
    fontFamily: "Montserrat",
    color: "#2d2b2b",
    fontWeight: 500,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#eeeeee",
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
  noFound: {
    color: "#030104",
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: 500,
  },
  statustext: {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontSize: 10,
    fontWeight: "bold",
    border: "1px solid ",
    padding: 2,
    borderRadius: 6,
    color: "#fff",
    textTransform: "uppercase",
  },
  morebutton: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    borderRadius: 4,
  },
  deletebutton: {
    backgroundColor: "transparent",
    color: "#DD5144",
    borderRadius: 4,
  },
}));

export const VendorList = () => {
  const classes = useStyles();
  const history = useHistory();
  const { loading, vendorList } = useSelector((state) => state.vendorlist);
  const dispatch = useDispatch();

  const rowsPerPage = 10;
  const [page, setPage] = useState(1);
  const [vendorId, setVendorId] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleChangePage = (event, newValue) => {
    setPage(newValue);
  };

  const handleClickOpen = (id) => {
    setConfirmOpen(true);
    setVendorId(id);
  };

  const handleDeleteVendor = () => {
    dispatch(deleteVendor(vendorId));
  };

  const handleMoreButton = (id) => {
    history.push(`/admin/vendor/${id}`);
  };

  useEffect(() => {
    dispatch(getAllVendors(rowsPerPage, page));
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar title={"Vendors"} tabId={"4"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell align="right">ID</StyledTableCell>
                      <StyledTableCell align="right">
                        First name
                      </StyledTableCell>
                      <StyledTableCell align="right">Last Name</StyledTableCell>
                      <StyledTableCell align="right">Email</StyledTableCell>
                      <StyledTableCell align="right">User type</StyledTableCell>
                      <StyledTableCell align="right">Status</StyledTableCell>
                      <StyledTableCell align="right">Actions</StyledTableCell>
                      <StyledTableCell align="right">More</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>

                  {loading ? (
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell align="center" colSpan={7}>
                          <CircularProgress />
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  ) : Object.keys(vendorList).length > 0 &&
                    vendorList.data.length > 0 ? (
                    <TableBody>
                      {vendorList.data
                        .filter((item) => item.userType !== null)
                        .map((vendor, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell align="right">
                              {vendor.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {vendor.firstName}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {vendor.lastName ? vendor.lastName : "-"}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {vendor.emailAddress}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {vendor.userType ? vendor.userType : "-"}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {vendor.userStatus &&
                              vendor.userStatus === "ACTIVE" ? (
                                <Typography
                                  className={classes.statustext}
                                  style={{ backgroundColor: "#08ad6c" }}
                                >
                                  Active
                                </Typography>
                              ) : vendor.userStatus === "INACTIVE" ? (
                                <Typography
                                  className={classes.statustext}
                                  style={{ backgroundColor: "#FF3D57" }}
                                >
                                  Inactive
                                </Typography>
                              ) : vendor.userStatus === "PENDING" ? (
                                <Typography
                                  className={classes.statustext}
                                  style={{ backgroundColor: "#FFAF38" }}
                                >
                                  Pending
                                </Typography>
                              ) : (
                                <Typography
                                  className={classes.statustext}
                                  style={{ backgroundColor: "#FF3D57" }}
                                >
                                  Inactive
                                </Typography>
                              )}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <IconButton
                                color="primary"
                                aria-label="more"
                                onClick={() => handleClickOpen(vendor.id)}
                              >
                                <DeleteIcon className={classes.deletebutton} />
                              </IconButton>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <IconButton
                                color="primary"
                                aria-label="more"
                                onClick={() => handleMoreButton(vendor.id)}
                              >
                                <MoreVertIcon className={classes.morebutton} />
                              </IconButton>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  ) : (
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell
                          colSpan={7}
                          className={classes.noFound}
                        >
                          Vendors not found
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Grid>

            {Object.keys(vendorList).length > 0 &&
              vendorList.data.length > 0 &&
              vendorList.totalPages > 1 && (
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <Pagination
                      page={page}
                      variant="outlined"
                      shape="rounded"
                      count={vendorList.totalPages}
                      onChange={handleChangePage}
                    />
                  </Grid>
                </Grid>
              )}
          </Grid>
        </Container>
      </main>

      <ConfirmDialog
        title="Delete Vendor?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDeleteVendor}
      >
        Are you sure you want to delete this Vendor?{" "}
      </ConfirmDialog>
    </div>
  );
};
