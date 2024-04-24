import React from 'react';
import { Modal, Typography, Box, Button, Grid } from '@mui/material';

const ModalComponent = ({ species, onClose, open }) => {
  return (
    <Modal
      open={open} 
      onClose={onClose} // Ensure that onClose is called when the modal is closed
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 400 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{display:"flex", flexDirection:"column", justifyContent:"space-evenly"}}>
          {species ? 
           (
            <>
            <Typography variant="h5" id="modal-modal-title" gutterBottom>
              Species Details
            </Typography>            
              <div>
                <Typography variant="body1" id="modal-modal-description" gutterBottom>
                  Name: {species.name}
                </Typography>
                <Typography variant="body1" id="modal-modal-description" gutterBottom>
                  Continent: {species.continent}
                </Typography>
                <Typography variant="body1" id="modal-modal-description" gutterBottom>
                  Horns: {species.horns}
                </Typography>
                <Typography variant="body1" id="modal-modal-description" gutterBottom>
                  Weight: {species.weight} lbs
                </Typography>
                <Typography variant="body1" id="modal-modal-description" gutterBottom>
                  Height: {species.height} in
                </Typography>
              </div>
            </>
            ):    
            <Typography variant="h5" id="modal-modal-title" gutterBottom sx={{color:"red"}}>
             Species not found 
            </Typography> 
            }
            <Button variant='outlined' sx={{width:"30%"}} onClick={onClose}>Close</Button> {/* Call onClose when the button is clicked */}
          </Grid>
          <Grid item xs={6}>
            {species && (
              <img src={species.picture} alt={species.name} style={{ maxWidth: '100%', maxHeight: '100%', display: 'block', margin: 'auto' }} />
            )}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
