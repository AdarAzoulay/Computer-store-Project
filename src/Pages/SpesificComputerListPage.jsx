import { Grid, Pagination, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    }
  });


const SpesificComputerListPage = ({ user, setUserCart , value, setValue }) => {
    let { name } = useParams();

    const classes = useStyles();
    const [computerModels, setComputerModels] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const cardsPerPage = 4;
    const pagesVisited = pageNumber * cardsPerPage;
    const pageCount = Math.ceil(computerModels.length / cardsPerPage);

  useEffect(() => {
    fetch("http://localhost:8000/computerModels")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.filter((t) => t.subheader === name)
        setComputerModels(newData)
        setPageNumber(0)
      })
      
  }, [name]);


  const displayCards = computerModels
    .slice(pagesVisited, pagesVisited + cardsPerPage)
    .map((ComputerModel) => (
      <Grid item xs={7} sm={4} md={5} lg={4} xl={3} key={ComputerModel.id}>
        <ComputerCard
        setUserCart={setUserCart}
          user={user}
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
   <ComputerNavBar value={value} setValue={setValue}/>
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
          page={pageNumber+1}
          onChange={changePage}
        />
      </Stack>
    </div>
    </>
  );
};

export default SpesificComputerListPage;
