// SelectMode.tsx
import React from "react";
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { Mode } from "../types/state_types";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../store";
import { setMode } from "../store/GeneralSlice";


// Assuming Mode is an enum or a union of string literals, import or define it accordingly.
// If Mode is an enum, use Object.values(Mode) as Mode[]
const modes: Mode[] = Object.values(Mode) as Mode[];

const SelectMode: React.FC = () => {
  const selected = useSelector((state: StoreState) => state.general_slice.mode);
  const dispatch = useDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setMode(event.target.value as Mode));
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{"Mode"}</InputLabel>
      <Select value={selected} label={"Mode"} onChange={handleChange}>
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
