import { BlobServiceClient } from '@azure/storage-blob';
import type { NextApiRequest, NextApiResponse } from 'next';

const AZURE_BLOB_STORAGE_URL = 'https://intranet00.blob.core.windows.net';
const SAS_TOKEN = 'sp=racwdli&st=2024-01-09T14:50:56Z&se=2030-01-01T22:50:56Z&spr=https&sv=2022-11-02&sr=c&sig=qJ4b8SBK2tbrYs%2FqiredY7upvK1lWVLF3nN0VdGaEfE%3D';

// Función para extraer la ruta del archivo sin el SAS Token
function extractFilePath(url: string): string {
  const urlObj = new URL(url);
  const relativePath = urlObj.pathname.replace('/intranet/', ''); // Eliminar el prefijo "/intranet/"
  return decodeURIComponent(relativePath); // Decodificar para eliminar caracteres como %20
}

const removeAzureBlobStorage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método no permitido
  }

  try {
    const { filePath } = req.body;

    const blobServiceClient = new BlobServiceClient(`${AZURE_BLOB_STORAGE_URL}?${SAS_TOKEN}`);
    const containerClient = blobServiceClient.getContainerClient('intranet'); // El contenedor es "intranet"

    // Extraer la ruta del archivo sin el SAS token
    const relativePath = extractFilePath(filePath);
    console.log(`Intentando eliminar el archivo en la ruta: ${relativePath}`);

    // Obtener el cliente del blob usando la ruta relativa
    const blockBlobClient = containerClient.getBlockBlobClient(relativePath);

    // Intentar eliminar el blob
    const deleteResponse = await blockBlobClient.deleteIfExists();

    if (deleteResponse.succeeded) {
      console.log(`Archivo eliminado: ${relativePath}`);
      return res.status(200).json({ success: true, message: `Archivo eliminado: ${relativePath}` });
    } else {
      console.log(`El archivo no existe: ${relativePath}`);
      return res.status(404).json({ success: false, message: `El archivo no existe: ${relativePath}` });
    }
  } catch (err: any) {
    console.error("Error eliminando el archivo:", err.message);
    return res.status(500).json({ success: false, message: `Error eliminando el archivo: ${err.message}` });
  }
}

export default removeAzureBlobStorage;
