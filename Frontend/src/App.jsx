import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { useSpring, animated } from 'react-spring';
import Modal from '@mui/material/Modal';

import AppBar from './components/AppBar';
import AppLayout from './layouts/appLayout';
import Hero from './components/Hero';
import Footer from './components/FooterComponent';
import ModalComponent from './components/ModalComponent';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[900],
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 12,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

function App() {
  const [speciesData, setSpeciesData] = useState(null);
  const [continentData, setContinentData] = useState(null);
  const [hornsData, setHornsData] = useState(null);
  const [avgSizeData, setAvgSizeData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [number, setNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001');
        setSpeciesData(response.data);
        setNumber(response.data.length);
        setLoaded(true);

        // Count antelopes by continent for PieChart
        const continentCounts = response.data.reduce((acc, curr) => {
          acc[curr.continent] = (acc[curr.continent] || 0) + 1;
          return acc;
        }, {});

        // Count antelopes by horn type for PieChart
        const hornTypeCounts = response.data.reduce((acc, curr) => {
          acc[curr.horns] = (acc[curr.horns] || 0) + 1;
          return acc;
        }, {});

        // Convert data to required format for PieChart
        const pieChartContinentData = Object.entries(continentCounts).map(([continent, count], index) => ({
          id: index,
          value: count,
          label: continent,
        }));
        setContinentData(pieChartContinentData);

        // Convert data to required format for PieChart
        const pieChartHornsData = Object.entries(hornTypeCounts).map(([horns, count], index) => ({
          id: index,
          value: count,
          label: horns,
        }));
        setHornsData(pieChartHornsData);

        // Calculate average weight and height by continent for BarChart
        const continentSizeData = response.data.reduce((acc, curr) => {
          if (!acc[curr.continent]) {
            acc[curr.continent] = { count: 0, totalWeight: 0, totalHeight: 0 };
          }
          acc[curr.continent].count++;
          acc[curr.continent].totalWeight += curr.weight;
          acc[curr.continent].totalHeight += curr.height;
          return acc;
        }, {});

        const barChartData = Object.entries(continentSizeData).map(([continent, values]) => ({
          continent,
          avgWeight: values.totalWeight / values.count,
          avgHeight: values.totalHeight / values.count,
        }));
        setAvgSizeData(barChartData);

        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Function to handle search
  const handleSearch = () => {
    
    const result = speciesData.find(species => species.name.toLowerCase() === searchQuery.toLowerCase());
    setSearchResult(result);
    setModalOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <AppBar />
        <Hero number={number} speciesData={speciesData} loaded={loaded} onSearchSubmit={handleSearch} setSearchQuery={setSearchQuery} />
        <Grid container justifyContent="center">
          <Grid item xs={12} md={7}>
            <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
              {speciesData ? (
                <AppLayout
                  data={speciesData}
                  continentData={continentData}
                  hornsData={hornsData}
                  avgHeightWeightData={avgSizeData}
                />
              ) : (
                <h2>Loading...</h2>
              )}
            </div>
          </Grid>
        </Grid>
        <Footer />     
        <ModalComponent species={searchResult} onClose={handleCloseModal} open={modalOpen} />      
      </>
    </ThemeProvider>
  );
}

export default App;
