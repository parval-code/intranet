import moment from 'moment';
import { isEmpty } from 'lodash';

export const capitalizarPrimeraLetra = (texto: string) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export const lowerCaseTheFirstLetter = (texto: string) => {
    return texto.charAt(0).toLowerCase() + texto.slice(1);
}

export const calcularDiferenciaEnDias = (fechaInicio: string, fechaFin: string): number => {
    const fechaInicioMoment = moment(fechaInicio);
    const fechaFinMoment = moment(fechaFin);
    
    return fechaFinMoment.diff(fechaInicioMoment, 'days');
  };

export const calcularDiferenciaToDays = (fechaInicio: string, fechaFin: string, infoData: any[]): number => {
      let info = new Date(fechaInicio);

      const dataDate: string[] = [];
    
      while (new Date(fechaFin).getTime() >= info.getTime()) {
          info.setDate(info.getDate() + 1);
          if (info.getDay() !== 0 && info.getDay() !== 6) { // Si no es domingo ni sábado
              const formatDate = moment(info).format('DD-MM-YYYY').replace(/-/g, '/');
            
              let verify = [];
              if(!isEmpty(infoData)) {
                  verify = infoData.filter((item: any) => item.Fecha.trim() === formatDate.trim());
              }
              // console.log(verify);
              if(isEmpty(verify)) {
                  dataDate.push(moment(info).format('DD-MM-YYYY'));
              }
          }
      }

      return dataDate.length;
};

export const GetMonthForDate = (date: string): string =>  {

    const [day, month, year] = date.split('/');

    const dateObj = new Date(`${month}-${day}-${year}`);

    const optionOfDate: {} = { month: 'long' };

    return capitalizarPrimeraLetra(dateObj.toLocaleDateString('es-ES', optionOfDate));
}

export const GetFormatDate = (date: string): string =>  {
    const dateComponts = date.split('T');
    const [year, month, day] = dateComponts[0].split('-');

    const dateObj = new Date(`${month}-${day}-${year}`);

    const optionOfDate: {} = { month: 'long' };
    
    return `${day} de ${capitalizarPrimeraLetra(dateObj.toLocaleDateString('es-ES', optionOfDate))}`;
}

export const GetFormatDateAndYear = (date: string): string =>  {
    const dateComponts = date.split('T');
    const [year, month, day] = dateComponts[0].split('-');

    const dateObj = new Date(`${month}-${day}-${year}`);

    const optionOfDate: {} = { month: 'long' };
    
    return `${day} de ${capitalizarPrimeraLetra(dateObj.toLocaleDateString('es-ES', optionOfDate))} del ${year}`;
}

export const GetDateMonthWithText = (date: string): string =>  {

    const [day, month, year] = date.split('/');
    const monthText = GetMonthForDate(date);

    return `${day} de ${lowerCaseTheFirstLetter(monthText)} de ${year}`;
}
