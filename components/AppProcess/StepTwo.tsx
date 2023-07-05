import { FC, useRef, useState } from "react";
import { Fieldset } from "../AppUI/Fieldset";

export interface StepTwoProps {
  label?: string;
  views?: "init" | "selection" | "";
}

export const StepTwo: FC<StepTwoProps> = ({
  label,
  views,
}) => {
  const [nextView, setNextView] = useState<'title' | 'operation' | ''>('');
  const [fieldSets, setfieldSets] = useState<JSX.Element[]>([]);
  const fieldSetsRef = useRef([]);

  const onSelectType = (e: any) => {
    setNextView(e.target.value);
  };

  const checkFieldSet = (e: any, type: "title" | "operation" ) => {
    console.log(e.target.value);
  };

  const addFieldSet = (type: "title" | "operation" ) => {
    setNextView("");
    setfieldSets((fieldSets) => [
      ...fieldSets,
      getFieldSet(type, true),
    ]);
  };

  const getFieldSet = (type: "title" | "operation", readOnly?: boolean) => {
    const currentRef = fieldSets.length+1;
    switch (type) {
      case "title":
        return (
          <>
            <Fieldset
              legend="Añade el título"
              name="pageTheme"
              type="text"
              options={[{ value: "default", label: "" }]}
              onOptionChange={(e) => checkFieldSet(e, type)}
              ref={fieldSetsRef.current[currentRef] }
              key={`fieldset-${currentRef}`}
              readOnly={readOnly}
            />
          </>
        );
      case "operation":
        return (
          <Fieldset
            legend="Selecciona la operión que quires añadir"
            name="operaions"
            type="radio"
            options={[
              { value: "addition", label: "Sumas" },
              { value: "subtraction", label: "Restas" },
              { value: "multiply", label: "Multipicaciones" },
            ]}
            onOptionChange={(e) => checkFieldSet(e, type)}
            ref={fieldSetsRef.current[currentRef] }
            key={`fieldset-${currentRef}`}
            readOnly={readOnly}
          />
        );
    }
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
          ref={fieldSetsRef.current[0] }
          key={'fieldset-0'}
        />
      )}
      {nextView && (
        <div className="bg-sky-300 p-8 rounded-xl mb-8">
        {getFieldSet(nextView, false)}
        <button
              type="button"
              value="añadir"
              onClick={() => addFieldSet(nextView)}
              className="bg-sky-400 text-sky-800 px-5 py-1 mx-auto block rounded hover:bg-sky-200"
            >
              Añadir
            </button>
        </div>
      )}
      {fieldSets.length > 0 && fieldSets.map((fieldSet) => <>{fieldSet}</>)}
    </>
  );
};

StepTwo.defaultProps = {
  label: "",
};
