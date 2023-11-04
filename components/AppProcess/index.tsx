import ReactPDF, { StyleSheet, Text } from "@react-pdf/renderer";
import { FC, useEffect, useRef, useState } from "react";
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
  const barRef:any = useRef(null);

  useEffect(() => {      
      if (barRef && barRef.current) {
      barRef.current.addEventListener("animationend", (e:AnimationEvent) => {
        e.target?.classList.add("animationend");
      });

      return () => {
        if (barRef && barRef.current) {
          barRef.current.removeEventListener("animationend", null);
        }
      };
    }
  }, [nextStep]);

  return (
    <>
      <div className="app-bar" ref={barRef}>
        {!nextStep && (
          <StepOne
            onOptionChange={onOptionChange}
            onStepReady={() => {
              setNextStep("content");
            }}
          />
        )}
        {nextStep && (
          <StepTwo
            onStepReady={() => {
              updateState({});
            }}
          />
        )}
      </div>
      {globalData.globalLayOutProps.pageType && (
        <div className="preview-bar" ref={barRef}>
          <div className="bg-white/90 aspect-[2/3] max-h-[96%] mx-auto my-6 p-6 shadow-lg">
            <GlobalFieldsList />
            {globalData.globalFieldSets.length > 0 && onLinkClick && (
              <button
                type="button"
                value="preview"
                onClick={() => {
                  onLinkClick();
                }}
                className="bg-stone-700/30 text-white px-5 py-1 mx-auto block rounded hover:bg-white/70 hover:text-stone-600 hover:shadow-md"
              >
                Preview
              </button>
            )}
            </div>
        </div>
      )}
    </>
  );
};

AppProcess.defaultProps = {
  label: "",
};
