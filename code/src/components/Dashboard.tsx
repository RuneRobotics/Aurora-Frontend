import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Header from "./Header";
import MyDrawer from "./drawer/MyDrawer";
import { useDeviceFetching } from "../hooks/useDeviceFetching";
import Panel from "./panel/Panel";
import View from "./View";
import { useModeFetching } from "../hooks/useModeFetching";

const Dashboard: React.FC = () => {
  useDeviceFetching();
  useModeFetching();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const docElm = document.documentElement;
    if (!document.fullscreenElement) {
      docElm.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <MyDrawer open={openDrawer} setOpen={setOpenDrawer} />

      <Box sx={{ flex: "0 0 10%", mb: 2 }}>
        <Header
          setOpenDrawer={setOpenDrawer}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
        />
      </Box>

      <Box sx={{ flex: "1 1 90%", overflow: "hidden" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item xs={3} sx={{ height: "100%" }}>
            <Panel />
          </Grid>
          <Grid item xs={9} sx={{ height: "100%" }}>
            <View>
              <Typography variant="h4">View Area</Typography>
            </View>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
