import { NextApiRequest, NextApiResponse } from 'next';
import { set } from 'lodash';
import { postAll } from '../../utils/methods';

const getDateAvaliable = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            let info: {} = {
                Json: true,
            };
            if (req.body) {
                set(info, 'Param', req.body);
            }
            const response = await postAll(`http://190.166.105.26:8081/pview/PviewISAPI.dll/la/rest/TView/WDame_Precios`, info).then((res: any) => {
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

export default getDateAvaliable;
