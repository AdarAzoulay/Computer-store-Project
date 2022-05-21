import HomeIcon from '@mui/icons-material/Home';
import SubjectIcon from '@mui/icons-material/Subject';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';

const menuItems = [
    {
      text: "Home Page",
      icon: <HomeIcon color="secondary" />,
      path: "/",
      UserAllowed : true,
    },
    {
      text: "Laptops",
      icon: <SubjectIcon color="secondary" />,
      path: "/ComputerListPage/All",
      UserAllowed : true,
    },
    {
      text: "Add product",
      icon: <AddCircleOutlineIcon color="secondary" />,
      path: "/CreateList",
      UserAllowed : false,
    },
    {
      text: "Edit product",
      icon: <EditIcon color="secondary" />,
      path: "/EditList",
      UserAllowed : false,
    },
    {
      text: "Order Managment",
      icon: <ListIcon color="secondary" />,
      path: "/OrderManagment",
      UserAllowed : false,
    },
    {
      text: "About us",
      icon: <InfoIcon color="secondary" />,
      path: "/About",
      UserAllowed : true,
    },
  ];

  const subheaders = ["Lenovo","HP","Dell", "Apple", "Acer"]

  export { menuItems, subheaders }