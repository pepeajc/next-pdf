import { LayOutProps } from "@/components/AppProcess";
import { FieldSets, FieldsListProps } from "@/components/AppProcess/FieldsList";
import { createContext, useContext, useState } from "react";
import { PropsWithChildren } from "react";

export interface ILocaleContext {
  getCurrentPage: () => LocaleContextProps['page'] ;
  globalData: {
    globalFieldSets: FieldSets[];
    globalLayOutProps?: LayOutProps | any;
  };
  setAppData: any;
  editAppData: any;
}

export const LocaleContext = createContext<ILocaleContext>({
  getCurrentPage: () => "",
  globalData: { globalFieldSets: [], globalLayOutProps: undefined },
  setAppData: () => [],
  editAppData: () => [],
});

type LocaleContextProps = {
  page: string | string[] | undefined;
};

export enum TYPE_OF_PAGES {
  init = "init",
  title = "title",
  operations = "operations",
}

export const LocaleContextProvider = (
  props: PropsWithChildren<LocaleContextProps>
) => {
  const [globalData, setGlobalData] = useState<ILocaleContext["globalData"]>({
    globalFieldSets: [],
    globalLayOutProps: { pageType: "", pageTheme: "" },
  });

  if (Object.values(TYPE_OF_PAGES).includes(props.page as TYPE_OF_PAGES)) {
    console.log("Page loaded");
  } else {
    console.log("Page not allowed");
  }

  // useEffect(() => {
  //     if(!Object.values(TYPE_OF_PAGES).includes(props.page as TYPE_OF_PAGES) && props.page){
  //         router.push('/operations/init');
  //     }
  // }, [props.page, router]);

  function getCurrentPage(): LocaleContextProps['page'] {
    return props.page;
  }
  function setAppData(layOutData: LayOutProps, fieldSettData: FieldSets, editIndex:number) {
    if (layOutData) {
      setGlobalData({
        ...globalData,
        globalLayOutProps: layOutData,
      });
    }
    if (editIndex > -1 && fieldSettData) {
      globalData.globalFieldSets[editIndex] = fieldSettData;
      return null;
    }
    if (fieldSettData) {
      globalData.globalFieldSets.push(fieldSettData);
    }
  }
  function editAppData(index: number, type: 'move' | 'delete') {
    if (type === 'move') {
      
    }
    if (type === 'delete') {
      globalData.globalFieldSets.splice(index, 1);
    }
  }

  return (
    <LocaleContext.Provider
      value={{
        getCurrentPage,
        globalData,
        setAppData,
        editAppData,
      }}
    >
      {props.children}
    </LocaleContext.Provider>
  );
};

export const useLocaleContext = () => useContext(LocaleContext);
