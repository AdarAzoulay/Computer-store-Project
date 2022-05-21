import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  input: {
    "&:invalid": {
      border: "red solid 2px",
    },
  },
});

const Checkout = ({ user, setUserCart }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const userID = localStorage.getItem("currentUser");

  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const [nameError, setNameError] = useState(false);
  const [creditCardError, setCreditCardError] = useState(false);
  const [expirationError, setExpirationError] = useState(false);
  const [cvvError, setCvvError] = useState(false);
  const [obj, setObj] = useState({ a: true, b: true, c: true, d: true });


  const cart = user.cart;
  let totalPrice = 0;
  let totalAmount = 0;
  let itemOrdered = [];

  useEffect(() => {
    if (!obj.a && !obj.b && !obj.c && !obj.d) setDisable(false);
  }, [obj]);

  const creditCardVisaRegex = /^4[0-9]{15}?$/;
  const exprRegex = /^(0[1-9]|1[0-2])\/?(2[2-9])$/;
  const nameRegex = /[a-zA-Z]/;

  const nameReg = (e) => {
    e.target.value = e.target.value.replace(/[0-9]/g, "");
    if (!nameRegex.test(e.target.value)) {
      if (e.target.value === "") {
        setNameError(true);
      } else setNameError(true);
      setDisable(true);
      setObj((prev) => ({
        ...prev,
        a: true,
      }));
    } else {
      setNameError(false);
      setObj((prev) => ({
        ...prev,
        a: false,
      }));
    }
  };

  const cvvValidate = (e) => {
    if (!/[0-9]/.test(e.target.value)) e.target.value = "";
    if (e.target.value.length !== 3) {
      setCvvError(true);
      setDisable(true);
      setObj((prev) => ({
        ...prev,
        b: true,
      }));
    } else {
      setCvvError(false);
      setObj((prev) => ({
        ...prev,
        b: false,
      }));
    }
  };

  const expirationRegex = (e) => {
    let a = e.target.value;
    if (!exprRegex.test(a)) {
      setExpirationError(true);
      setDisable(true);
      setObj((prev) => ({
        ...prev,
        c: true,
      }));
    } else {
      setExpirationError(false);
      setObj((prev) => ({
        ...prev,
        c: false,
      }));
    }
    if (e.target.value.length === 5) return null;
    else
      e.target.value = e.target.value
        .replace(/[^\d]/g, "")
        .replace(/(.{2})/g, "$1/")
        .trim(); //  "/"" after 2 chars
  };

  const creditcardReg = (e) => {
    let a = e.target.value.replace(/ /g, ""); //remove all spaces
    if (!creditCardVisaRegex.test(a)) {
      setCreditCardError(true);
      setDisable(true);
      setObj((prev) => ({
        ...prev,
        d: true,
      }));
    } else {
      setObj((prev) => ({
        ...prev,
        d: false,
      }));
      setCreditCardError(false);
    }
    e.target.value = e.target.value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim(); //space every 4 chars
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNameError(false);
    setCreditCardError(false);
    setCvvError(false);
    setExpirationError(false);
    setDisable(true);
  };

  const handlePay = () => {
    const d = new Date();
    cart.forEach((t) => {
      itemOrdered.push({ itemTitle: t.item, amount: t.amount, itemPrice: t.price });
      totalPrice = totalPrice + t.price * t.amount;
      totalAmount = totalAmount + t.amount;
    });
    fetch("http://localhost:8001/users/" + userID, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        cart: [],
      }),
    });
    fetch("http://localhost:8001/orders", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        itemOrdered: itemOrdered,
        amountOfItems: totalAmount,
        totalPrice: totalPrice,
        purchaseDate: d.toUTCString(),
        userOrderedID: parseInt(userID),
        personName: user.name,
      }),
    });
    Swal.fire({
      icon: "success",
      title: "Thanks for purchasing from us",
      text: "Hope to deal with you again...",
    });
    setUserCart([]);
    setOpen(false);
    navigate("/");
  };
  return (
    <div>
      <Button
        sx={{ width: 1 }}
        style={{ borderRadius: "25px" }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Go to checkout
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Payment Info</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill your payment details</DialogContentText>
          <div className={classes.flex}>
            <TextField
              sx={{ marginTop: "3%" }}
              error={nameError}
              helperText={nameError ? "Must be validate name" : ""}
              autoFocus
              id="name"
              label="Card Holder's Name"
              type="name"
              fullWidth
              variant="standard"
              onChange={(e) => nameReg(e)}
            />
            <TextField
              sx={{ marginTop: "3%" }}
              error={creditCardError}
              helperText={creditCardError ? "Enter a valid Card" : ""}
              id="card"
              label="Credit card VISA only (start with 4)"
              type="card"
              placeholder="1234 1234 1234 1234"
              fullWidth
              variant="standard"
              onChange={(e) => creditcardReg(e)}
              inputProps={{ maxLength: 19 }}
            />
            <TextField
              sx={{ width: "30%", marginRight: "5%", marginTop: "3%" }}
              error={expirationError}
              helperText={expirationError ? "Please enter valid date" : ""}
              margin="dense"
              id="Expiration"
              label="Expiration"
              type="Expiration"
              placeholder="MM/YY"
              variant="standard"
              onChange={(e) => expirationRegex(e)}
              inputProps={{ maxLength: 5 }}
            />
            <TextField
              sx={{ marginTop: "3%" }}
              error={cvvError}
              helperText={cvvError ? "Must be 3 characters" : ""}
              id="CVC"
              label="CVC"
              type="ccv"
              placeholder="CVC"
              variant="standard"
              inputProps={{ maxLength: 3 }}
              onChange={(e) => cvvValidate(e)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={disable} onClick={handlePay}>
              Pay
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Checkout;
