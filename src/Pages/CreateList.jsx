import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Swal from "sweetalert2";
import { subheaders } from "../Shared/MenuItems";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  fieldButton: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    width: "200px",
  },
});

const CreateList = () => {
  const classes = useStyles();
  const [isDisabled, setIsDisabled] = useState(true);
  const [title, setTitle] = useState(null);
  let [description, setDescription] = useState(null);
  const [subheader, setSubheader] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (title && description && subheader && imagePath && rating && price)
      setIsDisabled(false);
    else setIsDisabled(true);
  }, [title, description, subheader, imagePath, rating, price]);

  const handleSubmit = (e) => {
    let newDescription = description.split("\n");
    e.preventDefault();
    fetch("http://localhost:8000/computerModels", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title,
        description: newDescription,
        subheader,
        alt: title,
        imgpath: imagePath,
        price: price,
        rating,
        lastPrice: "0"
      }),
    }).then(() => {
      setTitle(null);
      setDescription(null);
      setSubheader(null);
      setImagePath(null);
      setRating(0);
      setPrice(null);
      Swal.fire({
        icon: "success",
        title: "Item Created",
      });
    });
  };

  return (
    <div className="fullScreen sidesPadding">
      <Typography variant="h4" gutterBottom>
        Create new list
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          value={title === null ? "" : title}
          className={classes.field}
          label="Title"
          variant="outlined"
          fullWidth
          required
        ></TextField>
        <FormControl sx={{ width: "15vh" }}>
          <InputLabel>Subheader</InputLabel>
          <Select
            sx={{ width: "15vh" }}
            value={subheader === null ? "" : subheader}
            label="Subheader"
            onChange={(e) => setSubheader(e.target.value)}
          >
            {subheaders.map((header) => (
              <MenuItem key={header} value={header}>
                {header}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          onChange={(e) => setDescription(e.target.value)}
          className={classes.field}
          value={description === null ? "" : description}
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
        ></TextField>

        <TextField
          onChange={(e) => setImagePath(e.target.value)}
          value={imagePath === null ? "" : imagePath}
          className={classes.field}
          label="Image-Path"
          variant="outlined"
          required
          fullWidth
        ></TextField>
        <TextField
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price <= 0 ? "" : price}
          className={classes.field}
          label="Price"
          variant="outlined"
          required
        ></TextField>
        <Typography component="legend">Rating:</Typography>
        <Rating
          value={rating}
          name="simple-controlled"
          onChange={(e) => {
            setRating(parseInt(e.target.value));
          }}
        />
        <Button
          className={classes.fieldButton}
          type="submit"
          variant="contained"
          disabled={isDisabled}
        >
          CLICK TO Create!
        </Button>
      </form>
    </div>
  );
};

export default CreateList;
