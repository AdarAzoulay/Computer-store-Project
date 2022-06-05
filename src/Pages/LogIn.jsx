import {
  Button,
  Card,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { UserContext } from "../App";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(/Backgrounds/LoginBackground.png)`,
    backgroundRepeat: "repeat",
    height: "100vh",
  },
  bg: {
    backgroundColor: "#f0f0f0",
    padding: "2rem",
    borderRadius: "15px",
    minWidth: "25vw",
    minHeight: "55vh",
  },
  field: {
    padding: "1.5rem",
  },
  img: {
    borderRadius: "40px",
    paddingBottom: "0.5rem",
    display: "block",
    margin: " 0 auto",
  },
  topMargin: {
    marginTop: "3vh",
  },
  flex: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-between",
  },
});

const LogIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pass, setPass] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const { user, setUser } = useContext(UserContext);


  const handleClick = (e) => {
    e.preventDefault();
    fetch("http://localhost:8001/users")
      .then((res) => res.json())
      .then((data) => {
    data.forEach((user) => {
      if (
        user.email === e.target[0].value.trim() &&
        user.password === e.target[2].value
      ) {
        localStorage.setItem("currentUser", user.id);
        delete user.password;
        setUser(user);
        navigate("/");
      }
    });
    if (data.some((user) => user.email === e.target[0].value.trim()))
      setLoginError("Incorrect username or password.");
    else setLoginError("Email is not found.");
});
  }

  const handleEmail = (e) => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!pattern.test(e.target.value)) {
      setEmailError("Email must be valid");
    } else {
      setEmailError("");
    }
  };

  const handlePassword = (e) => {
    setPass(e.target.value);
    const pattern = /^[a-zA-Z\d]{8,}$/;
    if (!pattern.test(e.target.value)) {
      setPasswordError("Minimum 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className={classes.root}>
      <Card elevation={12} className={classes.bg}>
        <img
          className={classes.img}
          src="./ComputerPics/Logo.png"
          alt="Logo"
          width={250}
          height={100}
        />
        <Typography variant="h4">Login</Typography>
        <hr />
        <form onSubmit={handleClick}>
          <Typography
            sx={{
              width: "100%",
              backgroundColor: "rgba(235, 66, 66, 0.2)",
              color: "rgb(235, 66, 66)",
              borderRadius: "5px",
              paddingLeft: "3px",
            }}
            variant="h6"
          >
            {loginError ? (
              <ErrorIcon
                sx={{
                  marginRight: "0.5rem",
                  position: "relative",
                  top: "0.25rem",
                }}
              />
            ) : null}
            <span>{loginError}</span>
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            required
            label="Email"
            id="outlined-email-required"
            type="text"
            onBlur={handleEmail}
          />
          <Typography
            sx={{
              width: "100%",
              backgroundColor: "rgba(235, 66, 66, 0.2)",
              color: "rgb(235, 66, 66)",
              borderRadius: "5px",
              paddingLeft: "3px",
            }}
            variant="h6"
          >
            {emailError ? (
              <ErrorIcon
                sx={{
                  marginRight: "0.5rem",
                  position: "relative",
                  top: "0.25rem",
                }}
              />
            ) : null}
            {emailError}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            required
            id="outlined-password-input"
            label="Password"
            type={passwordShown ? "text" : "password"}
            onBlur={handlePassword}
          />
          {pass ? (
            <IconButton
              onClick={togglePassword}
              sx={{
                position: "absolute",
                marginLeft: "-45px",
                marginTop: "25px",
              }}
            >
              {passwordShown ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          ) : null}
          <Typography
            sx={{
              width: "100%",
              backgroundColor: "rgba(235, 66, 66, 0.2)",
              marginBottom: "5px",
              color: "rgb(235, 66, 66)",
              borderRadius: "5px",
              paddingLeft: "3px",
            }}
            variant="h6"
          >
            {passwordError ? (
              <ErrorIcon
                sx={{
                  marginRight: "0.5rem",
                  position: "relative",
                  top: "0.25rem",
                }}
              />
            ) : null}
            {passwordError} {/*at first its empty*/}
          </Typography>
          <div className={classes.flex}>
            <div>
              <input type="checkbox" />
              <Typography
                sx={{ display: "inline-block", marginLeft: "0.2rem" }}
              >
                Rembmer me
              </Typography>
            </div>
            <Typography>Forget password?</Typography>
          </div>
          <Button
            className={classes.topMargin}
            type="submit"
            fullWidth
            variant="contained"
          >
            Login
          </Button>
          <hr className={classes.topMargin} />
          <div style={{ textAlign: "center" }}>
            <Typography sx={{ display: "inline-block", marginRight: "0.5rem" }}>
              Don`t have an account?
            </Typography>
            <Link
              component="button"
              variant="subtitle1"
              onClick={() => navigate("/SignUp")}
              sx={{ display: "inline-block" }}
            >
              Register now
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LogIn;
