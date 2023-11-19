import { FC, useState } from "react";
import { Fieldset } from "../Fieldset";
import { useLocaleContext } from "@/context/LocaleContext";

export interface CustomFieldSetProps {
  type: "title" | "operation" | "addition" | "subtraction" | "multiply" | "";
  readOnly?: boolean;
  placeholder?: string;
  currentRef?: number;
  onFieldReady?: () => void;
  updateValue?: (value: string, type: CustomFieldSetProps["type"]) => void;
  editIndex?: number;
}

export const CustomFieldSet: FC<CustomFieldSetProps> = ({
  type,
  readOnly,
  placeholder,
  currentRef,
  onFieldReady,
  updateValue,
  editIndex,
}) => {
  const [fielfValue, setFielfValue] = useState<any>({});
  const { globalData } = useLocaleContext();

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

  const isEditable = (type: CustomFieldSetProps["type"], field?: string) => {
    if (type === "title") {
      return (
        editIndex !== undefined &&
        globalData.globalFieldSets[editIndex].value.text
      );
    }
    if (type === "addition" || "subtraction" || "multiply") {
      return (
        editIndex !== undefined && field && globalData.globalFieldSets[editIndex].value[field]
      );
    }
  };

  console.log(isEditable("addition", "totalOperaciones"), "isEditable");

  // al editar actualizamos fielfValue y los datos del parent con updateValue()
  if (
    editIndex !== undefined &&
    Object.entries(fielfValue).length === 0 &&
    updateValue
  ) {
    const { value } = globalData.globalFieldSets[editIndex];
    setFielfValue(value);
    editIndex = undefined;
  }

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
      // si tenemos almacenados valores en  fielfValue sino valores por defecto
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
              {
                placeholder: isEditable(type)
                  ? isEditable(type)
                  : placeholder || "Add title",
                label: "",
              },
            ]}
            onOptionChange={(e) => checkFieldSet(e, type)}
            key={`fieldset-${type}-${currentRef}`}
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
          key={`fieldset-${type}-${currentRef}`}
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
            defaultValue={isEditable(type, "totalOperaciones")}
            options={[
              { value: "3", label: "3" },
              { value: "6", label: "6" },
              { value: "9", label: "9" },
              { value: "12", label: "12" },
              { value: "15", label: "15" },
            ]}
            onOptionChange={(e) => checkFieldSet(e, type)}
            key={`fieldset-${type}-0-${currentRef}`}
            readOnly={readOnly}
          />
          <Fieldset
            legend="Número de Filas"
            name="filas"
            type="select"
            defaultValue={isEditable(type, "filas")}
            options={[
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
            ]}
            onOptionChange={(e) => checkFieldSet(e, type)}
            key={`fieldset-${type}-1-${currentRef}`}
            readOnly={type === "subtraction" ? true : readOnly}
          />
          <Fieldset
            legend="Dígitos por fila"
            name="digitos"
            type="select"
            defaultValue={isEditable(type, "digitos")}
            options={[
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
            ]}
            onOptionChange={(e) => checkFieldSet(e, type)}
            key={`fieldset-${type}-2-${currentRef}`}
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
            defaultValue={isEditable(type, "totalOperaciones")}
            options={[
              { value: "3", label: "3" },
              { value: "6", label: "6" },
              { value: "9", label: "9" },
              { value: "12", label: "12" },
              { value: "15", label: "15" },
            ]}
            onOptionChange={(e) => checkFieldSet(e, type)}
            key={`fieldset-${type}-0-${currentRef}`}
            readOnly={readOnly}
          />
          <Fieldset
            legend="Números del Multiplicando (Línea superior)"
            name="multiplicando"
            type="select"
            defaultValue={isEditable(type, "multiplicando")}
            options={[
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
            ]}
            onOptionChange={(e) => checkFieldSet(e, type)}
            key={`fieldset-${type}-1-${currentRef}`}
            readOnly={readOnly}
          />
          <Fieldset
            legend="Números del Multiplicandor (Línea Inferior)"
            name="multiplicador"
            type="select"
            defaultValue={isEditable(type, "multiplicador")}
            options={[
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
            ]}
            onOptionChange={(e) => checkFieldSet(e, type)}
            key={`fieldset-${type}-2-${currentRef}`}
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
  currentRef: 0,
};
