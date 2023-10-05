import { Page, Rect, StyleSheet, Svg } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { FC } from "react";
import { PdfView, PdfViewProps } from "../PdfView";

export interface PdfPageProps {
  views?: PdfViewProps[];
  pageType?: string;
  pageTheme?: string;
}

export const PdfPage: FC<PdfPageProps> = ({ views, pageType, pageTheme }) => {

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      flexWrap: "wrap",
      padding: '5mm',
      alignItems: 'flex-end',
    },
    pageSquare: {
      position: 'absolute',
      zIndex: -1,
      top: '5mm',
      left: '5mm',
      width: "200mm",
      height: "287mm",
    }
  });

  const pageConfig = pageType === "default" ? styles.page : styles.page;

  return (
    <Page size="A4" style={pageConfig}>
      {views?.map((item, index) => (
        <PdfView
          key={"PdfView" + index}
          columns={item.columns}
          variation={item.variation}
        />
      ))}
      <Svg style={styles.pageSquare} height="287" width="200" viewBox="0 0 200 287">
        <Rect
            x="0"
            y="0"
            width="200mm"
            height="287mm"
            strokeWidth={0.8}
            stroke="rgb(79, 194, 79)"
          />
      </Svg>
    </Page>
  );
};

PdfPage.defaultProps = {
  pageType: 'default',
  pageTheme: 'default',
  views: [],
};
