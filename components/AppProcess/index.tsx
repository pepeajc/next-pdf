import ReactPDF, { StyleSheet, Text } from "@react-pdf/renderer";
import { FC } from "react";
import { Fieldset } from "../AppUI/Fieldset";

export interface AppProcessProps {
  label?: string;
  type?: "init" | "selection";
}

const defaultProps = {
  pageType: "default",
  pageTheme: "default",
  views: [
    {
      columns: 1,
      variation: {
        type: "title",
        label: "Página de sumas",
      },
    },
  ],
};

const createDataPadf = () => {
  localStorage.setItem("pdfContent", JSON.stringify(defaultProps));
  return localStorage.getItem("pdfContent");
};

const updateProcessData = (prop:string, value: string) => {
  const storage:string = localStorage.getItem("pdfContent") || '';
  const activeData = JSON.parse(storage);
  activeData[prop] = value;
  localStorage.setItem("pdfContent", JSON.stringify(activeData));
};

const onOptionChange = (e:any) => {
  updateProcessData(e.target.name, e.target.value);
}


export const AppProcess: FC<AppProcessProps> = ({ label, type }) => {
  createDataPadf();

  return (
    <div className="bg-sky-500/70 p-8 rounded-xl mb-8">
      <Fieldset
        legend="Tamaño  de página"
        name="pageType"
        type="radio"
        options={[
          { value: "a4", label: "A4", checked: true },
          { value: "a3", label: "A3" },
        ]}
        onOptionChange={onOptionChange}
      />
      <Fieldset
        legend="Diseño de página"
        name="pageTheme"
        type="radio"
        options={[
          { value: "default", label: "Defautl", checked: true },
          { value: "summer", label: "Summer" },
        ]}
        onOptionChange={onOptionChange}
      />
      <button
        className="rounded-full px-8 py-3 uppercase text-sm text-sky-700 ring-1 ring-sky-700 
      hover:bg-sky-700 hover:text-white hover:transition-all"
        onClick={() => updateProcess('one')}
      >
        Siguiente
      </button>
    </div>
  );
};

AppProcess.defaultProps = {
  label: "",
};
