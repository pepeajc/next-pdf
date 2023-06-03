import ReactPDF, { Line, Path, StyleSheet, Svg, Text } from "@react-pdf/renderer";
import { FC } from "react";
import { PdfSymbols } from "../PdfSymbols";

interface PdfBoxOperationProps {
  title: string;
  fontSize?: number | string;
  operation?: operationProps;
}

export interface operationProps {
  type?: "addition" | "subtraction" | "multiply";
  rows?:
    {
      digits: number;
    }[];
}

export const PdfBoxOperation: FC<PdfBoxOperationProps> = ({
  title,
  fontSize,
  operation,
}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize,
      textAlign: "right",
      marginBottom: "4px",
      letterSpacing: "3px",
    },
  });

  const getNumber = (digits: number = 0) => {
    let number = "";
    for (let i = 0; i < digits; i++) {
      number += Math.floor(Math.random() * 9);
    }
    return number;
  };

  return (
    <>
      {operation?.rows?.map((item, index) =>
           <Text key={`row-${index}`} style={styles.text}>{getNumber(item.digits)}</Text>
      )};
      <PdfSymbols width="20" variation={operation?.type} color="#CCCCCC"/>
      <Svg height="2" width="100%">
        <Line
          x1="0"
          y1="0"
          x2="300"
          y2="0"
          strokeWidth={2}
          stroke="#CCCCCC"
        />
      </Svg>
    </>
  );
};

PdfBoxOperation.defaultProps = {
  fontSize: "12px",
  operation: {
    type: "addition",
    rows:[
      {
        digits: 5,
      },
      {
        digits: 3,
      }
    ],
  },
};
