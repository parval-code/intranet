

export const OrderDate = (data: any[]): any[] => {
    const listOrder = data.slice().sort((a: any, b: any) => {
        const dateA = new Date(a.Fechavenc.split('/').reverse().join('/'));
        const dateB = new Date(b.Fechavenc.split('/').reverse().join('/'));
        return dateA.getTime() - dateB.getTime();
    });

    return listOrder;
}