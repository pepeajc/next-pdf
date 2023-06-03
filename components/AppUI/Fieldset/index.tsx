import ReactPDF, { StyleSheet, Text } from "@react-pdf/renderer";
import { FC } from "react";

export interface FieldsetProps {
  legend?: string;
  name: string;
  type: "radio" | "checkbox";
  options: {
    value: string;
    label: string;
  }[]
}

export const Fieldset: FC<FieldsetProps> = ({ legend, name, type,  options }) => {
  return (
    <fieldset className="bg-sky-100/50 p-8 rounded-xl mb-8 flex">
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        {legend}
      </legend>
      {options.map((option, index) => (
        <div key={`optopn-${index}`} className="flex h-6 items-center">
          <input
            id={option.value}
            value={option.value}
            name={name}
            type={type}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor="comments" className="font-medium text-gray-900">
            {option.label}
          </label>
        </div>
      )
    )}
    </fieldset>
  );
};

Fieldset.defaultProps = {
  legend: "",
};
