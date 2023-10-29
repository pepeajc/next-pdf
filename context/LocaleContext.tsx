import { LayOutProps } from "@/components/AppProcess";
import { FieldSets, FieldsListProps } from "@/components/AppProcess/FieldsList";
import { createContext, useContext, useState } from "react";
import { PropsWithChildren } from "react";

export interface ILocaleContext {
  getCurrentPage: () => TYPE_OF_PAGES | "";
  globalData: {
    globalFieldSets: FieldSets[];
    globalLayOutProps?: LayOutProps | any;
  };
  setAppData: any;
}

export const LocaleContext = createContext<ILocaleContext>({
  getCurrentPage: () => "",
  globalData: { globalFieldSets: [], globalLayOutProps: undefined },
  setAppData: () => [],
});

type LocaleContextProps = {
  page: TYPE_OF_PAGES;
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

  function getCurrentPage(): TYPE_OF_PAGES {
    return props.page;
  }
  function setAppData(layOutData: LayOutProps, fieldSettData: FieldSets) {
    if (layOutData) {
      setGlobalData({
        ...globalData,
        globalLayOutProps: layOutData,
      });
    }
    if (fieldSettData) {
      globalData.globalFieldSets.push(fieldSettData);
    }
  }

  return (
    <LocaleContext.Provider
      value={{
        getCurrentPage,
        globalData,
        setAppData,
      }}
    >
      {props.children}
    </LocaleContext.Provider>
  );
};

export const useLocaleContext = () => useContext(LocaleContext);
