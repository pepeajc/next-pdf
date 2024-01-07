import { Button } from "@/components/AppUI/Button";
import { PdfPage, PdfPageProps } from "@/components/PdfPage";
import { Document, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import { useState, useEffect } from "react";

const PDF = ({ pdfData }: { pdfData: PdfPageProps }) => {
  return (
    <Document>
      <PdfPage {...pdfData} />
    </Document>
  );
};
const PDFView = ({
  viewPdf = false,
  pdfData,
}: {
  viewPdf?: boolean;
  pdfData: PdfPageProps;
}) => {
  const [client, setClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setClient(true);
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  if (viewPdf) {
    return (
      <>
        {isMobile ? (
          <PDFDownloadLink
            document={<PDF pdfData={pdfData} />}
            fileName="operations.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading document..."
              ) : (
                <Button type="button" value="Download" label="Download" />
              )
            }
          </PDFDownloadLink>
        ) : (
          <PDFViewer>
            <PDF pdfData={pdfData} />
          </PDFViewer>
        )}
      </>
    );
  }
  return null;
};
export default PDFView;
