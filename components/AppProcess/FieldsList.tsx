import { FC, useState } from "react";
import { CustomFieldSet } from "../AppUI/CustomFieldSet";
import React from "react";
//import classes from "./CustoFieldSet.module";

export type OperationTypes = "title" | "operation" | "addition" | "";

interface FieldsListProps {
  fieldSets: JSX.Element[];
}

export const FieldsList: FC<FieldsListProps> = ({ fieldSets }) => {
  if (fieldSets.length > 0) {
    return (
      <>
        <p className="m-8 text-center uppercase tracking-wider">
          Campos añadidos
        </p>
        {fieldSets.map((fieldSet, index) => (<React.Fragment key={`fieldSet${index}`}>{ fieldSet }</React.Fragment>))}
      </>
    );
  }
  return null;
};

FieldsList.defaultProps = {
  fieldSets: [],
};
