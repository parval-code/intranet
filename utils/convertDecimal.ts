


export const ConvertDecimal = (convert: string | number): number | string => {
    const results = String(convert).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return results;
};
