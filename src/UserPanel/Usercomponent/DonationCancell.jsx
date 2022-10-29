import React from 'react'
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
const DonationCancell = () => {
  const [cancell, setcancell] = useState(true);
  const navigate = useNavigate();
  setTimeout(() => {
    setcancell(false);
    navigate("/Freestem");
  }, 5000)
  return (
    <>
      {
        cancell &&
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "300px" }}>
          <ClearIcon sx={{ width: '50px', height: '50px', color: 'red' }} ></ClearIcon><br />
          <Typography color={'red'}>Your payment is cancell</Typography>
        </Box>
      }
    </>
  )
}

export default DonationCancell;