import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface NumericInputProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  label: string;
  value: number | '';
  onChange: (value: number | '') => void;
}

const NumericInput: React.FC<NumericInputProps> = ({ label, value, onChange, ...rest }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val === '' || !isNaN(Number(val))) {
      onChange(val === '' ? '' : Number(val));
    }
  };

  return (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={handleChange}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      fullWidth
      sx={{
        '& input[type=number]': {
          MozAppearance: 'textfield',
        },
        '& input[type=number]::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        '& input[type=number]::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
      }}
      {...rest}
    />
  );
};

export default NumericInput;
