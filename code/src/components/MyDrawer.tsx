import React from "react";
import {
  Drawer as MuiDrawer,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MyDrawer: React.FC<Props> = ({ open, setOpen }) => {
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
        {/* Add drawer content here */}
      </Box>
    </MuiDrawer>
  );
};

export default MyDrawer;
