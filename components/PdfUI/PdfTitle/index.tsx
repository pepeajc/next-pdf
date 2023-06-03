import ReactPDF, {
  StyleSheet,
  Text,
} from "@react-pdf/renderer";
import { FC } from "react";

interface PdfTitleProps {
  title: string;
  fontSize?: number | string;
}

export const PdfTitle: FC<PdfTitleProps> = ({ title, fontSize }) => {

  const styles = StyleSheet.create({
    text: {
      fontSize,
    },
  });

  return (
    <Text style={styles.text}>{title}</Text>
  );
};

PdfTitle.defaultProps = {
  fontSize: '10px',
};
