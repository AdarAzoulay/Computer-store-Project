import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import {  useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles({
  img: {
    width: "11rem",
    height: "11rem",
    backgroundColor: "rgba(215, 215, 246, 0.47)",
    border: "1px solid black",
    borderRadius: "50%" /*the magic*/,
    margin: "2rem",
  },
  container: {
    width: "100%",
    height: "90vh",
    marginTop: "5vh"
  },
  row: {
    display: "flex",
  },
  profileInfo: {
    margin: "2rem 0 1rem 0",
  },
  margin: {
    margin: 0,
    fontWeight:"bold"
  },
  second: {
    width: "100%",
    marginTop: "1rem"
  }
});

const Profile = ({ user }) => {

  const classes = useStyles();
  const navigate = useNavigate();
  let { userID } = useParams();
  const date = user.dateCreated;
  const path = "/User/" + userID + "/Orders";

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <img className={classes.img} src={user.profilePic} alt={user.name} />
        <div className={classes.second}>
          <h1 className={classes.profileInfo}>Profile of {user.name}</h1>
          <div className={classes.margin}>Member since {date.split(" ")[1]} {date.split(" ")[3]}</div>
          <hr />
          <Button variant="contained" sx={{borderRadius: "25px", marginTop: "1rem"}} onClick={()=> navigate(path)}>My orders</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
