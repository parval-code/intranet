// pages/upload.js

import { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { get } from 'lodash';

const UploadImage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('Selecciona un archivo antes de cargar');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const reader: any = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];
        console.log(base64Image, 'base64Image')
        await axios.post(`/api/azureBlobStorage?type=${get(file, 'type', '')}`, {base64Image});
      };

      console.log('Imagen cargada con éxito');
    } catch (error: any) {
      console.error('Error al cargar la imagen:', error.message);
    }
  };

  return (
    <div>
      <h1>Subir Imagen</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Cargar Imagen</button>
    </div>
  );
};

export default UploadImage;
