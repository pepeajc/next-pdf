import ReactPDF, { StyleSheet, Text } from "@react-pdf/renderer";
import { FC } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  onLinkClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  onLinkClick,
  description,
}) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
      )}
      {onLinkClick && (
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="transition duration-500 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-xl 
              hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onLinkClick}
          >
            View PDF
          </a>
        </div>
      )}
    </div>
  );
};

SectionHeader.defaultProps = {
  description: "",
};
