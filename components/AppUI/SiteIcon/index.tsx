import { FC } from "react";
import Icon from "@mdi/react";
import {
  mdiDrag,
  mdiDelete,
  mdiClose,
  mdiArrowAll,
  mdiReorderHorizontal,
  mdiFilePdfBox,
  mdiPlaylistEdit,
  mdiBackupRestore,
  mdiArrowLeft,
  mdiPlus,
  mdiCheck,
} from "@mdi/js";

export interface SiteIconProps {
  iconPath: "close" | "delete" | "move" | "drag" | "reorder" | "pdf" | "edit" | "back" | "restore" | "add" | "check";
  size?: number;
}

const iconProps: any = {
  close: mdiClose,
  drag: mdiDrag,
  delete: mdiDelete,
  move: mdiArrowAll,
  reorder: mdiReorderHorizontal,
  pdf: mdiFilePdfBox,
  edit: mdiPlaylistEdit,
  back: mdiArrowLeft,
  restore: mdiBackupRestore,
  add: mdiPlus,
  check: mdiCheck,
};

export const SiteIcon: FC<SiteIconProps> = ({ iconPath, size }) => {
  return <Icon path={iconProps[iconPath]} size={size} />;
};

SiteIcon.defaultProps = {
  iconPath: "close",
  size: 0.8,
};
