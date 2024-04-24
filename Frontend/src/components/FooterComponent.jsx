import React from 'react';
import { Paper, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Paper
      square
      sx={{
        backgroundColor: '#18172E', 
        color: '#fff', 
        padding: 4, 
        marginTop: 4, 
        bottom: 0,
      }}
    >
      <Typography variant="body1">
        © 2024 Antelopes Data Visualizer. All rights reserved.
      </Typography>
    </Paper>
  );
};

export default Footer;
