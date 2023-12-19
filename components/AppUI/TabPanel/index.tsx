import { FC, useState } from "react";
import styles from "./TabPanel.module.css";
import { emitter } from "@/lib/EventBus";

export interface TabPanelProps extends React.PropsWithChildren {
  tabIndex: number;
  className?: string;
}

export const TabPanel: FC<TabPanelProps> = ({
  className = "",
  children,
  tabIndex,
}) => {
  const [tabData, setTabData] = useState<any>();

  emitter.on("click-tab", (e) => setTabData(e.data));

    return (
      <div
        className={`${styles.tabPanel} ${
          tabData && tabIndex === tabData.tabIndex ? styles.tabPanelActive : ""
        } ${className}`}
      >
        {children}
      </div>
    );
  return null;
};
