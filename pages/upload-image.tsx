export const ExcelViewer = ({ excelUrl }: { excelUrl: string }) => {
  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(excelUrl)}&embedded=true`;

  return (
    <iframe
      src={googleViewerUrl}
      style={{ width: '100%', height: '500px' }}
      title="Excel File Viewer"
    />
  );
};

export const DocxViewer = ({ docxUrl }: { docxUrl: string }) => {
  const oneDriveViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(docxUrl)}`;

  return (
    <iframe
      src={oneDriveViewerUrl}
      style={{ width: '100%', height: '500px' }}
      title="DOCX File Viewer"
    />
  );
};

export const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  return (
    <iframe
      src={pdfUrl}
      style={{ width: '100%', height: '500px' }}
      title="PDF File Viewer"
    />
  );
};

export const ImageViewer = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={imageUrl}
        alt="Archivo de imagen"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default function ShowDownload() {
  const TypeDocuments = (url: string) => {
    if (url) {
      const extensionMatch = url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
      const extension = extensionMatch ? extensionMatch[1].toLowerCase() : '';

      let showRead;
      switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
          showRead = <ImageViewer imageUrl={url} />;
          break;
        case 'pdf':
          showRead = <PDFViewer pdfUrl={url} />;
          break;
        case 'doc':
        case 'docx':
          showRead = <DocxViewer docxUrl={url} />;
          break;
        case 'xls':
        case 'xlsx':
          showRead = <ExcelViewer excelUrl={url} />;
          break;
        default:
          showRead = <div>Tipo de archivo no soportado</div>;
      }
      return showRead;
    }
    return null;
  };

  const excelUrl =
    'https://intranet00.blob.core.windows.net/intranet/SistemaDeArchivos/8/Primer Tramo/otra_prueba_de_documentos1727776254606.xlsx?sp=racwdli&st=2024-01-09T14:50:56Z&se=2030-01-01T22:50:56Z&spr=https&sv=2022-11-02&sr=c&sig=qJ4b8SBK2tbrYs%2FqiredY7upvK1lWVLF3nN0VdGaEfE%3D';

  return <>{TypeDocuments(excelUrl)}</>;
}
