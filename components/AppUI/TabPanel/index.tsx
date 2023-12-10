import { FC, useState } from "react";
import styles from "./TabPanel.module.css";
import { emitter } from "@/lib/EventBus";

export interface TabPanelProps extends React.PropsWithChildren {
  className?: string;
}

export const TabPanel: FC<TabPanelProps> = ({ className = "", children }) => {
  const [tabData, setTabData] = useState();

  emitter.on("click-tab", (e) => setTabData(e.data));

  return (
    <div className={`${styles.tabs_panel} ${className}`}>
      {children}
      {tabData && tabData.tabName}
    </div>
  );
};
