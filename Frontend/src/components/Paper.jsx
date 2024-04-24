import React, { Children } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

// Define a styled component for the paper
const CustomPaper = styled(Paper)({
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Add shadows
});

const MyPaper = ({children}) => {
  return (
    <CustomPaper elevation={2}>
      {children}
    </CustomPaper>
  );
};

export default MyPaper;
