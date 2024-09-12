import { BlobServiceClient } from '@azure/storage-blob';
import type { NextApiRequest, NextApiResponse } from 'next';

const AZURE_BLOB_STORAGE_URL = 'https://intranet00.blob.core.windows.net/intranet/SistemaDeArchivos';
const SAS_TOKEN = 'sp=racwdli&st=2024-01-09T14:50:56Z&se=2030-01-01T22:50:56Z&spr=https&sv=2022-11-02&sr=c&sig=qJ4b8SBK2tbrYs%2FqiredY7upvK1lWVLF3nN0VdGaEfE%3D';

function extractFilePath(url: string): string {
  const urlObj = new URL(url);

  const relativePath = urlObj.pathname.replace('/intranet/SistemaDeArchivos/', '');

  return relativePath;
}

const removeazureBlobStorage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { filePath } = req.body;

    const blobServiceClient = new BlobServiceClient(`${AZURE_BLOB_STORAGE_URL}?${SAS_TOKEN}`);

    const containerClient = blobServiceClient.getContainerClient('');

    // Obtener el cliente del blob (usando el filePath relativo dentro del contenedor)
    const blockBlobClient = containerClient.getBlockBlobClient(extractFilePath(filePath));

    // Eliminar el blob
    const deleteResponse = await blockBlobClient.deleteIfExists();

    if (deleteResponse.succeeded) {
      console.log(`Archivo eliminado: ${filePath}`);
      return res.status(200).json({ success: true, message: `Archivo eliminado: ${filePath}` });
    } else {
      console.log(`El archivo no existe: ${filePath}`);
      return res.status(404).json({ success: false, message: `El archivo no existe: ${filePath}` });
    }
  } catch (err: any) {
    console.error("Error eliminando el archivo:", err.message);
    return res.status(500).json({ success: false, message: `Error eliminando el archivo: ${err.message}` });
  }
}

export default removeazureBlobStorage;
