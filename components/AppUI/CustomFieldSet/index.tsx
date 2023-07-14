import { FC } from "react";
import { Fieldset } from "../Fieldset";
//import classes from "./CustoFieldSet.module";

interface CustomFieldSetProps {
  type?: "title" | "operation" | "addition" | "";
  readOnly?: boolean;
  placeholder?: string;
  currentRef?: string;
  onFieldReady?: () => void;
  updateValue?: (value: string) => void;
}

export const CustomFieldSet: FC<CustomFieldSetProps> = ({
  type,
  readOnly,
  placeholder,
  currentRef,
  onFieldReady,
  updateValue,
}) => {
  const checkFieldSet = (
    e: any,
    type: "title" | "operation" | "addition" | ""
  ) => {
    // if (type == "title") {
    //   setaddButton(e.target.value !== "");
    // }
    // if (e.target.value === "addition") {
    //   setNextView(e.target.value);
    //   setaddButton(e.target.value);
    // }

    if (updateValue) updateValue(e.target.value);
    if (e.target.value !== "" && type === "title" && onFieldReady)
      onFieldReady();
  };

  switch (type) {
    case "title":
      return (
        <>
          <Fieldset
            legend="Añade el título"
            name="pageTheme"
            type="text"
            options={[
              { value: placeholder ? placeholder : "Add title", label: "" },
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
  return null;
};

CustomFieldSet.defaultProps = {
  type: "title",
  placeholder: "Add title",
  readOnly: false,
  currentRef: "",
};
