import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Header from "./Header";
import MyDrawer from "./MyDrawer";
import { useDataFetching } from "../hooks/useDataFetching";
import Panel from "./Panel";
import View from "./View";

const Dashboard: React.FC = () => {
  useDataFetching();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Drawer (outside the layout so it overlays properly) */}
      <MyDrawer open={openDrawer} setOpen={setOpenDrawer} />

      {/* Header - 10% of the screen */}
      <Box sx={{ flex: "0 0 10%", mb: 2 }}>
        <Header setOpenDrawer={setOpenDrawer} />
      </Box>

      {/* Main Content - 90% of the screen */}
      <Box sx={{ flex: "1 1 90%", overflow: "hidden" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          {/* Panel - 25% width */}
          <Grid item xs={3} sx={{ height: "100%" }}>
            <Panel>
              <Typography variant="h6">Panel 1</Typography>
            </Panel>
          </Grid>

          {/* View - 75% width */}
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
