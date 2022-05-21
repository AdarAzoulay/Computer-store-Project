import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CardHomepage = ({ computerModels }) => {
  const navigate = useNavigate();
  let PATH;

  if (computerModels) PATH = "ComputerListPage/All/" + computerModels.id;

  if (computerModels) {
    return (
      <Card sx={{ maxWidth: 185, marginRight: "4vh" }}>
        <CardActionArea
          onClick={() => navigate(PATH)}
          sx={{ minHeight: "28vh" }}
        >
          <CardMedia
            component="img"
            height="140"
            image={computerModels.imgpath}
            alt={computerModels.alt}
          />
          <CardContent
          sx={{ minHeight: "16vh", padding:"16px 16px 0 16px" }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {computerModels.subheader}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {computerModels.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div>
          <Typography sx={{ display: "inline" }}>List Price: </Typography>
          <Typography
            sx={{ textDecoration: "line-through", display: "inline" }}
          >
            {computerModels.lastPrice}
          </Typography>
        </div>
        <div>
          <Typography sx={{ display: "inline" }}>With Deal: </Typography>
          <Typography sx={{ display: "inline", color:"red", fontSize: "large" }}>${computerModels.price}</Typography>
        </div>
        <div>
        <Typography sx={{display: "inline",}}>You Save: </Typography>
        <Typography sx={{display: "inline", color:"red" }}>${(computerModels.lastPrice- computerModels.price)} ({Math.round(100 * (computerModels.lastPrice - computerModels.price) / computerModels.lastPrice)}%)</Typography>
        </div>
      </Card>
    );
  } else return null;
};

export default CardHomepage;
