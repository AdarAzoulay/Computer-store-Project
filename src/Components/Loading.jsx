import { CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <div className='center' >
    <CircularProgress size={"5rem"}/>
    </div>
  )
}

export default Loading