import { FC, useState } from "react";
import Header from "../AppUI/Header";
import { AppProcess, AppProcessProps } from "../AppProcess";
import { SectionHeader } from "../AppUI/SectionHeader";
import Link from "next/link";
import { AppBackGround } from "../AppBackGround";
import { Tabs } from "../AppUI/Tabs";
import { TabPanel } from "../AppUI/TabPanel";
import { useLocaleContext } from "@/context/LocaleContext";
import styles from "./AppPage.module.css";

interface AppPageProps extends AppProcessProps {
  onShowPdf?: () => void;
  process: "init" | "selection";
}

export const AppPage: FC<AppPageProps> = ({ onShowPdf, process = "init" }) => {
  const { globalData } = useLocaleContext();
  return (
    <>
      <Header />
      <AppBackGround />
      <div className="app-container h-[100vh]">
        {process === "init" && onShowPdf && (
          <>
            <Tabs
              tabList={[
                {
                  value: "layout",
                  type: "button",
                  label: "Edit Layout",
                  active: true,
                },
                
                {
                  value: "pdf",
                  type: "button",
                  label: "PDF",
                  onTabActive: () => onShowPdf(),
                  disabled: globalData.globalFieldSets.length > 0,
                },
              ]}
            />
            <TabPanel tabIndex={0} className={styles.TabPanelFlex}>
              <AppProcess type={process} onLinkClick={() => onShowPdf()} />
            </TabPanel>
          </>
        )}
        {process === "selection" && (
          <div className="flex flex-col justify-center h-full max-w-[800px] mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-8 py-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/30">
                <Link
                  href="/operations/init"
                  className="font-semibold text-blue-600"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  Adelante <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <SectionHeader
              title="Crea tu plantila de operaciones"
              description="Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua."
            />
          </div>
        )}
      </div>
    </>
  );
};

AppPage.defaultProps = {
  label: "Iniciar proceso",
};
