interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  className?: string;
  color?: 'blue' | 'yellow' | 'red' | 'green';
}

export default function ProgressBar({ progress, showPercentage = true, className = '', color = 'blue' }: ProgressBarProps) {
  const colorClasses = {
    blue: 'bg-blue-600',
    yellow: 'bg-yellow-500',
    red: 'bg-red-600',
    green: 'bg-green-600'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${colorClasses[color]} h-2.5 rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-gray-600 mt-1 text-right">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
} 