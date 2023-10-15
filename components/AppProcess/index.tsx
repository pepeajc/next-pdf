import ReactPDF, { StyleSheet, Text } from "@react-pdf/renderer";
import { FC, useState } from "react";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { FieldsListProps } from "./FieldsList";

export interface AppProcessProps {
  label?: string;
  type?: "init" | "selection";
  onLinkClick: (data: FieldsListProps["fieldSets"]) => void;
}

export interface LayOutProps {
  pageType?: string;
  pageTheme?: string;
}

export const AppProcess: FC<AppProcessProps> = ({
  label,
  type,
  onLinkClick,
}) => {
  const [nextStep, setNextStep] = useState<"layout" | "content" | undefined>();
  const [layOutData, setlayOutData] = useState<LayOutProps | any>({
    pageType: "a3",
    pageTheme: "default",
  });

  const updateProcessData = (prop: string, value: string) => {
    layOutData[prop] = value;
  };

  const onOptionChange = (e: any) => {
    updateProcessData(e.target.name, e.target.value);
  };

  return (
    <div className="bg-sky-500/70 p-8 rounded-xl mb-8">
      {!nextStep && (
        <StepOne
          onOptionChange={onOptionChange}
          onStepReady={() => {
            setNextStep("content");
          }}
        />
      )}
      {nextStep === "content" && (
        <StepTwo
          previewPdf={(data) => onLinkClick(data)}
          layOutData={layOutData}
        />
      )}
    </div>
  );
};

AppProcess.defaultProps = {
  label: "",
};
