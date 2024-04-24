import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import logoImage from '../assets/MadKudu_Logo.jpg';

const AppBarComponent = () =>{
  return (
    <AppBar position="static" sx={{backgroundColor:"white", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"}}>
      <Toolbar>
        <img src={logoImage} alt="Logo" style={{ height:"80px" }} />    
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
