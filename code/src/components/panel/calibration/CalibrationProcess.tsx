import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, Download, Trash2 } from "lucide-react";

const CalibrationProcess: React.FC = () => {
  const [imageCount, setImageCount] = useState(0);
  const [imagePointer, setImagePointer] = useState(-1); // -1 = no image

  // Sync imagePointer if imageCount changes
  useEffect(() => {
    if (imageCount === 0) {
      setImagePointer(-1);
    } else if (imagePointer >= imageCount) {
      setImagePointer(imageCount - 1);
    }
  }, [imageCount]);

  const decrementImagePointer = () => {
    setImagePointer((prev) =>
      imageCount === 0 ? -1 : (prev - 1 + imageCount) % imageCount
    );
  };

  const incrementImagePointer = () => {
    setImagePointer((prev) =>
      imageCount === 0 ? -1 : (prev + 1) % imageCount
    );
  };

  const handleDelete = async () => {
    if (imageCount === 0 || imagePointer === -1) return;

    const response = await fetch("http://localhost:5800/api/calibration/operation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        operation: "Delete",
        index: imagePointer,
      }),
    });

    if (response.ok) {
      const newCount = imageCount - 1;
      setImageCount(newCount);
      if (newCount === 0) {
        setImagePointer(-1);
      } else if (imagePointer >= newCount) {
        setImagePointer(newCount - 1);
      }
    }
  };

  const handleSnapshot = async () => {
    const response = await fetch("http://localhost:5800/api/calibration/operation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operation: "Snapshot" }),
    });

    if (response.ok) {
      const { index } = await response.json();
      setImageCount((prev) => prev + 1);
      setImagePointer(index);
    }
  };

  const handleCalibate = async () => {
    const response = await fetch("http://localhost:5800/api/calibration/operation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operation: "Calibration" }),
    });

    if (response.ok) {
      setImageCount(0);
      setImagePointer(-1);
    }
  };

  return (
    <>
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
        {imagePointer !== -1 ? (
          <img
            src={`http://localhost:5800/api/calibration/snapshot_${imagePointer}`}
            alt="Current Calibration Snapshot"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
              fontStyle: "italic",
            }}
          >
            No snapshot available
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Button variant="contained" sx={{ flexGrow: 1 }} onClick={handleSnapshot}>
          Take Snapshot
        </Button>

        <Tooltip title={imageCount === 0 ? "No images to delete" : "Delete current snapshot"}>
          <span>
            <IconButton
              disabled={imageCount === 0}
              size="small"
              onClick={handleDelete}
            >
              <Trash2 size={20} />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title={imageCount < 3 ? "Need more images" : "Run calibration"}>
          <span>
            <IconButton
              disabled={imageCount < 3}
              size="small"
              color="primary"
              onClick={handleCalibate}
            >
              <Download size={20} />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <IconButton size="small" disabled={imageCount <= 1} onClick={decrementImagePointer}>
          <ChevronLeft size={20} />
        </IconButton>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ minWidth: 80, textAlign: "center" }}
        >
          {imageCount === 0 ? "0 / 10" : `${imagePointer + 1} / 10`}
        </Typography>

        <IconButton size="small" disabled={imageCount <= 1} onClick={incrementImagePointer}>
          <ChevronRight size={20} />
        </IconButton>
      </Box>
    </>
  );
};

export default CalibrationProcess;
