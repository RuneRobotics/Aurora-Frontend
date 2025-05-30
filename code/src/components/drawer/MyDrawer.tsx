import React from "react";
import {
  Drawer as MuiDrawer,
  Box,
  IconButton,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CameraList from "./CameraList";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { Mode } from "../../types/state_types";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MyDrawer: React.FC<Props> = ({ open, setOpen }) => {
  const tab = useSelector((state: StoreState) => state.general_slice.tab);

const handleHomeClick = async () => {
  try {
    const response = await fetch("http://localhost:5800/api/mode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: Mode.Detection,
        camera_id: -1,
      }),
    });

    if (!response.ok) {
      console.error("Failed to post home click:", response.statusText);
    }
  } catch (error) {
    console.error("Error posting home click:", error);
  } finally {
    setOpen(false); // Close the drawer regardless of request success/failure
  }
};


  return (
    <MuiDrawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      variant="temporary"
    >
      <Box
        sx={{
          width: "25vw",
          height: "100%",
          bgcolor: "background.paper",
          p: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Sidebar</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Button
          onClick={handleHomeClick}
          variant={tab === "Home" ? "contained" : "outlined"}
          fullWidth
          sx={{ mb: 1, textAlign: "left" }}
        >
          Home
        </Button>

        <Divider sx={{ my: 1 }} />
        <CameraList setOpen={setOpen}/>
      </Box>
    </MuiDrawer>
  );
};

export default MyDrawer;
