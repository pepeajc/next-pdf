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
      )}
      {nextView && (
        <>
          <button
            type="button"
            value="back"
            onClick={() => setNextView("")}
            className="bg-stone-700/30 text-white px-5 py-1 mb-8 block rounded hover:bg-white/70 hover:text-stone-600 hover:shadow-md"
          >
            Volver
          </button>
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
              value="add"
              onClick={() => {
                addFieldSet(nextView);
                onStepReady();
              }}
              className="bg-stone-700/30 text-white px-5 py-1 mx-auto block rounded hover:bg-white/70 hover:text-stone-600 hover:shadow-md"
            >
              Añadir
            </button>
          )}
        </>
      )}
    </>
  );
};

StepTwo.defaultProps = {
  label: "",
};
