import { AppPage } from "@/components/AppPage";
import { PdfPageProps } from "@/components/PdfPage";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const InvoicePDF = dynamic(() => import("./pdf"), {
  ssr: false,
});

const defaultData: PdfPageProps = {
  views: [
    {
      columns: 1,
      variation: {
        type: "title",
        label: "Página de sumas",
      },
    },
    {
      columns: 3,
      variation: {
        type: "operation",
        label: "My title",
        operation: {
          type: "addition",
          rows: [
            {
              digits: 5,
            },
            {
              digits: 5,
            },
            {
              digits: 5,
            },
          ],
        },
      },
    },
    {
      columns: 3,
      variation: {
        type: "operation",
        label: "My title",
        operation: {
          type: "multiply",
          rows: [
            {
              digits: 5,
            },
            {
              digits: 3,
            },
          ],
        },
      },
    },
    {
      columns: 3,
      variation: {
        type: "operation",
        label: "My title",
        operation: {
          type: "subtraction",
          rows: [
            {
              digits: 7,
            },
            {
              digits: 7,
            },
            {
              digits: 7,
            },
          ],
        },
      },
    },
    {
      columns: 3,
      variation: {
        type: "operation",
        label: "My title",
        operation: {
          type: "addition",
          rows: [
            {
              digits: 5,
            },
            {
              digits: 5,
            },
            {
              digits: 5,
            },
          ],
        },
      },
    },
    {
      columns: 3,
      variation: {
        type: "operation",
        label: "My title",
        operation: {
          type: "multiply",
          rows: [
            {
              digits: 5,
            },
            {
              digits: 3,
            },
          ],
        },
      },
    },
    {
      columns: 3,
      variation: {
        type: "operation",
        label: "My title",
        operation: {
          type: "subtraction",
          rows: [
            {
              digits: 7,
            },
            {
              digits: 6,
            },
            {
              digits: 5,
            },
          ],
        },
      },
    },
  ],
};

const View = () => {
  const [client, setClient] = useState(false);
  const [viewPdf, setViewPdf] = useState(false);
  const [pdfData, setpdfData] =  useState<PdfPageProps>(defaultData);

  const showPdfHandler = (data: PdfPageProps) => {
    setpdfData(data);
    setViewPdf(true);
  };

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div className="flex fixed w-full h-full">
      <div className={'w-full'}>
        <AppPage process='selection' />
      </div>
    </div>
  );
};

export default View;
