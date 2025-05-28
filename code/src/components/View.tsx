import React from 'react';
import { Paper, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { StoreState } from '../store';
import { Mode, Tab } from '../types/state_types';

interface ViewProps {
  children: React.ReactNode;
}

const View: React.FC<ViewProps> = () => {
  const mode: Mode = useSelector((state: StoreState) => state.general_slice.mode);
  const tab: Tab = useSelector((state: StoreState) => state.general_slice.tab);

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
      {tab !== 'Home' ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <img
            src={`/api/stream_${tab}`}
            alt="could not fetch"
            style={{ borderRadius: '8px', maxWidth: '100%', maxHeight: '100%' }}
          />
        </Box>
      ) : null}
    </Paper>
  );
};

export default View;
