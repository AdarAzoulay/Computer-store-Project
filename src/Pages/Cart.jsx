import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState, useContext } from "react";
import CartTable from "../Components/CartTable";
import CartSummary from "../Components/CartSummary";
import EmptyCart from "../Components/EmptyCart";
import { UserContext } from "../App";
import { AddressTable } from "../Components/AddressTable";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  flexColumn:{
    display: "flex",
    flexDirection:"column"
  },
  summary: {
    padding: "25px",
  },
  bottomborder: {
    padding: "20px",
    borderBottom: "2px solid black",
  },
});

const Cart = () => {
  const classes = useStyles();
  const [itemsInCart, setItemsInCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    let itemCount = 0;
    let total = 0;
    user.cart.forEach((item) => {
      itemCount += item.amount;
      total += item.amount * item.price;
    });
    setItemsInCart(itemCount);
    setTotalPrice(total);
  }, [user]);

  return (
    <div className="fullScreen">
      <Typography className={classes.bottomborder} variant="h4">
        Shopping cart ({itemsInCart} items)
      </Typography>
      {user.cart.length === 0 ? (
        <EmptyCart user={user} />
      ) : (
        <div className={classes.root}>
          <div >
          <AddressTable/>
          <CartTable
            setItemsInCart={setItemsInCart}
            setTotalPrice={setTotalPrice}
          />
          </div>
          <CartSummary
            itemsInCart={itemsInCart}
            totalPrice={totalPrice}
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
