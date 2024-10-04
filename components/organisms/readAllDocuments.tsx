import React from 'react';
import ModalFullComponent from '@/components/organisms/modalFullComponent';
import { isEmpty } from 'lodash';

interface ReadAllDocumentsProps {
  open: boolean;
  close: any;
  url: string;
}

export const ExcelViewer = ({ excelUrl }: { excelUrl: string }) => {
  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(excelUrl)}&embedded=true`;

  return (
    <iframe
      src={googleViewerUrl}
      style={{ width: '100%', height: '100%' }}
      title="Excel File Viewer"
    />
  );
};

export const DocxViewer = ({ docxUrl }: { docxUrl: string }) => {
  const oneDriveViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(docxUrl)}`;

  return (
    <iframe
      src={oneDriveViewerUrl}
      style={{ width: '100%', height: '100%'}}
      title="DOCX File Viewer"
    />
  );
};

export const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  return (
    <iframe
      src={googleViewerUrl}
      style={{ width: '100%', height: '100%' }}
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
        style={{ maxWidth: '100%', height: '100%' }}
      />
    </div>
  );
};

const ReadAllDocumentsComponents = (props: ReadAllDocumentsProps) => {

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

  return (
    <>
        <ModalFullComponent
              isOpen={props.open}
              onClose={props.close}
          >
            <>
                { props.url ? TypeDocuments(props.url) : null }
            </>
          </ModalFullComponent>
    </>
  );
};

export default ReadAllDocumentsComponents;
