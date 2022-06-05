import { Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import Checkout from './Checkout'
import { UserContext } from "../App";


const useStyles = makeStyles({
  container: {
    padding: "1rem",
    border: "1px solid #e5e5e5",
    width: "24vw",
    marginRight: "1.5rem",
    minHeight: "20vh",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: "10vh",
    marginTop:"2vh"

  },
  flex : {
    display : "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  margintop: {
    marginTop: "0.5rem",
  },
    flexTop: {
    marginTop: "1rem",
    display : "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  }
})

const CartSummary = ({itemsInCart, totalPrice}) => {
  const classes = useStyles();
  const { user, setUserCart } = useContext(UserContext);

  return (
    <div className={classes.margintop}>
    <Paper className={classes.container}>
    <Typography variant='h5'>Summary</Typography>
      <div className={classes.flexTop}>
        <span>Items ({itemsInCart})</span>
        <span>${totalPrice}</span>
      </div>
      <div className={classes.flex}>
        <span>Shipping </span>
        <span>$0</span>
      </div>
    <hr />
      <div className={classes.flex}>
        <h1>To pay</h1>
        <h1>${totalPrice}</h1>
      </div>
      <Checkout user={user} setUserCart={setUserCart}/>
    </Paper>
    </div>
  )
}

export default CartSummary