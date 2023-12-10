import { FC } from "react";
import { SiteIcon, SiteIconProps } from "../SiteIcon";

export interface ButtonProps extends React.PropsWithChildren {
  label?: string;
  value: string;
  type: "button" | undefined | "submit" | "reset";
  icon?: SiteIconProps["iconPath"];
  className?: string;
  apparience?: "default" | "icon" | "iconText";
  iconSize?: number;
  onClick?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
}

const getButtonApparince = (buttonType: ButtonProps["apparience"] = "default") => {
  const buttonCSS: any = {
    base:
      "bg-teal-700 text-white text-xs tracking-[.1em] hover:bg-teal-600 hover:text-teal-100 hover:shadow-[1px_2px_3px_rgb(2_39_36_/_60%)] cursor-pointer",
    default:
      "px-5 py-1 mx-1 rounded uppercase h-[30px]",
    icon: "flex items-center justify-center px-0 h-[40px] w-[40px] m-0",
    iconText: "flex items-center rounded w-auto h-[30px] mx-1 pl-1 pr-2 uppercase",
  };
  return `${buttonCSS["base"]} ${buttonCSS[buttonType]}`;
};

export const Button: FC<ButtonProps> = ({
  label,
  type,
  value,
  onClick,
  className = "",
  apparience = "default",
  icon,
  iconSize,
  children,
}) => {
  return (
    <button
      type={type}
      value={value}
      onClick={onClick}
      className={`${getButtonApparince(apparience)} ${className}`}
    >
      {icon && <SiteIcon iconPath={icon} size={iconSize} />}
      {apparience !== "icon" && label}
      {children}
    </button>
  );
};
