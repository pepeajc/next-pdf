import { FC } from "react";
import Icon from "@mdi/react";
import { mdiDrag, mdiDelete, mdiClose } from "@mdi/js";

export interface SiteIconProps {
  iconPath: "close" | "delete" | "";
  size?: number;
}

const iconProps: any = {
  close: mdiClose,
  drag: mdiDrag,
  delete: mdiDelete,
};

export const SiteIcon: FC<SiteIconProps> = ({ iconPath, size }) => {
  return <Icon path={iconProps[iconPath]} size={size} />;
};

SiteIcon.defaultProps = {
  iconPath: "close",
  size: 1,
};
