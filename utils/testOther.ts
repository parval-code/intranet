const Unidades = ['Cero o nada','Uno','Dos','Tres','Cuatro','Cinco','Seis','Siete','Ocho','Nueve'];
const Nums10_20 = ['Diez','Once','Doce','Trece','Catorce','Quince','Dieciseis','Diecisiete','Dieciocho','Diecinueve','Veinte'];
const Decenas=['','Dieci','Veinti','Treinta','Cuarenta','Cincuenta','Sesenta','Setenta','Ochenta','Noventa'];
const Centenas = ['','Ciento','Doscientos','Trescientos','Cuatrocientos','Quinientos','Seiscientos','Setecientos','Ochocientos','Novecientos'];

const ConvertNumbers = (NumInt: number)=>{
    let unidad = 0;
    let decena = 0;
    let centena = 0;
    let NumConvert: any = '';

    if (NumInt >= 0 && NumInt <= 99) {
        decena = Number.parseInt(NumInt.toString().substr(0,1));
        unidad = Number.parseInt(NumInt.toString().substr(1));
        if (isNaN(unidad)) {
            NumConvert  = `${Unidades[decena]}`;
        }else if (decena == 1 && unidad >= 0) {
            NumConvert = `${Nums10_20[unidad]}`;
        }else if (NumInt == 20) {
            NumConvert = 'Veinte';
        }else if (unidad == 0) {
            NumConvert = `${Decenas[decena]}`;
        }else{
            NumConvert = `${Decenas[decena]} y ${Unidades[unidad]}`;
        }
    }
    else if(NumInt == 100){
        NumConvert = 'Cien';
    }
    else if (NumInt >= 101 && NumInt <= 999) {
        centena = Number.parseInt(NumInt.toString().substr(0,1));
        decena = Number.parseInt(NumInt.toString().substr(1,1));
        unidad = Number.parseInt(NumInt.toString().substr(2));
        if (decena == 0) {
            NumConvert = `${Centenas[centena]} ${Unidades[unidad]}`;
        }else if (decena == 1) {
            NumConvert = `${Centenas[centena]} ${Nums10_20[unidad]}`;
        }else if (NumInt == 120) {
            NumConvert = 'Ciento Veinte';
        }else if (unidad == 0) {
            NumConvert = `${Centenas[centena]} ${Decenas[decena]}`;
        }else{
            NumConvert = `${Centenas[centena]} ${Decenas[decena]} y ${Unidades[unidad]}`;
        }
    }
    else if(NumInt == 1000){
        NumConvert = 'Mil';
    }
    else{
        NumConvert = {error: true, 
        message: 'Ese numero esta por encima de 1000 o lo que digitaste no es un numero, por lo que no es posible traducir!'};
    }
    return NumConvert;
}

export default ConvertNumbers;
