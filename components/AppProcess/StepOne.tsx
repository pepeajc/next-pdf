import ReactPDF, { StyleSheet, Text } from "@react-pdf/renderer";
import { FC, useState } from "react";
import { Fieldset } from "../AppUI/Fieldset";

export interface StepOneProps {
  label?: string;
  type?: "init" | "selection";
  onOptionChange: (e: any) => void;
  onStepReady: () => void;
}

const fields: any = [
  {
    pageType: 0,
    pageTheme: 0,
  },
];

const checkField = (field: any) => {
  fields[0][field] = 1;
  let ready = true;
  Object.entries(fields[0]).map((field) => {
    const [key, value] = field;
    if (value !== 1) {
      ready = false;
    }
  });
  return ready;
};

export const StepOne: FC<StepOneProps> = ({
  label,
  type,
  onOptionChange,
  onStepReady,
}) => {
  const onChecked = (e: any) => {
    if (checkField(e.target.name)) onStepReady();
    onOptionChange(e);
  };

  return (
    <>
      {label && <h3>{label}</h3>}
      <Fieldset
        legend="Tamaño  de página"
        name="pageType"
        type="radio"
        options={[
          { value: "a4", label: "A4" },
          { value: "a3", label: "A3" },
        ]}
        onOptionChange={onChecked}
      />
      <Fieldset
        legend="Diseño de página"
        name="pageTheme"
        type="radio"
        options={[
          { value: "default", label: "Defautl" },
          { value: "summer", label: "Summer" },
        ]}
        onOptionChange={onChecked}
      />
    </>
  );
};

StepOne.defaultProps = {
  label: "",
};
