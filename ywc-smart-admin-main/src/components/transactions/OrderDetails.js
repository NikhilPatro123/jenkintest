import React, { useState } from "react";

import { PaymentDetails } from "../../components/transactions/PaymentDetails";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { IconButton } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Collapse from "@material-ui/core/Collapse";

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
  addAttribute: {
    border: "1px solid #3f51b5",
    background: "#3f51b5",
    color: "#FFFFFF",
    borderRadius: "0.2rem",
    fontSize: "12px",
    fontWeight: 600,
    fontFamily: "'Fira Sans', sans-serif",
    padding: theme.spacing(1),
    margin: "4px",
    "&:hover": {
      background: "#3f51b5",
      color: "#FFFFFF",
    },
  },
}));

export const OrderDetails = (props) => {
  const classes = useStyles();
  const { item } = props;
  const [openAttributeList, setOpenAttributeList] = useState(false);

  return (
    <>
      <StyledTableRow>
        <StyledTableCell align="right">{item.id}</StyledTableCell>
        <StyledTableCell align="right">{item.orderId}</StyledTableCell>
        <StyledTableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenAttributeList(!openAttributeList)}
            className={classes.addAttribute}
            style={{
              outline: "none",
              height: "30px",
            }}
          >
            {openAttributeList ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" />
            )}
            Payment Details
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>

      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={7}
        >
          <Collapse in={openAttributeList} timeout="auto" unmountOnExit>
            <PaymentDetails item={item} />
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};
