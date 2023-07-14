import { Fieldset } from "@/components/AppUI/Fieldset";

const getFieldSet = (
    type: "title" | "operation" | "addition",
    readOnly?: boolean,
    ref?: string,
  ) => {
    const currentRef = ref;
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