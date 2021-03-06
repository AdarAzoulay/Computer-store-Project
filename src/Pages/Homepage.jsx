import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import CardHomepage from "../Components/CardHomepage";

const useStyles = makeStyles({
  fullScreen: {
    maxWidth: "96%",
    display: "flex",
    justifyContent: "center",
    marginTop: "3.5vh"
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "53%",
    alignItems: "center",
    flexWrap: "wrap",

  },
  flexColImg: {
    display: "flex",
    flexBasis: "23%",
    flexWrap: "wrap",
    marginTop: "2vh"
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "2vh",
    justifyContent: "center"
  },

  img: {
    width: "100%",
    // minHeight: "12vh",
  },

});

const Homepage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [computerModels, setComputerModels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/computerModels")
      .then((res) => res.json())
      .then((data) => {
          let homePage3Models = [data[0], data[5], data[15]]
          setComputerModels(homePage3Models)
          
      })
  }, []);

  return (
    <>
    <div className={classes.fullScreen}>
      <div className={classes.flexCol}>
        <Typography variant="h2">The</Typography>
        <Typography variant="h2">Computer</Typography>
        <Typography variant="h2">Store</Typography>
        <Typography variant="subtitle2">
          get the new computers <br />
          for special prices
        </Typography>
        <Button
          sx={{
            display: "block",
            marginTop: "2vh",
            width: "30vh",
            borderRadius: "25px",
          }}
          variant="contained"
          onClick={() => navigate("/ComputerListPage/All")}
        >
          Shop now
        </Button>
        <Typography sx={{textDecoration: "underline", marginTop: "2vh", marginBottom:"2vh"}} variant="h4">Today's deals</Typography>
        <div className={classes.flexRow}>
          <CardHomepage computerModels={computerModels[0]} className={classes.rowItem}/>
          <CardHomepage computerModels={computerModels[1]} className={classes.rowItem}/>
          {window.innerWidth > 1475 ?  <CardHomepage computerModels={computerModels[2]} /> : null }
        </div>
      </div>
      <div className={classes.flexColImg}>
        <img className={classes.img} src="/ComputersHome/Computers1.png" alt="Computers1"></img>
        <img className={classes.img} src="/ComputersHome/Computers5.png" alt="Computers5"></img>
        <img className={classes.img} src="/ComputersHome/Computers3.png" alt="Computers3"></img>
        <img className={classes.img} src="/ComputersHome/Computers4.png" alt="Computers4"></img>
      </div>
      <div className={classes.flexColImg}>
        <img className={classes.img} src="/ComputersHome/Computers7.png" alt="Computers7"></img>
        <img className={classes.img} src="/ComputersHome/Computers6.png" alt="Computers6"></img>
        <img className={classes.img} src="/ComputersHome/Computers2.png" alt="Computers2"></img>
        <img className={classes.img} src="/ComputersHome/Computers8.png" alt="Computers8"></img>
      </div>
    </div>
    </>
  );
};

export default Homepage;
