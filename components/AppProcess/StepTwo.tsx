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

  if (getInitialView() !== "" && nextView === "" && editIndex !== undefined) {
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
      {nextView && (
        <>
          <Button
            type="button"
            value="back"
            label="Volver"
            className="ml-0 mb-8"
            icon="back"
            apparience="iconText"
            onClick={() => {
              setNextView("");
              resetInitialView();
            }}
          />
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
              label={editIndex !== undefined ? "Edit" : "Add"}
              icon="add"
              apparience="iconText"
              className="md:self-end"
              onClick={() => {
                addFieldSet(nextView);
                onStepReady();
                if (editIndex !== undefined) {
                  setNextView("");
                  resetInitialView();
                }
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
