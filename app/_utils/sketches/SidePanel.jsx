import React from "react";
import PaymentStepper from "../stepper/Stepper";
import { InfoPanel } from "./Info";
import { useRecoilValue } from "recoil";
import { paymentStepperToggleState } from "../shared/globalState";

export const RenderSidePanel = () => {
  const display = useRecoilValue(paymentStepperToggleState);

  if (display) {
    return <PaymentStepper />;
  }
  return <InfoPanel />;
};
