// Panel.tsx
import React from 'react';
import {Paper } from '@mui/material';
import SelectMode from './ModeSelector';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store';
import Settings from './settings/Settings';
import { Mode } from '../../types/state_types';
import Lighting from './lighting/Lighting';
import Calibration from './calibration/Calibration';



const Panel: React.FC = () => {
    const tab = useSelector((state: StoreState) => state.general_slice.tab);
    const mode = useSelector((state: StoreState) => state.general_slice.mode);

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
        {tab === "Home"? null : <SelectMode />}
        {mode === Mode.Settings ? <Settings/> : null}
        {mode === Mode.Lighting ? <Lighting/> : null}
        {mode === Mode.Calibration ? <Calibration/> : null}
      </Paper>);
};

export default Panel;
