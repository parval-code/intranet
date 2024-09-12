import { NextApiRequest, NextApiResponse } from 'next';
import { set } from 'lodash';
import { postAll } from '../../utils/methods';
import RUOTES_API from '../../routes_apis';

const getListIDMRif = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            let info: {} = {
                Json: true,
            };
            if (req.body) {
                set(info, 'Param', req.body);
            }
            const response = await postAll(`http://179.51.66.30:8082/pview/PViewISAPI.dll/la/rest/TView/WDame_IDMRif`, info).then((res: any) => {
                return res.data.CadJson;
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

export default getListIDMRif;
