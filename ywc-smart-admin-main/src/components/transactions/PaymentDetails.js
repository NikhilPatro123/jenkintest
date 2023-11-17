import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#d5f9ef",
    color: "#3c3c3c",
    fontFamily: "'Fira Sans', sans-serif",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  body: {
    fontSize: 12,
    fontFamily: "'Fira Sans', sans-serif",
    color: "#2d2b2b",
    fontWeight: 500,
  },
}))(TableCell);

export const PaymentDetails = (props) => {
  const { item } = props;

  return (
    <>
      {item.transactionDetails ? (
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <StyledTableCell>Transaction ID</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Created on</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <StyledTableCell component="th" scope="row">
                {item.transactionDetails.txnId}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item.transactionDetails.amount}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item.transactionDetails.customerName}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item.transactionDetails.phoneNumber}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item.transactionDetails.createdOn}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item.transactionDetails.txnStatus}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <Button variant="contained" color="secondary" size="small">
                  Refund
                </Button>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <p>no products</p>
      )}
    </>
  );
};
