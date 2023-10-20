import { FC, useState } from "react";
import { Fieldset } from "../AppUI/Fieldset";
import { CustomFieldSet, CustomFieldSetProps } from "../AppUI/CustomFieldSet";
import { FieldsList, FieldsListProps } from "./FieldsList";
import { pdfDataService } from "@/services/pdfDataService";
import { LayOutProps } from ".";

export interface StepTwoProps {
  label?: string;
  previewPdf: (data: FieldsListProps["fieldSets"]) => void;
  layOutData?: LayOutProps;
}

export const StepTwo: FC<StepTwoProps> = ({
  label,
  previewPdf,
  layOutData,
}) => {
  const [fielfValue, setFielfValue] = useState<any>("");
  const [addButton, setaddButton] = useState<boolean>(false);
  const [nextView, setNextView] = useState<CustomFieldSetProps["type"]>("");
  const [fieldSetsData, setfieldSetsData] = useState<
    FieldsListProps["fieldSets"]
  >([]);

  const addFieldSet = (type: CustomFieldSetProps["type"]) => {
    const updatedData = { type: type, value: fielfValue };
    const objectData = fieldSetsData;
    fieldSetsData.push(updatedData);
    setfieldSetsData(objectData);
    setFielfValue("");
    setNextView("");
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
                onClick={() => addFieldSet(nextView)}
                className="bg-sky-400 text-sky-800 px-5 py-1 mx-auto block rounded hover:bg-sky-200"
              >
                Añadir
              </button>
            )}
          </div>
        </>
      )}
      <FieldsList fieldSets={fieldSetsData} layOutData={layOutData} />
      {fieldSetsData.length > 0 && (
        <button
          type="button"
          value="añadir"
          onClick={() =>
            previewPdf(pdfDataService.getpdfData(fieldSetsData, layOutData))
          }
          className="bg-sky-300 text-sky-800 px-5 py-1 mx-auto block rounded hover:bg-sky-200"
        >
          Preview
        </button>
      )}
    </>
  );
};

StepTwo.defaultProps = {
  label: "",
};
