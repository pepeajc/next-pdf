import ReactPDF, { StyleSheet, Text } from "@react-pdf/renderer";
import { FC, useState } from "react";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { useLocaleContext } from "@/context/LocaleContext";
import { GlobalFieldsList } from "./GlobalFieldsList";

export interface AppProcessProps {
  label?: string;
  type?: "init" | "selection";
  onLinkClick?: () => void;
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
  const { globalData } = useLocaleContext();
  const [, updateState] = useState({});
  const updateProcessData = (prop: string, value: string) => {
    globalData.globalLayOutProps[prop] = value;
  };

  const onOptionChange = (e: any) => {
    updateProcessData(e.target.name, e.target.value);
  };
  return (
    <>
      {!nextStep && (
        <StepOne
          onOptionChange={onOptionChange}
          onStepReady={() => {
            setNextStep("content");
          }}
        />
      )}
      {nextStep && (
        <StepTwo onStepReady={() => {
          updateState({});
        }}/>
      )}
      <GlobalFieldsList />
      {globalData.globalFieldSets.length > 0 && onLinkClick && (
        <button
          type="button"
          value="añadir"
          onClick={() => {
            onLinkClick();
          }}
          className="bg-sky-300 text-sky-800 px-5 py-1 mx-auto block rounded hover:bg-sky-200"
        >
          Preview
        </button>
      )}
    </>
  );
};

AppProcess.defaultProps = {
  label: "",
};
