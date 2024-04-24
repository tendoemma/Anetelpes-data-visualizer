import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/system';
import Image from '../assets/Antelopes.jpg';
import { useSpring, animated } from 'react-spring';

//styled component for the hero section
const HeroSection = styled('div')({
  backgroundImage: `url(${Image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#ffffff',
  textAlign: 'center',
  padding: '100px 0',
  marginBottom: '30px',
});

function Hero({ number, loaded, speciesData, onSearchSubmit, setSearchQuery }) {
  const { number: animatedNumber } = useSpring({
    number,
    from: { number: 0 },
    config: { mass: 1, tension: 20, friction: 10 },
    delay: 200,
  });

  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (event, value) => {
    setSearchInput(value);
    setSearchQuery(value); // Update parent state with search input
  };

  const handleSubmit = () => {
    onSearchSubmit(searchInput); // Pass search input to parent handler
  };

  return (
    <HeroSection>
      { loaded && (
        <>
          <Typography variant="h1" component="div" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#FEFEFE", textShadow: "0.5px 0.5px 1px grey" }}>
            Total species found{' '}
            <Grid container justifyContent="center">
              <Grid item>
                <animated.div>
                  {animatedNumber.to((n) => n.toFixed(0))}
                </animated.div>
              </Grid>
            </Grid>
          </Typography>
          <div>
            <Autocomplete
              options={speciesData.map((species) => species.name)} 
              freeSolo 
              onInputChange={handleInputChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search..."
                  variant="standard"
                  InputProps={{ ...params.InputProps, 'aria-label': 'search' }}
                  style={{ backgroundColor: '#ffffff', borderRadius: '5px', padding: '8px 12px', marginRight: '10px', width: '40%' }}
                />
              )}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{marginTop:"10px"}} >
              Search
            </Button>
          </div>
        </>
      )}
    </HeroSection>
  );
};

export default Hero;
