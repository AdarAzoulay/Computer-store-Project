import {
  Box,
  Breadcrumbs,
  Button,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {getLocal, addToCart} from "../Shared/Functions";


const DescriptionPage = ({ user, setUserCart }) => {
  const [computerModels, setComputerModels] = useState({});
  const [descriptionArray, setDescriptionArray] = useState([]);
  const userID = localStorage.getItem("currentUser");
  const EXACT_PATH = "/ComputerListPage/" + computerModels.subheader;

  let { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:8000/computerModels")
      .then((res) => res.json())
      .then((data) => {
        const computerModels = data.find((t) =>parseInt(t.id)  ===parseInt(id) );
        setComputerModels(computerModels);
        setDescriptionArray(computerModels.description);
      });
  }, [id]);

   function handleClick(event) {
    event.preventDefault();
  }

  return (
    <div className="flex">
      <Box className="box">
        <div className="marginTop" role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" to="/">
              <Typography onClick={()=> localStorage.setItem("active", 0)} sx={{color: "rgba(0, 0, 0, 0.5)", '&:hover': {textDecoration:"underline"}}}>Home</Typography>
            </Link>
            <Link onClick={()=> localStorage.setItem("active", 0)} underline="hover" to="/ComputerListPage/All">
            <Typography sx={{color: "rgba(0, 0, 0, 0.5)", '&:hover': {textDecoration:"underline"}}}>All Models</Typography>            </Link>
            <Link onClick={()=> getLocal(computerModels.subheader)} underline="hover" to={EXACT_PATH}>
              <Typography sx={{color: "rgba(0, 0, 0, 0.5)", '&:hover': {textDecoration:"underline"}}}>{computerModels.subheader}</Typography>
            </Link>
            <Typography sx={{color: "black"}}>
              {computerModels.title === undefined
                ? null
                : computerModels.title
                    .split(" ")
                    .slice(0, 3)
                    .toString()
                    .replaceAll(",", "  ")}
            </Typography>
          </Breadcrumbs>
        </div>

        <Typography sx={{ mt: 2 }} variant="h4">
          {computerModels.title}
        </Typography>
        <Typography variant="subtitle2"> {computerModels.subheader}</Typography>
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            sx={{ mb: 2, mt: 1 }}
            name="read-only"
            value={parseInt(computerModels.rating)}
            readOnly
          />
          <Box sx={{ mb: 2, mt: 1, ml: 1, fontSize: "x-large" }}>
            {computerModels.rating}
          </Box>
        </Box>
        <Typography sx={{ ml: 1 }} variant="h5">
        </Typography>
        <ul>
          {descriptionArray.map((t) => {
            return <li key={t}>{t}</li>;
          })}
        </ul>
        <Typography variant="h6">Price :</Typography>
        <Typography variant="h4">
          ${computerModels.price}
          <Button
            sx={{ ml: 2 }}
            variant="outlined"
            onClick={()=>addToCart(user,computerModels, setUserCart, userID )}
          >
            Add to cart
          </Button>
        </Typography>
      </Box>
      <img
        src={computerModels.imgpath}
        alt={computerModels.alt}
        width="400"
        height="400"
      />
    </div>
  );
};

export default DescriptionPage;
