// SelectMode.tsx
import React from "react";
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";

export type Mode = "Detection" | "Calibration" | "Lighting" | "Settings";

interface SelectModeProps {
  value: Mode;
  onChange: (value: Mode) => void;
  label?: string;
}

const modes: Mode[] = ["Detection", "Calibration", "Lighting", "Settings"];

const SelectMode: React.FC<SelectModeProps> = ({ value, onChange, label = "Mode" }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as Mode);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {modes.map((mode) => (
          <MenuItem key={mode} value={mode}>
            {mode}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectMode;
