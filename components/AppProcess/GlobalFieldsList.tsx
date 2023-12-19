import { FC, useState } from "react";
import { CustomFieldSetProps } from "../AppUI/CustomFieldSet";
import React from "react";
import { LayOutProps } from ".";
import { useLocaleContext } from "@/context/LocaleContext";
import { Button } from "../AppUI/Button";
import { Fieldset } from "../AppUI/Fieldset";
import SortableList, { SortableItem } from "react-easy-sort";
//import { arrayMoveImmutable } from 'array-move'

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
  const [orderOperation, setOrderOperation] = useState({});

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    editAppData(oldIndex, "move", newIndex);
    setOrderOperation({});
  };

  return (
    <>
      {globalData.globalLayOutProps?.pageTheme !== "" && (
        <>
          <h3 className="mb-3 text-center uppercase tracking-wider font-bold text-xl text-teal-900">
            Layout config
          </h3>
          <div className="flex flex-col md:flex-row bg-white/40 py-4 mb-4 border-y-[1px] border-dashed border-stone-400">
            <ul className="flex gap-x-2 mb-2">
              <li className="flex">
                <span className="uppercase mr-1 text-right">Theme:</span>
                <p className="uppercase font-bold">
                  {globalData.globalLayOutProps.pageTheme}
                </p>
              </li>
              <li className="flex">
                <span className="uppercase mr-1 text-right">Page Size:</span>
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
              className="self-end"
            />
          </div>
        </>
      )}
      {globalData.globalFieldSets.length > 0 && (
        <>
          <h3 className="m-3 text-center uppercase tracking-wider font-bold text-xl text-teal-900">
            Campos añadidos
          </h3>
          <SortableList
            onSortEnd={onSortEnd}
            className="list"
            draggedItemClassName="dragged"
          >
            {globalData.globalFieldSets?.map((item, index) => (
              <SortableItem key={"sortable-item" + index}>
                <div
                  key={index}
                  className="flex py-2 mb-1 flex-wrap items-center border-y-[1px] border-dashed border-stone-400
                   hover:bg-teal-500/10 hover:cursor-move active:bg-teal-500/20" 
                >
                  <div className="flex mb-4 flex-[0_0_100%]">
                    <p className="capitalize font-bold">{item.type}</p>
                  </div>
                  <ul className="flex flex-[1_1_0] mb-2 flex-wrap">
                    {Object.keys(item.value).map((key, index) => {
                      return (
                        <li key={`${key}-${index}`} className="flex mr-4">
                          <span className="capitalize mr-2 text-right">
                            {key}:
                          </span>
                          <p className="font-bold">{item.value[key]}</p>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex w-full justify-end">
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
                        editAppData(index, "delete");
                        setOrderOperation({});
                      }}
                    />
                  </div>
                </div>
              </SortableItem>
            ))}
          </SortableList>
        </>
      )}
    </>
  );
};

GlobalFieldsList.defaultProps = {};
