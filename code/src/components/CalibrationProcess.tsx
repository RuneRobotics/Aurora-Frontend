import React from "react";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, Download, Trash2 } from "lucide-react";

const CalibrationProcess: React.FC = () => {
  const imageCount = 0;

  return (
    <>
      {/* Current Snapshot placeholder */}
      <Box
        sx={{
          width: "100%",
          height: 200,
          overflow: "hidden",
          borderRadius: 1,
          bgcolor: "background.default",
          my: 2,
        }}
      >
        <img
          src=""
          alt="Current Calibration Snapshot"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          mt: "auto",
        }}
      >
        <Button variant="contained" sx={{ flexGrow: 1 }}>
          Take Snapshot
        </Button>

        <Tooltip title="No images to delete">
          <span>
            <IconButton disabled size="small">
              <Trash2 size={20} />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Need more images">
          <span>
            <IconButton disabled size="small" color="primary">
              <Download size={20} />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      {/* Navigation */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <IconButton size="small">
          <ChevronLeft size={20} />
        </IconButton>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ minWidth: 80, textAlign: "center" }}
        >
          {imageCount} / 10
        </Typography>

        <IconButton size="small">
          <ChevronRight size={20} />
        </IconButton>
      </Box>
    </>
  );
};

export default CalibrationProcess;
