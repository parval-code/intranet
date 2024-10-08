interface ProgresBarProps {
  progressValue: number;
}

const ProgresBar: React.FC<ProgresBarProps> = ({ progressValue }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-parvalColor h-2 rounded-full"
        style={{ width: `${progressValue}%` }}
      ></div>
    </div>
  );
};

export default ProgresBar;
