import React, {useContext} from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Rating,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {addToCart} from "../Shared/Functions";
import { UserContext } from "../App";



const ComputerCard = ({ ComputerModel, handleDelete }) => { //getting the ComputerModel from ComputerListPage

  const { user , setUserCart } = useContext(UserContext);
  const userID = localStorage.getItem("currentUser");
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate("/ComputerListPage/All/" + id);
  };

  return (
    <Card sx={{ maxWidth: 300, minWidth: 300, maxHeight: 623 }}>
      {user.isAdmin && ComputerModel.id}
      <CardHeader
        sx={{ minHeight: 115, maxHeight: 80 }}
        action={
          user.isAdmin && (
            <IconButton onClick={() => handleDelete(ComputerModel.id)}>
              <DeleteOutlineIcon />
            </IconButton>
          )
        }
        title={ComputerModel.title}
        subheader={ComputerModel.subheader}
      />
      <CardMedia
        sx={{ minHeight: 250, cursor: "pointer" }}
        component="img"
        height="150"
        image={ComputerModel.imgpath}
        alt={ComputerModel.title}
        onClick={() => handleClick(ComputerModel.id)}
      />

      <CardContent sx={{ minHeight: 120 }}>
        <div style={{ textAlign: "center" }}>
          <Rating
            name="read-only"
            value={parseInt(ComputerModel.rating)}
            readOnly
          />
          <Typography variant="h4">{ComputerModel.price}$</Typography>
          <Button variant="outlined" onClick={()=> addToCart(user,ComputerModel, setUserCart, userID)}>
            Add to cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComputerCard;
