import { NextApiRequest, NextApiResponse } from 'next';
import { get, isEmpty } from 'lodash';
import { postAll } from '../../utils/methods';

const url: string = 'http://onlineqa.parval.com.do:8081/pview/PViewISAPI.dll/la/rest/TView';

const getDateHappinness = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try { 

            const paramsDateHappiness = {
                Json: true,
                Param: {
                    "Cotitulo": "000001",
                    "Desde": `${req.body.Desde}`
                }
            }

            const dateHappinness = await postAll(`${url}/WDame_DiasFestivos`, paramsDateHappiness)
            .then((res: any) => {
                return get(res.data.CadJson, 'Festivo', []);
            });

            res.status(200).json(isEmpty(dateHappinness) ? [] : dateHappinness);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los datos de la API' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}

export default getDateHappinness;