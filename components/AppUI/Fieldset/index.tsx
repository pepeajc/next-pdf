import { FC, LegacyRef, useState } from "react";
//import classes from "./Fieldset.module";

export interface FieldsetProps {
  legend?: string;
  name: string;
  type: "radio" | "checkbox" | "text";
  ref: LegacyRef<HTMLInputElement> | undefined;
  readOnly?: boolean;
  options: {
    value: string;
    label: string;
    checked?: boolean | undefined;
  }[];
  onOptionChange: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Fieldset: FC<FieldsetProps> = ({
  legend,
  name,
  type,
  options,
  onOptionChange,
  ref,
  readOnly,
}) => {
  return (
    <fieldset className="bg-sky-100/50 p-8 rounded-xl mb-8 flex">
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        {legend}
      </legend>
      {options.map((option, index) => (
        <div key={`optopn-${index}`} className="flex h-6 items-center mx-4">
          <input
            id={option.value}
            value={type !== "text" ? option.value : undefined}
            placeholder={type === "text" ? option.value : undefined}
            name={name}
            type={type}
            checked={option.checked}
            className="focus:ring-indigo-600 mr-2"
            onClick={type !== "text" ? (e) => onOptionChange(e) : undefined}
            onKeyUp={type === "text" ? (e) => onOptionChange(e) : undefined}
            ref={ref}
            readOnly={readOnly}
            disabled={readOnly}
          />
          <label htmlFor="comments" className="font-medium text-gray-900">
            {option.label}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

Fieldset.defaultProps = {
  legend: "",
};
