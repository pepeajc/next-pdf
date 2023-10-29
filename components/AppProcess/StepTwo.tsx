import { FC, useState } from "react";
import { Fieldset } from "../AppUI/Fieldset";
import { CustomFieldSet, CustomFieldSetProps } from "../AppUI/CustomFieldSet";
import { useLocaleContext } from "@/context/LocaleContext";

export interface StepTwoProps {
  label?: string;
  onStepReady: () => void;
}

export const StepTwo: FC<StepTwoProps> = ({ label, onStepReady }) => {
  const [fielfValue, setFielfValue] = useState<any>("");
  const [addButton, setaddButton] = useState<boolean>(false);
  const [nextView, setNextView] = useState<CustomFieldSetProps["type"]>("");
  const { setAppData } = useLocaleContext();

  const addFieldSet = (type: CustomFieldSetProps["type"]) => {
    const updatedData = { type: type, value: fielfValue };
    setFielfValue("");
    setNextView("");
    setAppData(null, updatedData);
  };

  const onSelectType = (e: any) => {
    setNextView(e.target.value);
    setaddButton(false);
  };
  return (
    <>
      {label && <h3>{label}</h3>}
      {nextView === "" && (
        <div className="bg-sky-500/70 p-8 rounded-xl mb-8">
          <Fieldset
            legend="Qué quieres añadir"
            name="viewType"
            type="radio"
            options={[
              { value: "title", label: "Título" },
              { value: "operation", label: "Operaciones" },
            ]}
            onOptionChange={onSelectType}
            key={"fieldset-init"}
          />
        </div>
      )}
      {nextView && (
        <>
          <button
            type="button"
            value="añadir"
            onClick={() => setNextView("")}
            className="bg-sky-100 text-sky-800 px-5 py-1 mb-8 block rounded hover:bg-sky-500"
          >
            Volver
          </button>
          <div className="bg-sky-300 p-8 rounded-xl mb-8">
            <CustomFieldSet
              type={nextView}
              currentRef="0"
              onFieldReady={() => {
                setaddButton(true);
              }}
              updateValue={(value, type) => {
                setFielfValue(value);
                if (type !== "title") setNextView(type);
              }}
            />
            {addButton && (
              <button
                type="button"
                value="añadir"
                onClick={() => {
                  addFieldSet(nextView);
                  onStepReady();
                }}
                className="bg-sky-400 text-sky-800 px-5 py-1 mx-auto block rounded hover:bg-sky-200"
              >
                Añadir
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

StepTwo.defaultProps = {
  label: "",
};
