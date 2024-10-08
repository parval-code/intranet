import React from 'react';

interface CircularChartProps {
  progress: number;        // Porcentaje de progreso (0 a 100)
  size?: number;           // Tamaño del gráfico (opcional)
  strokeWidth?: number;    // Ancho de la barra (opcional)
  label?: string;          // Texto debajo del gráfico
}

const CircularChart: React.FC<CircularChartProps> = ({
  progress,
  size = 100,
  strokeWidth = 10,
  label = 'Titulo chart', // Valor por defecto
}) => {
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <div className='w-full md:w-[300px] border-solid border-[1px] border-gray-200 p-4 rounded-lg flex justify-between'>
        <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
        >
        <svg
            className="transform -rotate-90"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
        >
            {/* Círculo de fondo */}
            <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
            stroke="currentColor"
            />

            {/* Círculo de progreso */}
            <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-parvalColor"
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            // strokeLinecap="round"
            />
        </svg>

        {/* Texto en el centro */}
        <span className="absolute text-[0.9rem] font-medium">
            {progress}%
        </span>
        </div>

        {/* label Texto dinámico */}
        <p className='text-[0.8rem]'>{label}</p>
    </div>
  );
};

export default CircularChart;
