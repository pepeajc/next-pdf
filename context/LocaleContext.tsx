import { createContext, useContext, useEffect } from "react";
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

interface ILocaleContext {
  getCurrentPage: () => TYPE_OF_PAGES | "";
}

export const LocaleContext = createContext<ILocaleContext>({
  getCurrentPage: () => "",
});

type LocaleContextProps = {
  page: TYPE_OF_PAGES;
}

export enum TYPE_OF_PAGES {
  init = "init",
  title = "title",
  operations = "operations",
}

export const LocaleContextProvider = (props: PropsWithChildren<LocaleContextProps>) => {
  const router = useRouter();

  if(Object.values(TYPE_OF_PAGES).includes(props.page as TYPE_OF_PAGES)){
    console.log("Page loaded");
  }else {
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

  return (
    <LocaleContext.Provider
      value={{
        getCurrentPage,
      }}
    >
      {props.children}
    </LocaleContext.Provider>
  );
};

export const useLocaleContext = () => useContext(LocaleContext);
