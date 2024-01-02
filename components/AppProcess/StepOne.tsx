import { FC } from "react";
import { Fieldset } from "../AppUI/Fieldset";
import { LayOutProps } from ".";
import { Button } from "../AppUI/Button";

export interface StepOneProps {
  label?: string;
  type?: "init" | "selection";
  onOptionChange: (e: any) => void;
  onStepReady: () => void;
  LayOutData?: LayOutProps;
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
  onOptionChange,
  onStepReady,
  LayOutData,
}) => {
  const onChecked = (e: any) => {
    if (checkField(e.target.name) && !LayOutData) onStepReady();
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
          {
            value: "a4",
            label: "A4",
            checked: LayOutData?.pageType === "a4" ? true : undefined,
          },
          {
            value: "a3",
            label: "A3",
            checked: LayOutData?.pageType === "a3" ? true : undefined,
          },
        ]}
        onOptionChange={onChecked}
      />
      <Fieldset
        legend="Diseño de página"
        name="pageTheme"
        type="radio"
        options={[
          {
            value: "default",
            label: "Defautl",
            checked: LayOutData?.pageTheme === "default" ? true : undefined,
          },
          {
            value: "summer",
            label: "Summer",
            checked: LayOutData?.pageTheme === "summer" ? true : undefined,
          },
        ]}
        onOptionChange={onChecked}
      />
      {LayOutData && (
              <Button
                type="button"
                value="save"
                label="Save"
                icon="check"
                apparience="iconText"
                className="md:"
                onClick={() => {
                  onStepReady();
                }}
              / >
            )}
    </>
  );
};

StepOne.defaultProps = {
  label: "",
};
