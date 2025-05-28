// SelectMode.tsx
import React from "react";
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { Mode } from "../types/state_types";
import { useSelector } from "react-redux";
import { StoreState } from "../store";

const modes: Mode[] = Object.values(Mode) as Mode[];

const SelectMode: React.FC = () => {
  const selected = useSelector((state: StoreState) => state.general_slice.mode);
  const tab = useSelector((state: StoreState) => state.general_slice.tab);

  const handleChange = async (event: SelectChangeEvent) => {
    const newMode = event.target.value as Mode;

    try {
      const response = await fetch("http://localhost:5800/api/mode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: newMode,
          camera_id: tab === "Home" ? -1 : tab, // Use -1 for Home tab
        }),
      });

      if (!response.ok) {
        console.error("Failed to post mode:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting mode:", error);
    }
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
