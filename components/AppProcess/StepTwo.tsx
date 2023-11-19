import { FC, SetStateAction, useState } from "react";
import { Fieldset } from "../AppUI/Fieldset";
import { CustomFieldSet, CustomFieldSetProps } from "../AppUI/CustomFieldSet";
import { useLocaleContext } from "@/context/LocaleContext";
import { Button } from "../AppUI/Button";

export interface StepTwoProps {
  label?: string;
  onStepReady: () => void;
  editIndex?: number;
  getInitialView: () => CustomFieldSetProps["type"];
  resetInitialView: () => void;
}

export const StepTwo: FC<StepTwoProps> = ({
  label,
  onStepReady,
  editIndex,
  getInitialView,
  resetInitialView,
}) => {
  const [fielfValue, setFielfValue] = useState<any>("");
  const [addButton, setaddButton] = useState<boolean>(false);
  const [nextView, setNextView] = useState<CustomFieldSetProps["type"]>("");
  const { setAppData, globalData } = useLocaleContext();

  const addFieldSet = (type: CustomFieldSetProps["type"]) => {
    const updatedData = { type: type, value: fielfValue };
    setFielfValue("");
    setNextView("");
    setAppData(null, updatedData, editIndex);
  };

  const onSelectType = (e: any) => {
    setNextView(e.target.value);
    setaddButton(false);
  };

  if(getInitialView() !== '' && nextView === '' && editIndex !== undefined) {
    setNextView(getInitialView());
    setFielfValue(globalData.globalFieldSets[editIndex].value);
  }

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
      {(nextView) && (
        <>
          <button
            type="button"
            value="back"
            onClick={() => {
              setNextView("");
              resetInitialView();
            }}
            className="bg-stone-700/30 text-white px-5 py-1 mb-8 block rounded hover:bg-white/70 hover:text-stone-600 hover:shadow-md"
          >
            Volver
          </button>
          <CustomFieldSet
            type={nextView}
            currentRef={editIndex ? globalData.globalFieldSets.length + 1 : 0}
            onFieldReady={() => {
              setaddButton(true);
            }}
            updateValue={(value, type) => {
              setFielfValue(value);
              if (type !== "title") setNextView(type);
            }}
            editIndex={editIndex}
          />
          {addButton && (
            <Button
              type="button"
              value="add"
              label="Add"
              onClick={() => {
                addFieldSet(nextView);
                onStepReady();
              }}
            />
          )}
        </>
      )}
    </>
  );
};

StepTwo.defaultProps = {
  label: "",
};
