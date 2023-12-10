import { FC } from "react";
import { Button, ButtonProps } from "../Button";
import styles from "./Tabs.module.css";
import { emitter } from "@/lib/EventBus";

export interface TabsProps {
  tabList: ButtonProps[];
  className?: string;
}

export const Tabs: FC<TabsProps> = ({ tabList, className = "" }) => {

  const emitEvent = (tabName: string, tabUrl?: string) => {
    emitter.emit('click-tab', {
      eventCategory: 'affiliate-link',
      eventCode: 'affiliate-link.impression',
      eventName: 'click-tab',
      data: {
        tabName,
        tabUrl,
      },
    });
  };
 
  return (
    <ul className={`${styles.tabs_list} ${className}`}>
      {tabList.map((tab, index) => (
        <li key={`${tab.label}-${index}`}>
          <Button
            type={tab.type}
            value={tab.value}
            label={tab.label}
            onClick={!tab.onClick ? () => emitEvent(tab.value) : tab.onClick}
          />
        </li>
      ))}
    </ul>
  );
};
