import { useDispatchHappinnessDays } from "./StoreProvider";
import { TypesHappinnessDays } from './HappinnessDaysTypes';
import moment from 'moment';
import { postAll } from "@/utils/methods";
import { isEmpty } from 'lodash';

const getDateHappinness = async (body: {}) => {
    return await postAll('/api/getDateHappinness',body)
        .then((res: any) => {
        return res.data;
    });
}  

export function useHappinnessDays() {
    const dispatch = useDispatchHappinnessDays();
    return {
        async getAllHappinnessDays() {
            let happinnessDays: any[] = [];
            try {
                const date = moment(new Date());
                const happinnessDay = [date.year(), date.year() + 1];
                const happyDate = [];

                for(let x: number = 0; happinnessDay.length > x; x++) {
                    const data = await getDateHappinness({ "Desde": happinnessDay[x] });
                    if(!isEmpty(data)) {
                        happyDate.push(...data);
                    }
                }
                if(!isEmpty(happyDate)) {
                    happinnessDays = happyDate;
                }
            } catch(e) {
                happinnessDays = [];
                console.log(e);
            }

            dispatch({
                type: TypesHappinnessDays.GET_HAPPINNESS_DAYS,
                payload: {
                    happinnessDays,
                },
            });
        },
    }
}
