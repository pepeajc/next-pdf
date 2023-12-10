import { FC, useState } from "react";
import Header from "../AppUI/Header";
import { AppProcess, AppProcessProps } from "../AppProcess";
import { SectionHeader } from "../AppUI/SectionHeader";
import Link from "next/link";
import { AppBackGround } from "../AppBackGround";
import { Tabs } from "../AppUI/Tabs";
import { TabPanel } from "../AppUI/TabPanel";

interface AppPageProps extends AppProcessProps {
  onShowPdf?: () => void;
  process: "init" | "selection";
}

export const AppPage: FC<AppPageProps> = ({ onShowPdf, process = "init" }) => {
  return (
    <>
      <Header />
      <AppBackGround />
      <div className="app-container h-[100vh]">
        <Tabs
          tabList={[
            {
              value: "Ops panel",
              type: "button",
              label: "Edition",
            },
            {
              value: "title",
              type: "button",
              label: "LayOut",
            },
            {
              value: "title",
              type: "button",
              label: "PDF",
              onClick: () => console.log("test"),
            },
          ]}
        />
        <TabPanel>TabPanel</TabPanel>
        {process === "init" && onShowPdf && (
          <AppProcess type={process} onLinkClick={() => onShowPdf()} />
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
