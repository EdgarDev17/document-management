import { useState } from "react";

const useSteps = (totalSteps = 0) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  const resetSteps = () => {
    setCurrentStep(1);
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    resetSteps,
  };
};

export default useSteps;
