import ReactPDF, { StyleSheet, Text } from "@react-pdf/renderer";
import { FC, useState } from "react";
import { Fieldset } from "../AppUI/Fieldset";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";

export interface AppProcessProps {
  label?: string;
  type?: "init" | "selection";
  onLinkClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const defaultProps = {
  pageType: "default",
  pageTheme: "default",
  views: [
    {
      columns: 1,
      variation: {
        type: "title",
        label: "Página de restas",
      },
    },
  ],
};

const createDataPadf = () => {
  localStorage.setItem("pdfContent", JSON.stringify(defaultProps));
  return localStorage.getItem("pdfContent");
};

const updateProcessData = (prop: string, value: string) => {
  const storage: string = localStorage.getItem("pdfContent") || "";
  const activeData = JSON.parse(storage);
  activeData[prop] = value;
  localStorage.setItem("pdfContent", JSON.stringify(activeData));
};

let checks = 0;

export const AppProcess: FC<AppProcessProps> = ({
  label,
  type,
  onLinkClick,
}) => {
  const [nextStep, setNextStep] = useState(false);
  const [viewPdf, setViewPdf] = useState(false);
  
  if(!localStorage.getItem("pdfContent"))createDataPadf();

  const onOptionChange = (e: any) => {
    updateProcessData(e.target.name, e.target.value);
  };

  const activeNextStep = () => {
    setNextStep(true);
  };


  return (
    <div className="bg-sky-500/70 p-8 rounded-xl mb-8">
      {/* <StepOne onOptionChange={onOptionChange} onStepReady={activeNextStep} /> */}
      <StepTwo onOptionChange={onOptionChange} onStepReady={activeNextStep} />
      {nextStep && (
        <button
          className="rounded-full px-8 py-3 uppercase text-sm text-sky-700 ring-1 ring-sky-700 
      hover:bg-sky-700 hover:text-white hover:transition-all"
          onClick={() => updateProcess("one")}
        >
          Siguiente
        </button>
      )}
      {viewPdf && (
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="#"
          className="transition duration-500 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-xl 
              hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={onLinkClick}
        >
          View PDF
        </a>
      </div>
      )}
    </div>
  );
};

AppProcess.defaultProps = {
  label: "",
};
