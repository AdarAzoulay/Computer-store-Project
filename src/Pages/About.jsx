import { Paper, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const useStyles = makeStyles({
  paper: {
    backgroundColor: "rgba(125, 148, 151, 0.5)",
    minHeight: "20vh",
    width: "100%",
    padding: "1.5em"
  },
  text: {
    padding: "0 5%",
    display: "flex",
  },
  icons: {
    flexBasis: "30%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 43, 255, 0.5)"
  },
  icon: {
    cursor: "pointer",
    marginBottom: "0.5rem",
    fontSize: "4em",
  },
  space: {
      margin: "1em 0 0.5em 1em",
      textDecoration: "underline"
      
  }
});

const About = () => {
  const classes = useStyles();

  return (
    <div className="fullScreen sidesPadding">
      <Typography className={classes.space} variant="h2">About Store</Typography>
      <div className={classes.text}>
        <Paper className={classes.paper} elevation={3}>
          <Typography sx={{lineHeight: "1.5"}} variant="body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ipsum
            sapiente, delectus molestiae harum commodi? Consequatur commodi
            deserunt perspiciatis unde mollitia atque distinctio dolores ab,
            odit iusto nulla nisi exercitationem cumque recusandae at eum neque
            ducimus suscipit, eos, nihil animi quasi qui! Repellendus illum sit
            reprehenderit eum adipisci neque doloribus incidunt accusantium
            optio dolorum, accusamus tempore! Perspiciatis eum autem nemo
            dolorem officiis veritatis, vel assumenda maiores deserunt amet quas
            fugiat laboriosam minus nesciunt. Nulla inventore modi laboriosam a
            dolor explicabo impedit cumque, consectetur quis et. Sunt, sed eos
            reiciendis, dolores debitis error possimus facilis, placeat deleniti
            corporis doloribus sequi illum!
          </Typography>
        </Paper >
        <Paper className={classes.icons}>
          <FacebookIcon className={classes.icon} />
          <InstagramIcon className={classes.icon} />
          <TwitterIcon className={classes.icon} />
        </Paper>
      </div>
    </div>
  );
};

export default About;
