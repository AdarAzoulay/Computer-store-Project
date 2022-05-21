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

const EditList = () => {
  const classes = useStyles();
  const [isDisabled, setIsDisabled] = useState(true);
  const [computerModels, setComputerModels] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subheader, setSubheader] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [previousPrice, setPreviousPrice] = useState("");
  const [id, setId] = useState(0);

  const resetStates = () => {
    setTitle("");
    setDescription("");
    setSubheader("");
    setImagePath("");
    setRating(0);
    setPrice("");
    setLastPrice("")
  };

  useEffect(() => {
    fetch("http://localhost:8000/computerModels")
      .then((res) => res.json())
      .then((data) => setComputerModels(data));
  }, []);

  useEffect(() => {
    if (title && description && subheader && imagePath && rating && price)
      setIsDisabled(false);
    else setIsDisabled(true);
  }, [title, description, subheader, imagePath, rating, price]);

  useEffect(() => {
    if (id !== 0) {
      setIsDisabled(false);
      fetch("http://localhost:8000/computerModels/" + id)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
          setSubheader(data.subheader);
          setImagePath(data.imgpath);
          setRating(parseInt(data.rating));
          setPrice(data.price);
          setLastPrice(data.lastPrice)
          setPreviousPrice(data.price)
        });
    } else {
      setIsDisabled(true);
      resetStates();
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/computerModels/" + id, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        subheader,
        alt: title,
        imgpath: imagePath,
        price: price,
        rating,
        lastPrice: previousPrice
      }),
    });
    Swal.fire({
      icon: "success",
      title: "Item has been edited",
    });
    setId(0);
  };

  return (
    <div className="fullScreen sidesPadding">
      <Typography variant="h4" gutterBottom>
        Edit specific list
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        change the ID to get spesific model
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          type="number"
          onChange={(e) =>
            e.target.value > computerModels.length
              ? setId(0)
              : setId(parseInt(e.target.value))
          }
          value={id}
          className={classes.field}
          InputProps={{ inputProps: { min: 0, max: computerModels.length } }}
          label="Id"
          variant="outlined"
          required
        ></TextField>
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
          value={description === null ? "" : description}
          className={classes.field}
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
          fullWidth
          required
        ></TextField>
        <TextField
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price <= 0 ? "" : price}
          InputProps={{ inputProps: { min: 0, max: 10000 } }}
          className={classes.field}
          label="Price"
          variant="outlined"
          required
        ></TextField>
        <TextField
          type="number"
          value={lastPrice <= 0 ? "" : lastPrice}
          InputProps={{ inputProps: { min: 0, max: 10000 } }}
          className={classes.field}
          label="LastPrice"
          variant="outlined"
          disabled
        ></TextField>

        <Typography component="legend">Rating:</Typography>
        <Rating
          value={rating === null ? 0 : rating}
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
          CLICK TO EDIT!
        </Button>
      </form>
    </div>
  );
};

export default EditList;
