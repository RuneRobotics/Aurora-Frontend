import React from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../store";
import { UN_DEFINED_IP } from "../types/Constants";
import { setTab } from "../store/GeneralSlice";

const CameraList: React.FC = () => {
  const device = useSelector((state: StoreState) => state.device_slice);
  const tab = useSelector((state: StoreState) => state.general_slice.tab);
  const dispatch = useDispatch();

  
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
          onClick={() => {
            dispatch(setTab(`Camera_${index+1}`));;
          }}
          variant={tab === `Camera_${index+1}` ? "contained" : "outlined"}
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
