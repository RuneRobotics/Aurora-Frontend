import React from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { StoreState } from "../store";
import { UN_DEFINED_IP } from "../types/Constants";
import { Mode } from "../types/state_types";

const CameraList: React.FC = () => {
  const device = useSelector((state: StoreState) => state.device_slice);
  const tab = useSelector((state: StoreState) => state.general_slice.tab);

  const handleCameraClick = async (id: number) => {
    try {
      const response = await fetch("http://localhost:5800/api/mode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: Mode.Detection,
          camera_id: id,
        }),
      });

      if (!response.ok) {
        console.error("Failed to post camera selection:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting camera selection:", error);
    }
  };

  if (device.ip === UN_DEFINED_IP) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary">No data available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", p: 1 }}>
      {device.cameras.map((_camera, index) => (
        <Button
          key={`${device.ip}-camera-${index}`}
          onClick={() => handleCameraClick(index)}
          variant={tab === index ? "contained" : "outlined"}
          fullWidth
          sx={{ mb: 1, textAlign: "left" }}
        >
          Camera {index + 1}
        </Button>
      ))}
    </Box>
  );
};

export default CameraList;
