import React from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import NumericInput from './NumericInput';

interface PreCalibrationProps {
  onContinue: () => void;
}

const PreCalibration: React.FC<PreCalibrationProps> = ({ onContinue }) => {
  const [values, setValues] = React.useState<Record<string, number | ''>>({
    rows: '',
    columns: '',
    sideLength: '',
  });

  const [imageSize, setImageSize] = React.useState<string>('640x480');

  const commonSizes = [
    '640x480',
    '800x600',
    '1280x720',
    '1920x1080',
  ];

  return (
    <Box sx={{ p: 1, boxSizing: 'border-box' }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="body2" gutterBottom>
            Select Image Size
          </Typography>
          <Select
            value={imageSize}
            onChange={(e) => setImageSize(e.target.value)}
            fullWidth
            size="small"
          >
            {commonSizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <NumericInput
          label="Rows"
          value={values.rows}
          onChange={(v) => setValues((prev) => ({ ...prev, rows: v }))}
        />

        <NumericInput
          label="Columns"
          value={values.columns}
          onChange={(v) => setValues((prev) => ({ ...prev, columns: v }))}
        />

        <NumericInput
          label="Single Square Length (Meters)"
          value={values.sideLength}
          onChange={(v) => setValues((prev) => ({ ...prev, sideLength: v }))}
        />

        <Button
          onClick={onContinue}
          variant="contained"
          fullWidth
          sx={{ mb: 1, textAlign: 'left' }}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default PreCalibration;
