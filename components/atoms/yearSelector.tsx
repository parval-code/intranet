import React, { useState } from 'react';

interface IYearSelector {
    year: string | undefined;
    setYear: any;
    maxYear?: number;
}

export default function YearSelector(props: IYearSelector) {
  const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: props.maxYear ? props.maxYear : 10 }, (_, index) => (currentYear - index).toString());

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setYear(event.target.value);
  };

  return (
    <div>

      <select
        value={selectedYear}
        onChange={handleYearChange}
        className="block w-full px-3 py-2 h-[60px] text-sm border-gray-300 rounded-md focus:ring focus:border-blue-300"
      >
        <option value="" disabled>
          Selecciona un año
        </option>
        {
            years.map((year) => (
                <>
                    <option key={year} value={year}>
                        {year}
                    </option>
                </>
            ))
        }
      </select>
      {props.year && <p className="mt-2 text-sm text-gray-500">Año seleccionado: {props.year}</p>}
    </div>
  );
}
