import axios from 'axios';
import ROUTES_PUBLIC from '@/routes_apis';

const getReportSIMV = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
        const apiUrl = `${ROUTES_PUBLIC.SEND_PDF_ROUTE}/${req.query.token}/${req.query.formatoDeArchivo}/${req.query.tipodeEnvio}`;
        const response = await axios.post(apiUrl, {
          file: req.body.file
        }, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=${form.getBoundary()}',
            'Access-Control-Allow-Credentials': 'true',
          },
        });

        // Maneja la respuesta del servicio según sea necesario
        // console.log(response.data);

        // Devuelve la respuesta al cliente
        res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error en la solicitud:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}

export default getReportSIMV;