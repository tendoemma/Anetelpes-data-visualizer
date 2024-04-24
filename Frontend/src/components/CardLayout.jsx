import React from 'react';
import { Grid, Typography } from '@mui/material';

const CardLayout = ({ children, title, description, reverse }) => {
  return (
    <Grid container sx={{marginTop:"20px"}} spacing={3}>
      {/* Chart Sections  */}
      {reverse ? (
        <>
          <Grid item xs={12} sm={9} md={9} lg={6}>
            {children}
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={6}>
            <Typography variant="h3" gutterBottom sx={{ color: "#0C0744", fontWeight: "bold", fontFamily: "Arial, sans-serif", fontSize: "2rem", 
            letterSpacing: "0.05em",  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>
              {title}
            </Typography>
            <Typography variant="subtitle1" sx={{color:"#3C3C3C", textAlign:"justify"}}>
              {description}
            </Typography>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} sm={3} md={3} lg={5} >
            <Typography variant="h3" gutterBottom sx={{ color: "#0C0744", fontWeight: "bold", fontFamily: "Arial, sans-serif", fontSize: "2rem", 
            letterSpacing: "0.05em",  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>
              {title}
            </Typography>
            <Typography variant="subtitle1" sx={{color:"#3C3C3C ", textAlign:"justify"}}>
              {description}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={7} >
            {children}
          </Grid>
        </>
      )}
      {/* Text Section */}
    </Grid>
  );
};

export default CardLayout;
