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
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../store";
import { setTab } from "../store/GeneralSlice";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MyDrawer: React.FC<Props> = ({ open, setOpen }) => {
  const tab = useSelector((state: StoreState) => state.general_slice.tab);
  const dispatch = useDispatch();
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
          onClick={() => dispatch(setTab("Home"))}
        variant={tab==="Home" ? "contained" : "outlined"}
        fullWidth
        sx={{ mb: 1, textAlign: "left" }}
      >
        Home
      </Button>

      <Divider sx={{ my: 1 }} /> 
        <CameraList/>
      </Box>
    </MuiDrawer>
  );
};

export default MyDrawer;
