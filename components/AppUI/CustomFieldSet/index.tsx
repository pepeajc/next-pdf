import { FC, useState } from "react";
import { Fieldset } from "../Fieldset";
//import classes from "./CustoFieldSet.module";

export interface CustomFieldSetProps {
  type: "title" | "operation" | "addition" | "subtraction" | "multiply" | "";
  readOnly?: boolean;
  placeholder?: string;
  currentRef?: string;
  onFieldReady?: () => void;
  updateValue?: (value: string, type: CustomFieldSetProps["type"]) => void;
}

export const CustomFieldSet: FC<CustomFieldSetProps> = ({
  type,
  readOnly,
  placeholder,
  currentRef,
  onFieldReady,
  updateValue,
}) => {
  const [fielfValue, setFielfValue] = useState<any>({});

  const defaultValues: any = {
    addition: {
      totalOperaciones: "3",
      filas: "2",
      digitos: "3",
    },
    subtraction: {
      totalOperaciones: "3",
      filas: "2",
      digitos: "3",
    },
    multiply: {
      totalOperaciones: "3",
      multiplicando: "2",
      multiplicador: "3",
    },
  };

  const checkFieldSet = (e: any, type: CustomFieldSetProps["type"]) => {
    switch (type) {
      case "title":
        if (e.target.value !== "" && onFieldReady) {
          fielfValue[e.target.name] = e.target.value;
          onFieldReady();
        }
        break;
      case "operation":
        if (onFieldReady && type) {
          type = e.target.value;
          setFielfValue(defaultValues[type]);
          onFieldReady();
        }
        break;
      case "addition":
      case "subtraction":
      case "multiply":
        fielfValue[e.target.name] = e.target.value;
        break;
    }

    if (updateValue) {
      if (Object.entries(fielfValue).length > 0) {
        updateValue(fielfValue, type);
      } else {
        updateValue(defaultValues[type], type);
      }
    }
  };
  switch (type) {
    case "title":
      return (
        <>
          <Fieldset
            legend="Añade el título"
            name="text"
            type="text"
            options={[
              { value: placeholder ? placeholder : "Add title", label: "" },
            ]}
            onOptionChange={(e) => checkFieldSet(e, type)}
            key={readOnly ? `fieldset-${currentRef}` : null}
            readOnly={readOnly}
          />
        </>
      );
    case "operation":
      return (
        <Fieldset
          legend="Selecciona la operación que quires añadir"
          name="operaions"
          type="radio"
          options={[
            { value: "addition", label: "Sumas" },
            { value: "subtraction", label: "Restas" },
            { value: "multiply", label: "Multipicaciones" },
          ]}
          onOptionChange={(e) => checkFieldSet(e, type)}
          key={readOnly ? `fieldset-${currentRef}` : null}
          readOnly={readOnly}
        />
      );
    case "addition":
    case "subtraction":
      return (
        <>
          <Fieldset
            legend="¿Cuantas operaciones quieres?"
            name="totalOperaciones"
            type="select"
            options={[
              { value: "3", label: "3" },
              { value: "6", label: "6" },
              { value: "9", label: "9" },
              { value: "12", label: "12" },
              { value: "15", label: "15" },
            ]}
            onOptionChange={(e) => checkFieldSet(e, type)}
            key={readOnly ? `fieldset-${currentRef}` : null}
            readOnly={readOnly}
          />
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
            key={readOnly ? `fieldset-${currentRef}` : null}
            readOnly={type=== 'subtraction' ? true : readOnly}
          />
          <Fieldset
            legend="Dígitos por fila"
            name="digitos"
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
    case "multiply":
      return (
        <>
          <Fieldset
            legend="¿Cuantas operaciones quieres?"
            name="totalOperaciones"
            type="select"
            options={[
              { value: "3", label: "3" },
              { value: "6", label: "6" },
              { value: "9", label: "9" },
              { value: "12", label: "12" },
              { value: "15", label: "15" },
            ]}
            onOptionChange={(e) => checkFieldSet(e, type)}
            key={readOnly ? `fieldset-${currentRef}` : null}
            readOnly={readOnly}
          />
          <Fieldset
            legend="Números del Multiplicando (Línea superior)"
            name="multiplicando"
            type="select"
            options={[
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
            ]}
            onOptionChange={(e) => checkFieldSet(e, type)}
            key={readOnly ? `fieldset-${currentRef}` : null}
            readOnly={readOnly}
          />
          <Fieldset
            legend="Números del Multiplicandor (Línea Inferior)"
            name="multiplicador"
            type="select"
            options={[
              { value: "2", label: "2" },
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
