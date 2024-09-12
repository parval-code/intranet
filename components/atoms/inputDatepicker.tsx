import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos de react-datepicker

interface DatePickerInputProps {
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
  }

  const inputDatepicker: React.FC<DatePickerInputProps> = ({ selectedDate, onChange }) => {
    return (
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy-MM-dd" // Formato de fecha deseado
        className="border border-gray-300 text-sm h-[50px] rounded-md p-2 w-full"
        placeholderText="Selecciona una fecha"
      />
    );
  };
  
  export default inputDatepicker;