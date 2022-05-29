import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import ClearIcon from "@mui/icons-material/Clear";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    padding: "1.5rem",
    width: "100%",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
});

const CartTable = ({ user, setUserCart, setItemsInCart, setTotalPrice }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const userID = localStorage.getItem("currentUser");

  const changedAmount = (e, title) => {
    let itemCount = 0;
    let total = 0;
    const spesificItem = user.cart.find((t) => t.item === title);
    spesificItem.amount = parseInt(e.target.value);
    const index = user.cart.findIndex((t) => t.item === title);
    user.cart[index] = spesificItem;
    setUserCart(user.cart);
    user.cart.forEach((item) => {
      itemCount += item.amount;
      total += item.amount * item.price;
    });
    setItemsInCart(itemCount);
    setTotalPrice(total);
    fetch("http://localhost:8001/users/" + userID, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        cart: user.cart,
      }),
    });
  };

  const deleteFromCart = (title) => {
    {
      const newCart = user.cart.filter((t) => t.item !== title);
      setUserCart(newCart);
      fetch("http://localhost:8001/users/" + userID, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          cart: newCart,
        }),
      });
    }
  };
  return (
    <div className={classes.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.cart.map((item) => (
              <TableRow
                key={item.item}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell  className={classes.flex} component="th" scope="row">
                  {
                    <img
                    onClick={()=>navigate("/ComputerListPage/All/" + item.id)}
                      src={item.img}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="img"
                    />
                  }
                  {item.item}
                  
                </TableCell>
                <TableCell align="right">
                  <select
                    defaultValue={item.amount}
                    onChange={(e) => changedAmount(e, item.item)}
                    name="value"
                    id="value"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </TableCell>
                <TableCell align="right">{item.amount} X {item.price} = {item.amount*item.price}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => deleteFromCart(item.item)}>
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartTable;
