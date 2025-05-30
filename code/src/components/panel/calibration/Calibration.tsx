import React from 'react';
import PreCalibration from './PreCalibration';
import CalibrationProcess from './CalibrationProcess';

const Calibration: React.FC = () => {
  const [step, setStep] = React.useState<'pre' | 'process'>('pre');

  return (
    <>
      {step === 'pre' ? (
        <PreCalibration onContinue={() => setStep('process')} />
      ) : (
        <CalibrationProcess />
      )}
    </>
  );
};

export default Calibration;
