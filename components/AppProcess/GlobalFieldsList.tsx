import { FC, useState } from "react";
import { CustomFieldSetProps } from "../AppUI/CustomFieldSet";
import React from "react";
import { LayOutProps } from ".";
import { useLocaleContext } from "@/context/LocaleContext";
import { Button } from "../AppUI/Button";

export interface FieldSets {
  type: CustomFieldSetProps["type"];
  value: any;
}
export interface GlobalFieldsListProps {
  onLayOutEdit?: (LayOutData: LayOutProps) => void;
  onOperationEdit?: (index: number) => void;
}

export const GlobalFieldsList: FC<GlobalFieldsListProps> = ({
  onLayOutEdit,
  onOperationEdit,
}) => {
  const { globalData, editAppData } = useLocaleContext();
  const [, updateState] = useState({});
  return (
    <>
      {globalData.globalLayOutProps?.pageTheme !== "" && (
        <>
          <h3 className="mb-6 text-center uppercase tracking-wider font-bold text-xl text-teal-900">
            Layout config
          </h3>
          <div className="flex bg-white/40 p-4 mb-4 border-y-[1px] border-dashed border-stone-400">
            <ul className="flex flex-[1_1_0]">
              <li className="flex-[1_1_0] flex items-center">
                <span className="uppercase mr-4 text-right">Theme:</span>
                <p className="uppercase font-bold">
                  {globalData.globalLayOutProps.pageTheme}
                </p>
              </li>
              <li className="flex flex-[1_1_0] items-center">
                <span className="uppercase mr-4 text-right">Page Size:</span>
                <p className="uppercase font-bold">
                  {globalData.globalLayOutProps.pageType?.toUpperCase()}
                </p>
              </li>
            </ul>
            <Button
              type="button"
              value="edit"
              label="Edit"
              onClick={() => {
                if (onLayOutEdit) onLayOutEdit(globalData.globalLayOutProps);
              }}
            />
          </div>
        </>
      )}
      {globalData.globalFieldSets.length > 0 && (
        <>
          <h3 className="m-6 text-center uppercase tracking-wider font-bold text-xl text-teal-900">
            Campos añadidos
          </h3>
          {globalData.globalFieldSets?.map((fieldSet, index) => {
            return (
              <div
                key={index}
                className="flex p-4 flex-wrap items-center border-y-[1px] border-dashed border-stone-400"
              >
                <div className="flex mb-4 flex-[0_0_100%]">
                  <span className="capitalize mr-4 text-right">
                    Insertion Type:
                  </span>
                  <p className="capitalize font-bold">{fieldSet.type}</p>
                </div>
                <ul className="flex flex-[1_1_0]">
                  {Object.keys(fieldSet.value).map((key, index) => {
                    return (
                      <li key={`${key}-${index}`} className="flex mr-4">
                        <span className="capitalize mr-2 text-right">
                          {key}:
                        </span>
                        <p className="font-bold">{fieldSet.value[key]}</p>
                      </li>
                    );
                  })}
                </ul>
                <Button
                  type="button"
                  value="edit"
                  label="Edit"
                  onClick={() => {
                    if (onOperationEdit) onOperationEdit(index);
                  }}
                />
                <Button
                  icon="delete"
                  type="button"
                  value=""
                  label="delete"
                  apparience="iconText"
                  onClick={() => {
                    editAppData(index, 'delete');                    
                    updateState({});
                  }}
                />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

GlobalFieldsList.defaultProps = {};
