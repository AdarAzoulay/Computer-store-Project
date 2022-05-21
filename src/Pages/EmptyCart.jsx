import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "70vh",
  },
});

const EmptyCart = ({user}) => {
    const navigate = useNavigate();
  const classes = useStyles();

  return (
    <div className={classes.flex}>
      <img
        className="cart"
        src="./ComputerPics/empty.png"
        alt="empty cart"
        width={500}
        height={300}
      />
      <Typography variant="h4" component="h2"> Time to start shopping !   </Typography>
        <Typography variant="h6">Hi, {user.name.split(" ")[0]} - fill it up with savings from your usual departments. </Typography>
        <div>
        <Button onClick={()=> navigate("/ComputerListPage/All")} variant="outlined">Computers</Button>
        {/* <Button onClick={()=> navigate("/ComputerListPage/All")} variant="outlined">Laptops</Button>
        <Button onClick={()=> navigate("/ComputerListPage/All")} variant="outlined">Laptops</Button>
        <Button onClick={()=> navigate("/ComputerListPage/All")} variant="outlined">Laptops</Button> */}

        </div>

      
    </div>
  );
};

export default EmptyCart;
