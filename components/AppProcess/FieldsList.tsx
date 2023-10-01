import { FC } from "react";
import { CustomFieldSetProps } from "../AppUI/CustomFieldSet";
import React from "react";

export interface FieldSets {
    type: CustomFieldSetProps["type"];
    value: any;
}
export interface FieldsListProps {
  fieldSets: FieldSets[];
}

export const FieldsList: FC<FieldsListProps> = ({ fieldSets }) => {

  if (fieldSets.length > 0) {
    return (
      <>
        <p className="m-8 text-center uppercase tracking-wider">
          Campos añadidos
        </p>
        {fieldSets?.map((fieldSet, index) => {
          return (
            <li key={index}>
              <strong>{fieldSet.type}:</strong>
              {Object.keys(fieldSet.value).map((key, index) => {
                const data = `${key} - ${fieldSet.value[key]}`;
                return <p key={`${key}-${index}`}>{data}</p>;
              })}
            </li>
          );
        })}        
      </>
    );
  }
  return null;
};

FieldsList.defaultProps = {
  fieldSets: [
    {
      type: "",
      value: [{}],
    },
  ],
};
