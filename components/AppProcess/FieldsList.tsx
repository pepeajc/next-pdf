import { FC } from "react";
import { CustomFieldSetProps } from "../AppUI/CustomFieldSet";
import React from "react";
import { LayOutProps } from ".";

export interface FieldSets {
  type: CustomFieldSetProps["type"];
  value: any;
}
export interface FieldsListProps {
  fieldSets: FieldSets[];
  layOutData?: LayOutProps;
}

export const FieldsList: FC<FieldsListProps> = ({ fieldSets, layOutData }) => {
  return (
    <>
      {layOutData && (
        <>
          <p className="m-8 text-center uppercase tracking-wider">
            Layout config
          </p>
          <p>{layOutData.pageTheme}</p>
          <p>{layOutData.pageType}</p>
        </>
      )}
      {fieldSets.length > 0 && (
        <>
          <p className="m-8 text-center uppercase tracking-wider">
            Campos añadidos
          </p>
          {fieldSets?.map((fieldSet, index) => {
            return (
              <div key={index}>
                <strong>{fieldSet.type}:</strong>
                {Object.keys(fieldSet.value).map((key, index) => {
                  const data = `${key} - ${fieldSet.value[key]}`;
                  return <p key={`${key}-${index}`}>{data}</p>;
                })}
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

FieldsList.defaultProps = {
  fieldSets: [
    {
      type: "",
      value: [{}],
    },
  ],
};
