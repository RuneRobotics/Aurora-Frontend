import React from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import NumericInput from '../../NumericInput';

interface PreCalibrationProps {
  onContinue: () => void;
}

interface CalibrationValues {
  rows: number | '';
  columns: number | '';
  sideLength: number | '';
}

const PreCalibration: React.FC<PreCalibrationProps> = ({ onContinue }) => {
  const [values, setValues] = React.useState<CalibrationValues>({
    rows: '',
    columns: '',
    sideLength: '',
  });

  const [imageSize, setImageSize] = React.useState<{ width: number; height: number }>({
    width: 640,
    height: 480,
  });

  const [loading, setLoading] = React.useState(false);

  const commonSizes = ['640x480', '800x600', '1280x720', '1920x1080'];

  const handleSizeChange = (value: string) => {
    const [width, height] = value.split('x').map(Number);
    setImageSize({ width, height });
  };

  const isValidInteger = (val: number | '') =>
    typeof val === 'number' && Number.isInteger(val) && val > 4;

  const isPositiveNumber = (val: number | '') =>
    typeof val === 'number' && val > 0;

  const isFormValid =
    isValidInteger(values.rows) &&
    isValidInteger(values.columns) &&
    isPositiveNumber(values.sideLength);

  const handleContinue = async () => {
    if (!isFormValid) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5800/api/calibration_settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rows: values.rows,
          columns: values.columns,
          sideLength: values.sideLength,
          imageSize: imageSize,
        }),
      });

      if (res.ok) {
        onContinue();
      } else {
        console.error('Failed to submit calibration settings');
      }
    } catch (err) {
      console.error('Error submitting calibration settings:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 1, boxSizing: 'border-box' }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="body2" gutterBottom>
            Select Image Size
          </Typography>
          <Select
            value={`${imageSize.width}x${imageSize.height}`}
            onChange={(e) => handleSizeChange(e.target.value)}
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

        <Tooltip
          title={
            isFormValid
              ? 'Continue to the next calibration step'
              : "Can't continue, values aren't valid"
          }
        >
          <span>
            <Button
              onClick={handleContinue}
              variant="contained"
              fullWidth
              sx={{ mb: 1, textAlign: 'left' }}
              disabled={!isFormValid || loading}
            >
              Continue
            </Button>
          </span>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default PreCalibration;
