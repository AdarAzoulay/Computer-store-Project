import { Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Checkout from './Checkout'

const useStyles = makeStyles({
  container: {
    padding: "1rem",
    border: "1px solid #e5e5e5",
    width: "24vw",
    marginRight: "0.3rem",
    minHeight: "20vh",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: "10vh"

  },
  flex : {
    display : "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    marginTop: "1rem"
  },
  margintop: {
    marginTop: "1.5rem",

  }
})

const CartSummary = ({user,setUserCart,itemsInCart, totalPrice}) => {
 
  
  const classes = useStyles()
  return (
    <div className={classes.margintop}>
    <Paper className={classes.container}>
      <Checkout user={user} setUserCart={setUserCart}/>
      <div className={classes.flex}>
        <h5>Items({itemsInCart})</h5>
        <h5>${totalPrice}</h5>
      </div>
      
      <div className={classes.flex}>
        <h1>To pay</h1>
        <h1>${totalPrice}</h1>
      </div>
    </Paper>
    </div>
  )
}

export default CartSummary