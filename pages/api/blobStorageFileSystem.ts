import type { NextApiRequest, NextApiResponse } from 'next';
import { BlobServiceClient } from '@azure/storage-blob';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

const azureBlobStorage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { fileType, containerRoute, fileName }: any = req.query;
  const { base64Image } = req.body;
  // console.log(fileType);
  const blobStorageUrl = 'https://intranet00.blob.core.windows.net';
  const token = 'sp=racwdli&st=2024-01-09T14:50:56Z&se=2030-01-01T22:50:56Z&spr=https&sv=2022-11-02&sr=c&sig=qJ4b8SBK2tbrYs%2FqiredY7upvK1lWVLF3nN0VdGaEfE%3D';
 
  // Utiliza containerRoute como la ruta relativa dentro del contenedor, asegurándote de que no contenga intranet/SistemaDeArchivos
  let cleanedContainerRoute = containerRoute.replace(/^\//, '').replace(/\/$/, ''); // Limpiar barras iniciales y finales


  const sasURL = `${blobStorageUrl}/intranet/SistemaDeArchivos?${token}`; 
  const blobServiceClient = new BlobServiceClient(sasURL);

  const containerClient = blobServiceClient.getContainerClient('');

  // Mapeo de MIME types a extensiones
  const mimeToExtension: { [key: string]: string } = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    // Agrega más mapeos según tus necesidades
  };

  const typeImage: string = mimeToExtension[fileType] || 'bin';
  const modifyFileName = fileName.replace(/ /g, "_");
  const blobName = `${cleanedContainerRoute}/${modifyFileName}-${Date.now()}.${typeImage.trim()}`;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    const imageBuffer: any = Buffer.from(base64Image, 'base64');
    const contentType = `image/${typeImage}`;
    const options: any = { blobHTTPHeaders: { blobContentType: contentType } };

    // Subir el archivo al blob
    await blockBlobClient.uploadData(imageBuffer, options);

    // Construir la URL del archivo correctamente
    const blobURL = `${blobStorageUrl}/intranet/SistemaDeArchivos/${blobName}?${token}`;

    res.status(200).json({ 
        success: true, 
        urlImage: blobURL, 
        message: "Subida exitosamente." 
    });
  } catch (error: any) {
    console.error("Error al subir archivo: ", error);
    res.status(500).json({ success: false, message: "Error al subir la imagen." });
  }
};


export default azureBlobStorage;