import { FieldSets, FieldsListProps } from "@/components/AppProcess/FieldsList";
import { PdfPageProps } from "@/components/PdfPage";
import { operationProps } from "@/components/PdfUI";

// const defaultData: PdfPageProps = {
// 	views: [
// 	  {
// 		columns: 1,
// 		variation: {
// 		  type: "title",
// 		  label: "Página de sumas",
// 		},
// 	  },
// 	  {
// 		columns: 3,
// 		variation: {
// 		  type: "operation",
// 		  label: "My title",
// 		  operation: {
// 			type: "addition",
// 			rows: [
// 			  {
// 				digits: 5,
// 			  },
// 			  {
// 				digits: 5,
// 			  },
// 			  {
// 				digits: 5,
// 			  },
// 			],
// 		  },
// 		},
// 	  },
// 	],
//   };

const getOperationRows = (viewData: FieldSets) => {
  //console.log(viewData);
  let operationRows: operationProps["rows"] = [];
  if (viewData.type === "multiply") {
    operationRows = [
      {
        digits: +viewData.value.multiplicando,
      },
      {
        digits: +viewData.value.multiplicador,
      },
    ];
    return operationRows;
  }

  for (let i = 0; i < viewData.value.filas; i++) {
    operationRows.push({
      digits: +viewData.value.digitos,
    });
  }

  return operationRows;
};

const getPdfViewData = (viewData: FieldSets) => {
  let viewDataFiltered: PdfPageProps["views"] = [];
  const viewType = viewData.type;
  if (viewData.value.totalOperaciones) {
    for (let i = 0; i < viewData.value.totalOperaciones; i++) {
      viewDataFiltered.push({
        columns: 3,
        variation: {
          type: "operation",
          label: "My title",
          operation: {
            type: viewData.type,
            rows: getOperationRows(viewData),
          },
        },
      });
    }
    return viewDataFiltered;
  }

  viewDataFiltered.push({
    columns: 1,
    variation: {
      type: "title",
      label: viewData.value.text,
    },
  });

  return viewDataFiltered;
};

const getpdfData = (pageData: FieldsListProps["fieldSets"]) => {
  let pageDataFiltered: PdfPageProps | any = { views: [] };
  pageData.map((field) => {
    pageDataFiltered.views.push(...getPdfViewData(field));
  });
  return pageDataFiltered;
};

export const pdfDataService = {
  getpdfData,
};
