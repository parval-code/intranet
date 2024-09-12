import type { NextApiRequest, NextApiResponse } from 'next';
import { BlobServiceClient } from '@azure/storage-blob';

const azureBlobStorage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { type }: any = req.query;
  const { base64Image } = req.body;
  console.log(base64Image);
  const blobStorageUrl = 'https://intranet00.blob.core.windows.net';
  const token = 'sp=racwdli&st=2024-01-09T14:50:56Z&se=2030-01-01T22:50:56Z&spr=https&sv=2022-11-02&sr=c&sig=qJ4b8SBK2tbrYs%2FqiredY7upvK1lWVLF3nN0VdGaEfE%3D';
  const containerName = 'intranet';
  
  // Crear el cliente del servicio de blobs utilizando la URL base y el token
  const sasURL = `${blobStorageUrl}/${containerName}?${token}`;
  const blobServiceClient = new BlobServiceClient(sasURL);

  // Obtener una referencia al contenedor
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const typeImage: string = type.split('/')[1]; 
  const blobName = `${Date.now()}.${typeImage.trim()}`;

  // Obtener una referencia al blob
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
  // Subir el archivo al blob
  try {
    const imageBuffer: any = Buffer.from(base64Image, 'base64');

    // Specify content type for the blob
    const contentType = `image/${typeImage}`;
    const options: any = { blobHTTPHeaders: { blobContentType: contentType } };

    const uploadResp = await blockBlobClient.uploadData(imageBuffer, options).then((_uploadResp) => {
        const blobURL = `${blobStorageUrl}/${containerName}/${containerName}/${blobName}?${token}`;
        return blobURL
    });

    res.status(200).json({ 
        success: true, 
        urlImage: uploadResp, 
        message: "Imagen subida exitosamente." 
    });
  } catch (error: any) {
    console.error("Error al subir la imagen: ", error);
    res.status(500).json({ success: false, message: "Error al subir la imagen." });
  }
};

export default azureBlobStorage;