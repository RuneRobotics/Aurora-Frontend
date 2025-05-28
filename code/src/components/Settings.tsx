import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import NumericInput from './NumericInput';
import { useSelector } from 'react-redux';
import { StoreState } from '../store';

const Settings: React.FC = () => {
  const tab = useSelector((state: StoreState) => state.general_slice.tab);
  const [values, setValues] = useState<Record<string, number | string>>({
    x: '',
    y: '',
    z: '',
    roll: '',
    pitch: '',
    yaw: '',
    fps: '',
    name: '',
  });

  useEffect(() => {
    const fetchDefaults = async () => {
      try {
        const res = await fetch(`http://localhost:5800/api/settings_${tab}`);
        if (!res.ok) throw new Error('Failed to fetch settings');
        const data = await res.json();
        setValues(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDefaults();
  }, [tab]);

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5800/api/settings_${tab}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      console.log('Settings saved');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 1, boxSizing: 'border-box' }}>
      <Grid container spacing={2}>
        {['x', 'y', 'z', 'roll', 'pitch', 'yaw', 'fps'].map((field) => (
          <Grid item xs={field === 'fps' ? 6 : 4} key={field}>
            <NumericInput
              label={field.toUpperCase()}
              value={values[field] as number | ""}
              onChange={(v) => setValues((prev) => ({ ...prev, [field]: v }))}
            />
          </Grid>
        ))}
        <Grid item xs={6}>
          <TextField
            label="Name"
            type="text"
            fullWidth
            value={values.name}
            onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleSave}
            variant="contained"
            fullWidth
            sx={{ mb: 1, textAlign: 'left' }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
