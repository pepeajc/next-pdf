import { FC } from "react";
import { SiteIcon, SiteIconProps } from "../SiteIcon";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

export interface ButtonProps {
  label?: string;
  value: string;
  type: "button" | undefined | "submit" | "reset";
  icon?: SiteIconProps['iconPath'];
  className?: string;
  onClick?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
}

export const Button: FC<ButtonProps> = ({
  label,
  type,
  value,
  onClick,
  className,
  icon,
}) => {
  return (
    <button
      type={type}
      value={value}
      onClick={onClick}
      className={`bg-stone-700/30 text-white px-5 py-1 mx-auto block rounded hover:bg-white/70 hover:text-stone-600 hover:shadow-md cursor-pointer ${className}`}
    >
      {icon && <SiteIcon iconPath={icon} size={1} />} 
      {label}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
};
