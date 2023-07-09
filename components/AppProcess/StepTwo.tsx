import { FC, useState } from "react";
import { Fieldset } from "../AppUI/Fieldset";

export interface StepTwoProps {
  label?: string;
  views?: "init" | "selection" | "";
}

export const StepTwo: FC<StepTwoProps> = ({ label, views }) => {
  const [addButton, setaddButton] = useState<string>("");
  const [nextView, setNextView] = useState<"title" | "operation" | "">("");
  const [fieldSets, setfieldSets] = useState<JSX.Element[]>([]);

  const onSelectType = (e: any) => {
    setNextView(e.target.value);
    setaddButton("");
  };

  const checkFieldSet = (e: any, type: "title" | "operation" | "addition") => {
    if (type == "title") {
      setaddButton(e.target.value);
      return;
    }
    if(e.target.value === 'addition'){
      setNextView(e.target.value);
      setaddButton(e.target.value);
    };
    console.log(e.target.value)
  };

  const addFieldSet = (type: "title" | "operation") => {
    setfieldSets((fieldSets) => [...fieldSets, getFieldSet(type, true)]);
  };

  const getFieldSet = (
    type: "title" | "operation" | "addition",
    readOnly?: boolean
  ) => {
    const currentRef = fieldSets.length;
    switch (type) {
      case "title":
        return (
          <>
            <Fieldset
              legend="Añade el título"
              name="pageTheme"
              type="text"
              options={[
                { value: addButton ? addButton : "Add title", label: "" },
              ]}
              onOptionChange={(e) => checkFieldSet(e, type)}
              key={readOnly ? `fieldset-${currentRef}` : `EDITABLE-${currentRef}`}
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
            key={readOnly ? `fieldset-${currentRef}` : type}
            readOnly={readOnly}
          />
        );
      case "addition":
        return (
          <>
            <Fieldset
              legend="Número de Filas"
              name="filas"
              type="select"
              options={[
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
              ]}
              onOptionChange={(e) => checkFieldSet(e, type)}
              key={readOnly ? `fieldset-${currentRef}` : ""}
              readOnly={readOnly}
            />
             <Fieldset
              legend="Dígitos por fila"
              name="filas"
              type="select"
              options={[
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
              ]}
              onOptionChange={(e) => checkFieldSet(e, type)}
              key={readOnly ? `fieldset-${currentRef}` : ""}
              readOnly={readOnly}
            />
          </>
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
            {getFieldSet(nextView, false)}
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
      {fieldSets.length > 0 &&
        fieldSets.map((fieldSet) => (
          <>
            <p className="m-8 text-center uppercase tracking-wider">
              Campos añadidos
            </p>
            {fieldSet}
          </>
        ))}
    </>
  );
};

StepTwo.defaultProps = {
  label: "",
};
