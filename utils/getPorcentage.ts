

// interface IcalcularPorcentaje {
//     amount: number;
//     porcentage: number;
// }


export const calcularPorcentaje = (amount: number, porcentage: number) => {
    const result = (amount * porcentage) / 100;
    return result;
};