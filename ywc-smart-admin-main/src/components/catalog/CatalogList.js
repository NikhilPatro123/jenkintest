import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { CatalogContext } from '../../context/CatalogContext';

//react component

//redux Actions
import {getCatalogList} from "../../redux/actions/catalogActions";

// material ui
import {makeStyles, withStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";


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
  table: {
    minWidth: 650,
  },
  notfound: {
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Montserrat",
    opacity: 0.6,
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "transparent",
    color: "#DD5144",
    borderRadius: 4,
  },
  detailsbutton: {
    backgroundColor: "#3f51b5",
    textTransform: "none",
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: 500,
  },
}));

export const CatalogList = (props) => {
  const classes = useStyles();
  const { loading, catalogsList } = useSelector((state) => state.Catalog);
  const dispatch = useDispatch();


  const { handleChange } = props;

  const handleEditCatalog = (catalog) => {
    // setConfirmOpen(true);
    // setGroupCode(code);
    console.log(catalog);
    handleChange(null , "2" , catalog) ;

  };

  useEffect(() => {
    dispatch(getCatalogList());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="left">SrNo</StyledTableCell>
                    <StyledTableCell align="left">CatalogName</StyledTableCell>
                    <StyledTableCell align="left">Creation Date</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
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
                ) :   Object.keys(catalogsList).length > 0 &&
                                  catalogsList.catalogs.length > 0 ? (
                    <TableBody>
                      {catalogsList.catalogs.map((catalog, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                              {index + 1}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              {catalog.code}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              {catalog.code}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <IconButton
                                  color="secondary"
                                  aria-label="more"
                                  onClick={() => handleEditCatalog(catalog)}
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
                        <StyledTableCell colSpan={3} className={classes.notfound}>
                          Catalags not found
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                )}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
  );
};

