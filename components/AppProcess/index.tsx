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
  const [nextStep, setNextStep] = useState<
    "layout" | "layout-edit" | "content" | "content-edit" | string
  >("layout");
  const { globalData } = useLocaleContext();
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
            LayOutData={
              nextStep === "layout-edit" && globalData.globalLayOutProps
            }
          />
        )}
        {nextStep.includes("content") && (
          <StepTwo
            onStepReady={() => {
              updateState({});
            }}
            editIndex={
              nextStep.includes("content-edit")
                ? +nextStep.substring(nextStep.length - 1)
                : undefined
            }
            getInitialView={() =>
              nextStep.includes("content-edit")
                ? globalData.globalFieldSets[
                    +nextStep.substring(nextStep.length - 1)
                  ].type
                : ""
            }
            resetInitialView={() => setNextStep("content")}
          />
        )}
      </div>
      {globalData.globalLayOutProps.pageType && (
        <div className="preview-bar" ref={barRef}>
          <div className="grid grid-rows-auto content-start bg-white/90 aspect-[2/3] max-h-[96%] mx-auto my-6 p-6 shadow-lg overflow-y-auto">
            <GlobalFieldsList
              onLayOutEdit={() => {
                setNextStep("layout-edit");
              }}
              onOperationEdit={(index) => {
                setNextStep("content-edit-" + index);
              }}
            />
            {globalData.globalFieldSets.length > 0 && onLinkClick && (
              <Button
                type="button"
                value="preview"
                label="Preview"
                className="mt-6 pl-2 pr-2 py-6 justify-self-center"
                icon="pdf"
                iconSize={1.2}
                apparience="iconText"
                onClick={() => {
                  onLinkClick();
                }}
              />
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
