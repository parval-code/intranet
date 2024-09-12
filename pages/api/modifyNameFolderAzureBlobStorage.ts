import { BlobServiceClient } from '@azure/storage-blob';
import type { NextApiRequest, NextApiResponse } from 'next';

const AZURE_BLOB_STORAGE_URL = 'https://intranet00.blob.core.windows.net/intranet/SistemaDeArchivos';
const SAS_TOKEN = 'sp=racwdli&st=2024-01-09T14:50:56Z&se=2030-01-01T22:50:56Z&spr=https&sv=2022-11-02&sr=c&sig=qJ4b8SBK2tbrYs%2FqiredY7upvK1lWVLF3nN0VdGaEfE%3D';

const modifyNameFolderAzureBlobStorage = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { filePath, newFolderPath } = req.body;

        // Crear el cliente de servicio de blobs usando la URL SAS
        const blobServiceClient = new BlobServiceClient(`${AZURE_BLOB_STORAGE_URL}?${SAS_TOKEN}`);

        // Obtener el cliente del contenedor
        const containerClient = blobServiceClient.getContainerClient('');

        // Obtener el cliente del blob original
        const blockBlobClientOriginal = containerClient.getBlockBlobClient(filePath);

        // Definir la nueva ruta del blob con el nombre actualizado
        const newFilePath = filePath.replace(/Planes/g, newFolderPath); // Cambia todas las ocurrencias de 'Planes' por la nueva carpeta/nombre

        // Obtener el cliente del nuevo blob
        const blockBlobClientNew = containerClient.getBlockBlobClient(newFilePath);

        // Copiar el blob original a la nueva ubicación
        await blockBlobClientNew.beginCopyFromURL(blockBlobClientOriginal.url);

        // Esperar a que la copia se complete
        let copyStatus = (await blockBlobClientNew.getProperties()).copyStatus;
        while (copyStatus === 'pending') {
            await new Promise((resolve) => setTimeout(resolve, 500)); // Esperar 500ms
            copyStatus = (await blockBlobClientNew.getProperties()).copyStatus;
        }

        if (copyStatus === 'success') {
            // Eliminar el blob original
            await blockBlobClientOriginal.deleteIfExists();
            console.log(`Blob renombrado exitosamente de ${filePath} a ${newFilePath}`);
            res.status(200).json({ success: true, message: `Blob renombrado exitosamente a ${newFilePath}` });
        } else {
            console.error('Error durante la copia del blob:', copyStatus);
            res.status(500).json({ success: false, message: `Error durante la copia del blob: ${copyStatus}` });
        }
    } catch (err: any) {
        console.error("Error renombrando el blob:", err.message);
        res.status(500).json({ success: false, message: `Error renombrando el blob: ${err.message}` });
    }
}

export default modifyNameFolderAzureBlobStorage;
