import React from "react";
import { Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";

interface Props {
  setOpenDrawer: (open: boolean) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const Header: React.FC<Props> = ({ setOpenDrawer, isFullscreen, toggleFullscreen }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "10%",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        <Typography variant="h6" component="div" sx={{ color: "common.white" }}>
          Aurora Dashboard
        </Typography>
        <Box>
          <IconButton onClick={toggleFullscreen} sx={{ color: "common.white", mr: 1 }}>
            {isFullscreen ? <FullscreenExitRoundedIcon /> : <FullscreenRoundedIcon />}
          </IconButton>
          <IconButton onClick={() => setOpenDrawer(true)} sx={{ color: "common.white" }}>
            <MenuOpenRoundedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Header;
