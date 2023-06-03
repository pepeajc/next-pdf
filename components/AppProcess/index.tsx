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

export const createDataPadf = () => {
  localStorage.setItem("pdfContent", JSON.stringify(defaultProps));
  return localStorage.getItem("pdfContent");
};

export const AppProcess: FC<AppProcessProps> = ({ label, type }) => {
  createDataPadf();

  return (
    <div className="bg-sky-700/50 p-8 rounded-xl mb-8">
      <Fieldset
        legend="Tamaño  de página"
        name="page_format"
        type="radio"
        options={[
          { value: "hola", label: "hola" },
          { value: "adios", label: "adios" },
        ]}
      />
      <Fieldset
        legend="Diseño de página"
        name="page_theme"
        type="radio"
        options={[
          { value: "hola", label: "hola" },
          { value: "adios", label: "adios" },
        ]}
      />
    </div>
  );
};

AppProcess.defaultProps = {
  label: "",
};
