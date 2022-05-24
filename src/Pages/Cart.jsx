import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState,useContext } from "react";
import CartTable from "../Components/CartTable";
import CartSummary from "../Components/CartSummary";
import EmptyCart from "./EmptyCart";
import { UserContext } from "../App";


const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
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
  const { user  , setUserCart} = useContext(UserContext);


  useEffect(() => {
    let itemCount = 0;
    let total = 0
    user.cart.forEach((item) => {
      itemCount += item.amount;
      total += item.amount * item.price
    });
    setItemsInCart(itemCount);
    setTotalPrice(total)
  }, [user.cart]);

  return (
    <div className="fullScreen">
      <Typography className={classes.bottomborder} variant="h4">
        Shopping cart ({itemsInCart} items)
      </Typography>
      {user.cart.length === 0 ? <EmptyCart user={user}/> : (
        <div className={classes.root}>
          <CartTable
            user={user}
            setUserCart={setUserCart}
            setItemsInCart={setItemsInCart}
            setTotalPrice={setTotalPrice}
          />
          <CartSummary
            user={user}
            setUserCart={setUserCart}
            itemsInCart={itemsInCart}
            totalPrice={totalPrice}
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
