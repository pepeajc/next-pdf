import { FC } from "react";
import { CustomFieldSetProps } from "../AppUI/CustomFieldSet";
import React from "react";
import { LayOutProps } from ".";
import { useLocaleContext } from "@/context/LocaleContext";

export interface FieldSets {
  type: CustomFieldSetProps["type"];
  value: any;
}
export interface GlobalFieldsListProps {
  fieldSets?: FieldSets[];
  layOutData?: LayOutProps;
}

export const GlobalFieldsList: FC<GlobalFieldsListProps> = () => {
  const { globalData } = useLocaleContext();
  return (
    <>
      {globalData.globalLayOutProps?.pageTheme !== '' &&
         <>
         <h3 className="m-6 text-center uppercase tracking-wider font-bold text-xl text-sky-700">
           Layout config
         </h3>
         <ul className="bg-sky-200 p-8 rounded-xl mb-12">
           <li className="flex pb-2 mb-2  border-b-[1px] border-dashed border-sky-500">
             <span className="flex-[0_0_100px] uppercase mr-4 text-right">
               Theme:
             </span>
             <p className="uppercase font-bold">{globalData.globalLayOutProps.pageTheme}</p>
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
       </>
      }
      {globalData.globalFieldSets.length > 0 && (
        <>
          <h3 className="m-6 text-center uppercase tracking-wider font-bold text-xl text-sky-700">
            Campos añadidos
          </h3>
          {globalData.globalFieldSets?.map((fieldSet, index) => {
            return (
              <div key={index} className="bg-sky-200 p-8 rounded-xl mb-8">
                <div className="flex mb-4">
                  <span className="flex-[0_0_150px] capitalize mr-4 text-right">
                   Insertion Type:
                  </span>
                  <p className="capitalize font-bold">{fieldSet.type}</p>
                </div>
                <ul>
                  {Object.keys(fieldSet.value).map((key, index) => {
                    return (
                      <li key={`${key}-${index}`} className="flex">
                        <span className="flex-[0_0_150px] capitalize mr-4 text-right">
                          {key}:
                        </span>
                        <p className="font-bold">
                          {fieldSet.value[key]}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

GlobalFieldsList.defaultProps = {
  fieldSets: [
    {
      type: "",
      value: [{}],
    },
  ],
};
