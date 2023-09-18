import { FC, useState } from "react";
import { CustomFieldSet, CustomFieldSetProps } from "../AppUI/CustomFieldSet";
import React from "react";
export interface FieldsListProps {
  fieldSets: {
    type: CustomFieldSetProps["type"];
    value: any;
  }[];
}

export const FieldsList: FC<FieldsListProps> = ({ fieldSets }) => {
  if (fieldSets.length > 0) {
    return (
      <>
        <p className="m-8 text-center uppercase tracking-wider">
          Campos añadidos
        </p>
        {fieldSets?.map((fieldSet, index) => {
          console.log(index + " - " + fieldSet);
          return <p key={index}>{fieldSet.type}</p>;
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
