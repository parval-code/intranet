import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import RUOTES_API from '../../routes_apis';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const headers = {
                Authorization: 'Bearer Lw$547DrBpUi',
            };
            const response = await axios.get(`${RUOTES_API.URL_RATE_YIELD}/list-all-complaints`, { headers }).then((res: any) => {
                return res.data;
            });
            res.status(200).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los datos de la API' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
};
