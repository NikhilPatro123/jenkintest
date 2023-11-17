import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//react component
import { ConfirmDialog } from "../ConfirmDialog";

//redux actions
import {
  deleteBanner,
  getBannersList,
} from "../../redux/actions/bannerActions";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/Button";
import BackupIcon from "@material-ui/icons/Backup";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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
  table: {
    minWidth: 650,
  },
  errorBlock: {
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Montserrat",
    textAlign: "center",
    color: "red",
  },
  notfound: {
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Montserrat",
    opacity: 0.6,
    textAlign: "center",
    color: "#212121",
  },
  uploadButton: {
    color: "#4caf50",
  },
  deleteButton: {
    color: "red",
  },
  editButton: {
    color: "#3f51b5",
  },
}));

export const BannerList = () => {
  const classes = useStyles();
  const { bannersList, loading, error } = useSelector((state) => state.Banners);
  const history = useHistory();
  const dispatch = useDispatch();

  const [bannerId, setBannerId] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmDelete = (id) => {
    setConfirmOpen(true);
    setBannerId(id);
  };

  const handleDeletBanner = () => {
    dispatch(deleteBanner(bannerId));
  };

  useEffect(() => {
    dispatch(getBannersList());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left">Banner ID</StyledTableCell>
                  <StyledTableCell align="left">Banner Name</StyledTableCell>
                  <StyledTableCell align="left">Upload</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </StyledTableRow>
              </TableHead>

              {loading ? (
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" colSpan={4}>
                      <CircularProgress />
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              ) : error ? (
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      align="center"
                      colSpan={4}
                      className={classes.errorBlock}
                    >
                      {error}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              ) : Object.keys(bannersList).length > 0 &&
                bannersList.readableBanners.length > 0 ? (
                <TableBody>
                  {bannersList.readableBanners.map((banner) => (
                    <StyledTableRow key={banner.id}>
                      <StyledTableCell component="th" scope="row">
                        {banner.id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {banner.bannerName}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <IconButton
                          color="secondary"
                          aria-label="upload"
                          onClick={() => {
                            history.push({
                              pathname: `/admin/banner/upload-banner/${banner.id}`,
                              state: {
                                bannerTitle: banner.bannerName,
                              },
                            });
                          }}
                        >
                          <BackupIcon className={classes.uploadButton} />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          color="secondary"
                          aria-label="delete"
                          onClick={() => handleConfirmDelete(banner.id)}
                        >
                          <DeleteIcon className={classes.deleteButton} />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="edit"
                          onClick={() => {
                            history.push({
                              pathname: `/admin/banner/${banner.id}`,
                              state: {
                                bannerId: banner.id,
                                banner: banner.bannerName,
                              },
                            });
                          }}
                        >
                          <EditIcon className={classes.editButton} />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      align="center"
                      colSpan={4}
                      className={classes.notfound}
                    >
                      Banners not found.
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <ConfirmDialog
        title="Delete Banner?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDeletBanner}
      >
        Are you sure you want to delete this Banner?{" "}
      </ConfirmDialog>
    </div>
  );
};
