import { FC, useState } from "react";
import { Fieldset } from "../AppUI/Fieldset";
import { CustomFieldSet, CustomFieldSetProps } from "../AppUI/CustomFieldSet";
import { FieldsList, OperationTypes } from "./FieldsList";

export interface StepTwoProps {
  label?: string;
}

export const StepTwo: FC<StepTwoProps> = ({ label }) => {
  const [fielfValue, setFielfValue] = useState<any>("");
  const [addButton, setaddButton] = useState<boolean>(false);
  const [nextView, setNextView] = useState<CustomFieldSetProps['type']>("");
  const [fieldSets, setfieldSets] = useState<JSX.Element[]>([]);
  const [fieldSetsData, setfieldSetsData] = useState<Object[]>([]);

  const addFieldSet = (type: OperationTypes) => {
    console.log(fieldSetsData);
    const updatedData = {"type":type, 'value': fielfValue };
    const objectData = fieldSetsData;
    fieldSetsData.push(updatedData);
    setfieldSetsData(objectData);

    // setfieldSets((fieldSets) => [
    //   ...fieldSets,
    //   <CustomFieldSet
    //     type={type}
    //     currentRef={`fieldsList-${fieldSets.length}`}
    //     key={fieldSets.length}
    //     readOnly={true}
    //     placeholder={fielfValue}
    //   />,
    // ]);
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
                if (type) setNextView(type);
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
      <FieldsList fieldSets={fieldSets} />
    </>
  );
};

StepTwo.defaultProps = {
  label: "",
};
