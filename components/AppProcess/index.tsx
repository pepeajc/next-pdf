import { FC, useEffect, useRef, useState } from "react";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { useLocaleContext } from "@/context/LocaleContext";
import { GlobalFieldsList } from "./GlobalFieldsList";
import { Button } from "../AppUI/Button";

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
  const [nextStep, setNextStep] = useState<"layout" | "layout-edit" | "content" | undefined>(
    "layout"
  );
  const { globalData, getCurrentPage } = useLocaleContext();
  const [, updateState] = useState({});
  const updateProcessData = (prop: string, value: string) => {
    globalData.globalLayOutProps[prop] = value;
  };

  const onOptionChange = (e: any) => {
    updateProcessData(e.target.name, e.target.value);
  };
  const barRef: any = useRef(null);

  useEffect(() => {
    if (barRef && barRef.current) {
      barRef.current.addEventListener("animationend", (e: any) => {
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
        {nextStep?.includes("layout") && (
          <StepOne
            onOptionChange={onOptionChange}
            onStepReady={() => {
              setNextStep("content");
            }}
            LayOutData={nextStep === 'layout-edit' && globalData.globalLayOutProps}
          />
        )}
        {nextStep === "content" && (
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
            <GlobalFieldsList
              onLayOutEdit={() => {
                setNextStep("layout-edit");
              }}
            />
            {globalData.globalFieldSets.length > 0 && onLinkClick && (
              <Button
                type="button"
                value="preview"
                label="Preview"
                onClick={() => {
                  onLinkClick();
                }}
              / >
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
