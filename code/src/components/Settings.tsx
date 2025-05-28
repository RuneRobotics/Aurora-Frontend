// Panel.tsx
import React from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import NumericInput from './NumericInput';

const Settings: React.FC = () => {
  const [values, setValues] = React.useState<Record<string, number | ''>>({
    x: '',
    y: '',
    z: '',
    roll: '',
    pitch: '',
    yaw: '',
    fps: '',
  });

  return (
    <Box sx={{ p: 1, boxSizing: 'border-box' }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
            <NumericInput label="X" value={values.x} onChange={(v) => setValues(prev => ({ ...prev, x: v }))} />
        </Grid>

        <Grid item xs={4}>
            <NumericInput label="Y" value={values.y} onChange={(v) => setValues(prev => ({ ...prev, y: v }))} />
        </Grid>

        <Grid item xs={4}>
            <NumericInput label="Z" value={values.z} onChange={(v) => setValues(prev => ({ ...prev, z: v }))} />
        </Grid>

        <Grid item xs={4}>
            <NumericInput label="Roll" value={values.roll} onChange={(v) => setValues(prev => ({ ...prev, roll: v }))} />
        </Grid>

        <Grid item xs={4}>
            <NumericInput label="Pitch" value={values.pitch} onChange={(v) => setValues(prev => ({ ...prev, pitch: v }))} />
        </Grid>

        <Grid item xs={4}>
            <NumericInput label="Yaw" value={values.yaw} onChange={(v) => setValues(prev => ({ ...prev, yaw: v }))} />
        </Grid>

        <Grid item xs={6}>
            <NumericInput label="FPS" value={values.fps} onChange={(v) => setValues(prev => ({ ...prev, fps: v }))} />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Name"
            type="string"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
        <Button
            onClick={() => {}}
            variant="contained"
            fullWidth
            sx={{ mb: 1, textAlign: "left" }}
        >
        Save
      </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
