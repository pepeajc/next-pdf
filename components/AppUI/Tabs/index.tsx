import { FC, useState } from "react";
import { Button, ButtonProps } from "../Button";
import styles from "./Tabs.module.css";
import { emitter } from "@/lib/EventBus";

interface TabsListProps extends ButtonProps {
  active?: boolean;
  onTabActive: () => void;
  disabled?: boolean;
}

export interface TabsProps {
  tabList: TabsListProps[];
  className?: string;
}

export const Tabs: FC<TabsProps> = ({
  tabList,
  className = "",
}) => {
  const [tabListData, setTabListData] = useState<TabsListProps[]>(tabList);
  const [clicked, setclicked] = useState<boolean>(false);

  const tabClick = (tabIndex: number, tabInfo: TabsListProps) => {
    tabListData.forEach((tab) => (tab.active = false));
    const newTabListData = tabListData.map((tabListItem) => {
      if (tabListItem.value === tabInfo.value) {
        return { ...tabListItem, active: true };
      }
      return tabListItem;
    });
    setclicked(true);
    setTabListData(newTabListData);
    emitEvent(tabIndex, tabInfo.value);
  };

  const emitEvent = (tabIndex: number, tabName?: string) => {
    emitter.emit("click-tab", {
      eventCategory: "affiliate-link",
      eventCode: "affiliate-link.impression",
      eventName: "click-tab",
      data: {
        tabIndex,
        tabName,
      },
    });
    tabListData[tabIndex]?.onTabActive();
  };

  if (!clicked)
    emitEvent(
      tabList.findIndex((tab) => tab.active),
      "tab"
    );

  return (
    <ul className={`${styles.tabs_list} ${className}`}>
      {tabListData.map((tab, index) => (
        <li
          key={`${tab.label}-${index}`}
          className={tab.active ? styles.tabItem_active : styles.tabItem}
        >
          <Button
            type={tab.type}
            value={tab.value}
            label={tab.label}
            onClick={() => tabClick(index, tab)}
            className={styles.tabButton}
          />
        </li>
      ))}
    </ul>
  );
};
