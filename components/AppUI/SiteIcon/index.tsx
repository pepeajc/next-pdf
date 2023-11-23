import { FC } from "react";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

export interface SiteIconProps {
  iconPath: "close" | "";
  size?: number;
}

const iconProps:any = {
  close: mdiClose,
};

export const SiteIcon: FC<SiteIconProps> = ({ iconPath, size }) => {
  return <Icon path={iconProps[iconPath]} size={3} />;
};

SiteIcon.defaultProps = {
  iconPath: "close",
  size: 1,
};
