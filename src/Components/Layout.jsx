import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles, styled } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { menuItems } from "../Shared/MenuItems";
import { useLocation, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { green } from "@mui/material/colors";
import Footer from "./Footer";
import { SearchBar } from "./SearchBar";
import Divider from "@mui/material/Divider";


const drawerWidth = 240;
const Datenow = new Date();

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#F0FFFF",
      width: "100%",
      height: "100%",
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#4682B4",
    },
    appBar: {
      // width: `calc(100% - ${drawerWidth}px)`,
      background: "#4682B4",
    },
    toolbar: theme.mixins.toolbar,

    siteMessage: {
      flexGrow: 1,
    },
    flex: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    name: {
      paddingLeft: "10px",
    },
  };
});

const Layout = ({ children, user, setUser }) => {
  const [itemsInCart, setItemsInCart] = useState(0);
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const userID = localStorage.getItem("currentUser");
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);


  useEffect(() => {
    if (user) {
      let itemCount = 0;
      user.cart.forEach((item) => {
        itemCount += item.amount;
      });
      setItemsInCart(itemCount);
    }
  }, [user]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setAnchorEl(null);
  };

  const showProfile = () => {
    navigate("/User/" + userID);
    setAnchorEl(null);
  };

  const showOrders = () => {
    navigate("/User/" + userID + "/Orders");
    setAnchorEl(null);
  };

  if (user) {
    return (
      <div className={classes.root}>
        
        {/* app bar */}
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar className={classes.appBar} elevation={0} position="fixed" open={open}>
            <Toolbar>
              {!open ?
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon fontSize="large"/>
              </IconButton>
              :
              <IconButton onClick={handleDrawerClose}>
              <MenuIcon sx={{color:"white"}} fontSize="large"/>
          </IconButton>
              }
              <Typography variant="h5" className={classes.siteMessage}>
              The Computer Store
            </Typography>
            <SearchBar />
            <Typography variant="subtitle1">
              {Datenow.getHours() > 5 && Datenow.getHours() < 16
                ? "Good Morning    "
                : "Good Evening    "}
            </Typography>
            <Button
              className={classes.name}
              onClick={handleClick}
            >
              <Stack direction="row" spacing={2}>
                <Avatar sx={{ bgcolor: green[200] }}>{`${
                  user.name.split(" ")[0][0]
                }${user.name.split(" ")[1][0]}`}</Avatar>
              </Stack>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openProfile}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={showProfile}>Profile</MenuItem>
              <MenuItem onClick={showOrders}>My Orders</MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
            <div className={classes.flex}>
              <Tooltip title="Cart" arrow>
                <IconButton
                  onClick={() => navigate("/Cart")}
                  className={classes.icon}
                >
                  <Badge badgeContent={String(itemsInCart)} color="error">
                    <ShoppingCartOutlinedIcon fontSize="large" />
                  </Badge>
                </IconButton>
              </Tooltip>
            </div>
            </Toolbar>
          </AppBar>
        </Box>

        {/* side drawer */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader >
          <img src="./ComputerPics/Logo.png" alt="Logo" width={239} height={88}/>
          </DrawerHeader>
          <Divider />
          <List>
            {user.isAdmin &&
              menuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => {
                    navigate(item.path);
                    parseInt(localStorage.setItem("active", 0));
                  }}
                  className={
                    location.pathname.includes("/ComputerListPage/") && item.path.includes("/ComputerListPage/") ? classes.active : (
                    location.pathname === item.path ? classes.active : null
                    )
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}

            {menuItems.map(
              (item) =>
                !user.isAdmin &&
                item.UserAllowed && (
                  <ListItem
                    button
                    key={item.text}
                    onClick={() => {
                      navigate(item.path);
                      parseInt(localStorage.setItem("active", 0));
                    }}
                    className={
                      location.pathname.includes("/ComputerListPage/") && item.path.includes("/ComputerListPage/") ? classes.active : (
                      location.pathname === item.path ? classes.active : null
                      )
                    }
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                )
            )}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />

          <div className={classes.page}>
            <div className={classes.toolbar}> </div>
            {children}
            <Footer />
          </div>
        </Main>
      </div>
    );
  }
  return children;
};

export default Layout;
