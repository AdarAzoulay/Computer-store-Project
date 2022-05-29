import {
  Button,
  Card,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { UserContext } from "../App";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";

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
    minWidth: "27vw",
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

const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8001/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const date = new Date();
    users.forEach((user) => {
      if (user.email === e.target[2].value.trim()) {
        return setLoginError("Email is already Exists.");
      }
    });

    if (
      e.target[0].value &&
      e.target[2].value &&
      e.target[4].value &&
      !passwordError &&
      !emailError &&
      !nameError &&
      isSubscribed
    ) {
      fetch("http://localhost:8001/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: e.target[0].value,
          email: e.target[2].value,
          password: e.target[4].value,
          dateCreated: date.toString(),
          profilePic: "/ProfilePics/Random.png",
          cart: [],
          isAdmin: false,
        }),
      }).then(() => {
        Swal.fire({
          icon: "success",
          title: "You successfully signed up",
        });
        fetch("http://localhost:8001/users")
          .then((res) => res.json())
          .then((data) => {
            const newUser = data.find(
              (newUser) => e.target[2].value === newUser.email
            );
            localStorage.setItem("currentUser", newUser.id);
            setUser(newUser);
            navigate("/");
          });
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "Check you filled all the fields correctly",
      });
    }
  };

  const handleName = (e) => {
    const pattern = /^[A-z,.'-]{1,}( [A-z,.'-]{1,})+$/i;
    if (!pattern.test(e.target.value)) {
      setNameError("Must include First name and Last name");
    } else {
      setNameError("");
    }
  };

  const handleEmail = (e) => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!pattern.test(e.target.value)) {
      setEmailError("Email must be valid");
    } else {
      setEmailError("");
    }
  };

  const handlePassword = (e) => {
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

  const handleCheckbox = (e) => {
    e.target.checked ? setIsSubscribed(true) : setIsSubscribed(false);
  };

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className={classes.root}>
      <Card sx={{ overflow: "auto" }} elevation={12} className={classes.bg}>
        <img
          className={classes.img}
          src="./ComputerPics/Logo.png"
          alt="Logo"
          width={250}
          height={100}
        />
        <Typography variant="h4">Sign Up</Typography>
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
            label="Name"
            id="outlined-name-required"
            type="text"
            onChange={handleName}
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
            {nameError ? (
              <ErrorIcon
                sx={{
                  marginRight: "0.5rem",
                  position: "relative",
                  top: "0.25rem",
                }}
              />
            ) : null}
            <span>{nameError}</span>
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            required
            label="Email"
            id="outlined-email-required"
            type="text"
            onChange={handleEmail}
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
            onChange={handlePassword}
          />
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
          <div style={{ textAlign: "center" }}>
            <input
              type="checkbox"
              value={isSubscribed}
              onChange={handleCheckbox}
            />
            <Typography sx={{ display: "inline-block", marginLeft: "0.2rem" }}>
              I read and agree to Terms & Conditions
            </Typography>
          </div>
          <Button
            className={classes.topMargin}
            type="submit"
            fullWidth
            variant="contained"
          >
            Create Account
          </Button>
          <hr className={classes.topMargin} />
          <div style={{ textAlign: "center" }}>
            <Typography sx={{ display: "inline-block", marginRight: "0.5rem" }}>
              Already have an account?
            </Typography>
            <Link
              component="button"
              variant="subtitle1"
              onClick={() => navigate("/Login")}
              sx={{ display: "inline-block" }}
            >
              Sign in
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
