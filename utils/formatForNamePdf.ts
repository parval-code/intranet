
import { isEmpty } from 'lodash';

function capitalizeFirstLetter(input: string): string {

    return input.length > 1 ? input.charAt(0).toUpperCase() + input.slice(1) : input;
}

export const FormatForNamePdf = (name: string): string =>  {

    let nameFormat: string = '';
    let nameFormatLowerCase: string = name.toLowerCase();

    const namePosition = nameFormatLowerCase.split(' ');
    if (!isEmpty(namePosition)) {
        namePosition.map((item: string, key: number) => nameFormat += (key + 1) === namePosition.length ? `${capitalizeFirstLetter(item)}` : `${capitalizeFirstLetter(item)} `);
    }

    return nameFormat;
}