import { FC } from "react";

export interface ButtonProps {
  label?: string;
  value: string;
  type: "button" | undefined | "submit" | "reset";
  onClick?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
}

export const Button: FC<ButtonProps> = ({
  label,
  type,
  value,
  onClick,
}) => {
  return (
    <button
      type={type}
      value={value}
      onClick={onClick}
      className="bg-stone-700/30 text-white px-5 py-1 mx-auto block rounded hover:bg-white/70 hover:text-stone-600 hover:shadow-md"
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
};
