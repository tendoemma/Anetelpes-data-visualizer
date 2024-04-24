import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';  
import Divider from '@mui/material/Divider';

import Table from '../components/charts/Table';
import BarChartComponent from '../components/charts/BarChart';
import PieChartComponent from '../components/charts/PieChart';
import CardLayout from '../components/CardLayout';

const AppLayout = ({ data, continentData, hornsData, avgHeightWeightData }) => {
  return (
    <Grid container spacing={2}>
      
      <Grid item xs={12} md={12}>
      <Typography variant="h2" gutterBottom sx={{ color: "#0C0744", fontWeight: "bold", fontFamily: "Arial, sans-serif", fontSize: "2.5rem", letterSpacing: "0.1em",  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>
          Overview
      </Typography>


       <Paper elevation={3} sx={{padding: "10px"}}>
          <Table data={data} />
        </Paper>  
      </Grid>
      
      <Grid item xs={12} md={12}>
        <CardLayout reverse={true} title="Continent-Based Distribution" description="The majority of the species are found in Africa, indicating a higher biodiversity of horned mammals on the continent. In contrast, the number of species in Asia is comparatively lower.">
          <PieChartComponent data={continentData} />
        </CardLayout>
      </Grid>
      
      <Grid item xs={12} md={12}>
      <Divider />
        <CardLayout reverse={false} title="Horn Diversity" description="Across the species listed, there's a diverse array of horn types, including twisted, straight, spiky, spiraled, lyre-shaped, and curved horns. This diversity showcases the evolutionary adaptations within these species.">
          <PieChartComponent data={hornsData} />
        </CardLayout>
      </Grid>

      <Grid item xs={12} md={12}>
      <Divider />
        <CardLayout reverse={true} title="Physical Characteristics" description="African species, on average, exhibit a slightly lower height compared to their Asian counterparts. This could be indicative of differences in habitat or evolutionary history between the two continents.">
          <BarChartComponent data={avgHeightWeightData} />
        </CardLayout>
      </Grid>
    </Grid>
  );
}

export default AppLayout;
