import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { UserContext } from "../App";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export const HandleAddress = () => {
  const classes = useStyles();
  const userID = localStorage.getItem("currentUser");
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState({});
  const { setUserAddress } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8001/users/" + userID)
      .then((res) => res.json())
      .then((data) => {
        setAddress({
          street: data.address.street,
          city: data.address.city,
          country: data.address.country,
          zipCode: data.address.zipCode,
        });
      });
  }, []);

  const handleConfirm = (e) => {
    fetch("http://localhost:8001/users/" + userID, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        address,
      }),
    });
    setOpen(false);
    setUserAddress(address);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button sx={{ width: "5vw" }} variant="text" onClick={handleClickOpen}>
        Change
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Address for delivery</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit your details</DialogContentText>
          <div className={classes.flex}>
            <TextField
              sx={{ marginTop: "3%" }}
              required
              id="street"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
            />
            <TextField
              sx={{ marginTop: "3%" }}
              required
              id="city"
              label="City"
              type="text"
              fullWidth
              variant="standard"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <TextField
              sx={{ marginTop: "3%" }}
              required
              id="country"
              label="Country"
              type="text"
              fullWidth
              variant="standard"
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
            />
            <TextField
              sx={{ marginTop: "3%" }}
              required
              id="zipCode"
              label="Zip code"
              type="text"
              fullWidth
              variant="standard"
              value={address.zipCode}
              onChange={(e) =>
                setAddress({ ...address, zipCode: e.target.value })
              }
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};
