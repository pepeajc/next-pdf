import { StyleSheet, View } from "@react-pdf/renderer";
import { FC } from "react";
import { PdfTitle, PdfBoxOperation, operationProps } from "../PdfUI";

export interface PdfViewProps {
  columns?: number;
  variation?: {
    type: "title" | "operation";
    label: string;
    operation?: operationProps;
  };
}

export const PdfView: FC<PdfViewProps> = ({ columns, variation }) => {
  const columnsCSS = columns ? "0 0 " + 100 / columns + "%" : "0 0 100%";

  const styles = StyleSheet.create({
    view: {
      marginBottom: "30px",
      flex: columnsCSS,
      position: "relative",
      padding: 20,
    },
  });

  return (
    <View style={styles.view}>
      {variation &&
        (() => {
          switch (variation.type) {
            case "title":
              return <PdfTitle title={variation.label} fontSize="25px" />;
            case "operation":
              return (
                <PdfBoxOperation
                  title={variation.label}
                  fontSize="23px"
                  operation={variation.operation}
                />
              );
            default:
              return null;
          }
        })()}
    </View>
  );
};

PdfView.defaultProps = {
  columns: 1,
  variation: {
    type: "title",
    label: "addition",
    operation: {
      type: "subtraction",
      rows:[],
    },
  },
};
