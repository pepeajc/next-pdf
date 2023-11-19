import { FC } from "react";
import { CustomFieldSetProps } from "../AppUI/CustomFieldSet";
import React from "react";
import { LayOutProps } from ".";
import { useLocaleContext } from "@/context/LocaleContext";
import Icon from "@mdi/react";
import { mdiDrag } from "@mdi/js";
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
  const { globalData } = useLocaleContext();
  return (
    <>
      {globalData.globalLayOutProps?.pageTheme !== "" && (
        <>
          <h3 className="mb-6 text-center uppercase tracking-wider font-bold text-xl text-teal-900">
            Layout config
          </h3>
          <ul className="bg-white/40 p-8 mb-4">
            <li className="flex pb-2 mb-2  border-b-[1px] border-dashed border-stone-400">
              <span className="flex-[0_0_100px] uppercase mr-4 text-right">
                Theme:
              </span>
              <p className="uppercase font-bold">
                {globalData.globalLayOutProps.pageTheme}
              </p>
            </li>
            <li className="flex">
              <span className="flex-[0_0_100px] uppercase mr-4 text-right">
                Page Size:
              </span>
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
        </>
      )}
      {globalData.globalFieldSets.length > 0 && (
        <>
          <h3 className="m-6 text-center uppercase tracking-wider font-bold text-xl text-teal-900">
            Campos añadidos
          </h3>
          {globalData.globalFieldSets?.map((fieldSet, index) => {
            return (
              <div key={index} className="px-8 mb-8">
                <div className="flex mb-4">
                  <span className="flex-[0_0_150px] capitalize mr-4 text-right">
                    Insertion Type:
                  </span>
                  <p className="capitalize font-bold">{fieldSet.type}</p>
                </div>
                <ul className="pb-8 mb-8 border-b-[1px] border-dashed border-stone-400">
                  {Object.keys(fieldSet.value).map((key, index) => {
                    return (
                      <li key={`${key}-${index}`} className="flex">
                        <span className="flex-[0_0_150px] capitalize mr-4 text-right">
                          {key}:
                        </span>
                        <p className="font-bold">{fieldSet.value[key]}</p>
                        <Icon path={mdiDrag} size={1} />
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
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

GlobalFieldsList.defaultProps = {};
