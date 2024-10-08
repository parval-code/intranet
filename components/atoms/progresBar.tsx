interface ProgresBarProps {
  progressValue: number;
}

const ProgresBar: React.FC<ProgresBarProps> = ({ progressValue }) => {
  return (
    <div className="flex items-center">
      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-parvalColor h-2 rounded-full"
          style={{ width: `${progressValue}%` }}
        ></div>
      </div>
      {/* Porcentaje al lado de la barra */}
      <span className="ml-2 text-sm text-gray-700">{progressValue}%</span>
    </div>
  );
};

export default ProgresBar;
