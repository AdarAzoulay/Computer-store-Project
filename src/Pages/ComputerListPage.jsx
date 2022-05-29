import { Grid, Pagination, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import ComputerCard from "../Components/ComputerCard";
import ComputerNavBar from "../Components/ComputerNavBar";
import {handleDelete} from "../Shared/Functions";


const useStyles = makeStyles({
  container: {
    padding: "2rem",
  },
  paginantion: {
    padding: "1rem 0",
    margin: "auto",
    justifyContent: "center",
  },
});

const ComputerListPage = ({ value, setValue }) => {
 
  const [computerModels, setComputerModels] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const cardsPerPage = 8;
  const pagesVisited = pageNumber * cardsPerPage;
  const pageCount = Math.ceil(computerModels.length / cardsPerPage);
  const classes = useStyles();


  useEffect(() => {
    fetch("http://localhost:8000/computerModels")
      .then((res) => res.json())
      .then((data) => setComputerModels(data));
  }, []);



  const displayCards = computerModels
    .slice(pagesVisited, pagesVisited + cardsPerPage)
    .map((ComputerModel) => (
      <Grid item xs={8} sm={7} md={5} lg={4} xl={3} key={ComputerModel.id}>
        <ComputerCard
          ComputerModel={ComputerModel}
          handleDelete={()=>handleDelete(ComputerModel.id, computerModels , setComputerModels)}
        />
      </Grid>
    ));

  const changePage = (event, value) => {
    setPageNumber(value - 1);
  };

  return (
    <>
      <ComputerNavBar value={value} setValue={setValue} />
      <div className={classes.container}>
        <Grid container spacing={4}>
          {displayCards}
        </Grid>
        <Stack className={classes.paginantion} spacing={1}>
          <Pagination
            size="large"
            variant="outlined"
            count={pageCount}
            color="secondary"
            onChange={changePage}
          />
        </Stack>
      </div>
    </>
  );
};

export default ComputerListPage;
