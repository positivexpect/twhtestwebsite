interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  className?: string;
}

export default function ProgressBar({ progress, showPercentage = true, className = '' }: ProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
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