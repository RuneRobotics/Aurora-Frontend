// Panel.tsx
import React from 'react';
import {Paper } from '@mui/material';

interface PanelProps {
  children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ children }) => {
  return (
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: '100%',
          p: 2,
          boxSizing: 'border-box',
        }}
      >
        {children}
      </Paper>);
};

export default Panel;
