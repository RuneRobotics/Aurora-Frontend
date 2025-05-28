// Panel.tsx
import React, { useState } from 'react';
import { Box, Button, Slider, Typography } from '@mui/material';

const Lighting: React.FC = () => {
  const [lightingState, setLightingState] = useState({
    exposure: 50,
    brightness: 50,
  });

  const handleLightingChange = (key: 'exposure' | 'brightness') => (
    event: Event,
    newValue: number | number[]
  ) => {
    setLightingState((prevState) => ({
      ...prevState,
      [key]: typeof newValue === 'number' ? newValue : prevState[key],
    }));
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom color="text.secondary">
          Exposure ({lightingState.exposure}%)
        </Typography>
        <Slider
          value={lightingState.exposure}
          onChange={handleLightingChange('exposure')}
          min={0}
          max={100}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box>
        <Typography gutterBottom color="text.secondary">
          Brightness ({lightingState.brightness}%)
        </Typography>
        <Slider
          value={lightingState.brightness}
          onChange={handleLightingChange('brightness')}
          min={0}
          max={100}
          valueLabelDisplay="auto"
        />
      </Box>
      <Button
            onClick={() => {}}
            variant="contained"
            fullWidth
            sx={{ mb: 1, textAlign: "left" }}
        >
        Save
      </Button>
    </Box>
  );
};

export default Lighting;
