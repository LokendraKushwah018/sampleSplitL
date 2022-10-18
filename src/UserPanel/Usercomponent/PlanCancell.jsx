import React from 'react'
import { Typography } from '@mui/material';
import {Box} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
const PlanCancell = () => {
  return (
    <>
     <Box sx={{ display: 'flex',alignItems:'center',justifyContent:'center',padding:"300px" }}>
      <ClearIcon sx={{width:'50px',height:'50px' , color:'red'}} ></ClearIcon><br />
     <Typography color={'red'}>Your payment is cancell</Typography>
      </Box>
    </>
  )
}

export default PlanCancell