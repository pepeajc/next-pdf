// const createDataPadf = () => {
//   localStorage.setItem("pdfContent", JSON.stringify(defaultProps));
//   return localStorage.getItem("pdfContent");
// };

//if(!localStorage.getItem("pdfContent"))createDataPadf();

// const transformStylesToAmp = (styles: any) => {
// 	for (const [key] of Object.entries(styles)) {
// 		styles[key] = key;
// 	}
// 	return styles;
// };

const useLocalStorage = (styles: any) => {
	return styles;
}

export default useLocalStorage;