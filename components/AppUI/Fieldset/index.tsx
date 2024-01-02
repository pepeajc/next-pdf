import { FC, useRef } from "react";

export interface FieldsetProps {
  legend?: string;
  name: string;
  type: "radio" | "checkbox" | "text" | "select";
  readOnly?: boolean;
  defaultValue?: string | number;
  apparience?: "withLegend" | "onlyText";
  options: {
    value?: string;
    label: string;
    placeholder?: string;
    checked?: boolean | undefined;
  }[];
  onOptionChange: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
}

export const Fieldset: FC<FieldsetProps> = ({
  legend,
  name,
  type,
  options,
  onOptionChange,
  readOnly,
  defaultValue,
  apparience = "withLegend",
}) => {
  const ref = useRef(null);

  const fieldsetCSS: any = {
    withLegend: "bg-white/30 rounded-xl mb-8 flex flex-wrap p-[1.6rem_1rem] md:p-8 self-stretch",
    onlyText: "only-text",
  };

  return (
    <fieldset className={`${fieldsetCSS[apparience]}`}>
      {legend && (
        <legend className="text-sm font-semibold leading-6 text-gray-900">
          {legend}
        </legend>
      )}
      {type !== "select" ? (
        options.map((option, index) => (
          <div
            key={`${option.value}-${index}`}
            className="flex flex-[0_0_100%] md:flex-[1_0_0] items-center mb-8 h-6"
          >
            <input
              id={option.value}
              value={option.value}
              placeholder={option.placeholder}
              name={name}
              type={type}
              defaultChecked={option.checked}
              onClick={type !== "text" ? (e) => onOptionChange(e) : undefined}
              onKeyUp={type === "text" ? (e) => onOptionChange(e) : undefined}
              ref={ref}
              readOnly={readOnly}
              disabled={readOnly}
              defaultValue={defaultValue}
              className={
                apparience === "onlyText"
                  ? "w-10 h-7 p-2"
                  : "focus:ring-indigo-600 mr-2"
              }
            />
            {option.label && (
              <label htmlFor={name} className="font-medium text-gray-900">
                {option.label}
              </label>
            )}
          </div>
        ))
      ) : (
        <select
          name={name}
          id={name}
          ref={ref}
          onClick={(e) => onOptionChange(e)}
          disabled={readOnly}
          defaultValue={defaultValue}
        >
          {options.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      )}
    </fieldset>
  );
};

Fieldset.defaultProps = {
  legend: "",
};
