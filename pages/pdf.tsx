import { PdfPage, PdfPageProps } from "@/components/PdfPage";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  PDFViewer,
  StyleSheet,
  Font,
  Svg,
  Line,
} from "@react-pdf/renderer";

const viewPdf = false;

import { useState, useEffect } from "react";

const PDF = ({ pdfData }: { pdfData: PdfPageProps }) => {
  return (
    <Document>
      <PdfPage {...pdfData} />
    </Document>
  );
};
const PDFView = ({
  viewPdf = true,
  pdfData,
}: {
  viewPdf?: boolean;
  pdfData: PdfPageProps;
}) => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      {viewPdf && (
        <PDFViewer>
          <PDF pdfData={pdfData} />
        </PDFViewer>
      )}
    </>
  );
};
export default PDFView;
