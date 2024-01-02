import { CustomFieldSetProps } from "@/components/AppUI/CustomFieldSet";
import { StyleSheet, Path, Svg } from "@react-pdf/renderer";
import { FC } from "react";

interface PdfSymbolsProps {
  variation?: CustomFieldSetProps["type"];
  width?: string;
  height?: string;
  color?: string;
}

export const PdfSymbols: FC<PdfSymbolsProps> = ({
  width,
  height,
  color,
  variation,
}) => {

  const styles = StyleSheet.create({
    sign: {
      bottom: "12mm",
      position: "absolute",
      left: "10mm",
    },
  });

  switch (variation) {
    case "addition":
      return (
        <Svg
          style={styles.sign}
          width={width}
          height={height}
          viewBox="0 0 1995 1995"
        >
          <Path
            d="M748.08 0V748.08H0V1246.8H748.08V1994.88H1246.8V1246.8H1994.88V748.08H1246.8V0H748.08Z"
            fill={color}
          />
        </Svg>
      );
    case "subtraction":
      return (
        <Svg
          style={styles.sign}
          width={width}
          height={height}
          viewBox="0 0 1995 499"
        >
          <Path d="M0 0V498.72H1994.88V0H0Z" fill={color} />
        </Svg>
      );
    case "multiply":
      return (
        <Svg width={width} height={height} style={styles.sign} viewBox="0 0 18 16">
          <Path
            d="M17.676 1.737A1 1 0 0 0 16.324.263L9 6.977 1.676.263A1 1 0 1 0 .324 1.737L7.52 8.333.324 14.93a1 1 0 0 0 1.352 1.474L9 9.69l7.324 6.714a1 1 0 1 0 1.352-1.474L10.48 8.332l7.196-6.596Z"
            fill={color}
          />
        </Svg>
      );
    default:
      return null;
  }
};

PdfSymbols.defaultProps = {
  width: "16",
  height: "16",
  color: "currentColor",
  variation: "addition",
};
