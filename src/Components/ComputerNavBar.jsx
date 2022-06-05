import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  nav: {
    padding: "1.5rem 0",
    margin: "0.5rem 0 0 0 ",
    justifyContent: "space-between",
  },
  cell:{
    backgroundColor: " rgba(8, 76, 184, 0.5)",
    border: "1px solid black"
  }
});

const ComputerNavBar = ({  setValue }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const onChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("active",newValue)
    navigate("/ComputerListPage/" + event.target.innerText);
  };

  return (
    <Box className={classes.nav}>
      <BottomNavigation showLabels value={parseInt(localStorage.getItem("active"))} onChange={onChange}>
        <BottomNavigationAction className={classes.cell} label="All" />
        <BottomNavigationAction className={classes.cell} label="Lenovo" />
        <BottomNavigationAction className={classes.cell} label="HP" />
        <BottomNavigationAction className={classes.cell} label="Dell" />
        <BottomNavigationAction className={classes.cell} label="Apple" />
        <BottomNavigationAction className={classes.cell} label="Acer" />
      </BottomNavigation>
    </Box>
  );
};

export default ComputerNavBar;
