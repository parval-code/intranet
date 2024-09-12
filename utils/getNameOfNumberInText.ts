function Unidades(num: number): string {
    switch (num) {
        case 1: return "UN";
        case 2: return "DOS";
        case 3: return "TRES";
        case 4: return "CUATRO";
        case 5: return "CINCO";
        case 6: return "SEIS";
        case 7: return "SIETE";
        case 8: return "OCHO";
        case 9: return "NUEVE";
    }
    return "";
}

function Decenas(num: number): any {
    const decena = Math.floor(num / 10);
    const unidad = num - decena * 10;

    switch (decena) {
        case 1:
            switch (unidad) {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                default: return "DIECI" + Unidades(unidad);
            }
        case 2:
            switch (unidad) {
                case 0: return "VEINTE";
                default: return "VEINTI" + Unidades(unidad);
            }
        case 3: return DecenasY("TREINTA", unidad);
        case 4: return DecenasY("CUARENTA", unidad);
        case 5: return DecenasY("CINCUENTA", unidad);
        case 6: return DecenasY("SESENTA", unidad);
        case 7: return DecenasY("SETENTA", unidad);
        case 8: return DecenasY("OCHENTA", unidad);
        case 9: return DecenasY("NOVENTA", unidad);
        case 0: return Unidades(unidad);
    }
}

function DecenasY(strSin: string, numUnidades: number): string {
    if (numUnidades > 0) {
        return strSin + " y " + Unidades(numUnidades);
    }
    return strSin;
}

function Centenas(num: number): string {
    const centenas = Math.floor(num / 100);
    const decenas = num - centenas * 100;

    switch (centenas) {
        case 1:
            if (decenas > 0) {
                return "CIENTO " + Decenas(decenas);
            }
            return "CIEN";
        case 2: return "DOSCIENTOS " + Decenas(decenas);
        case 3: return "TRESCIENTOS " + Decenas(decenas);
        case 4: return "CUATROCIENTOS " + Decenas(decenas);
        case 5: return "QUINIENTOS " + Decenas(decenas);
        case 6: return "SEISCIENTOS " + Decenas(decenas);
        case 7: return "SETECIENTOS " + Decenas(decenas);
        case 8: return "OCHOCIENTOS " + Decenas(decenas);
        case 9: return "NOVECIENTOS " + Decenas(decenas);
    }
    return Decenas(decenas);
}

function Seccion(num: number, divisor: number, strSingular: string, strPlural: string): string {
    const cientos = Math.floor(num / divisor);
    const resto = num - cientos * divisor;
    let letras = "";

    if (cientos > 0) {
        if (cientos > 1) {
            letras = Centenas(cientos) + " " + strPlural;
        } else {
            letras = strSingular;
        }
    }

    if (resto > 0) {
        letras += "";
    }

    return letras;
}

function Miles(num: number): string {
    const divisor = 1000;
    const cientos = Math.floor(num / divisor);
    const resto = num - cientos * divisor;
    const strMiles = Seccion(num, divisor, "MIL", "MIL");
    const strCentenas = Centenas(resto);

    if (strMiles === "") {
        return strCentenas;
    }

    return strMiles + " " + strCentenas;
}

function Millones(num: number): string {
    const divisor = 1000000;
    const cientos = Math.floor(num / divisor);
    const resto = num - cientos * divisor;
    const strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
    const strMiles = Miles(resto);

    if (strMillones === "") {
        return strMiles;
    }

    return strMillones + " " + strMiles;
}

export default function ConvertNumberToText(num: number): string {
    const data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (Math.round(num * 100) - Math.floor(num) * 100),
        letrasCentavos: "",
        letrasMonedaCentavoPlural: "CENTAVOS",
        letrasMonedaCentavoSingular: "CENTAVO"
    };

    if (data.centavos > 0) {
        data.letrasCentavos = "CON " + (() => {
            if (data.centavos === 1) {
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
            } else {
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
            }
        })();
    }

    if (data.enteros === 0) {
        return "CERO " + " " + data.letrasCentavos;
    } else if (data.enteros === 1) {
        return Millones(data.enteros) + " " + " " + data.letrasCentavos;
    } else {
        return Millones(data.enteros) + " " + " " + data.letrasCentavos;
    }
}