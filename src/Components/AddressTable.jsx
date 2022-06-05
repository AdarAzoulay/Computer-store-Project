import React, { useContext } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { HandleAddress } from "./HandleAddress";
import { UserContext } from "../App";


const useStyles = makeStyles({
  container: {
    padding: "1.5rem 1.5rem 0 1.5rem",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
});

export const AddressTable = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);


  return (
    <div className={classes.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "55vw" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Address for delivery</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell> 
                <div>{user.name}</div>
                <div>{user.address.street}</div>
                <div>{user.address.city}, {user.address.zipCode} , {user.address.country}</div>
              </TableCell>
              <TableCell align="right">  <HandleAddress/> </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
