import { cn } from '@/lib/utils';
import type { RiskLevel } from '@/types/fraud';

interface RiskGaugeProps {
  score: number;
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskGauge({ score, level, size = 'md' }: RiskGaugeProps) {
  const sizeStyles = {
    sm: { width: 100, strokeWidth: 8, fontSize: 'text-lg' },
    md: { width: 160, strokeWidth: 10, fontSize: 'text-3xl' },
    lg: { width: 200, strokeWidth: 12, fontSize: 'text-4xl' },
  };

  const { width, strokeWidth, fontSize } = sizeStyles[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = radius * Math.PI;
  const progress = (score / 100) * circumference;

  const levelColors = {
    low: 'stroke-success',
    medium: 'stroke-warning',
    high: 'stroke-destructive',
    critical: 'stroke-destructive',
  };

  const levelGlow = {
    low: 'drop-shadow-[0_0_8px_hsl(var(--success)/0.5)]',
    medium: 'drop-shadow-[0_0_8px_hsl(var(--warning)/0.5)]',
    high: 'drop-shadow-[0_0_8px_hsl(var(--destructive)/0.5)]',
    critical: 'drop-shadow-[0_0_12px_hsl(var(--destructive)/0.7)]',
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={width}
        height={width / 2 + strokeWidth}
        className={cn('transform -rotate-90', levelGlow[level])}
      >
        {/* Background arc */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap="round"
          className="opacity-30"
        />
        {/* Progress arc */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          className={cn(levelColors[level], 'transition-all duration-1000')}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
        <span className={cn('font-bold tabular-nums', fontSize)}>{score}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{level}</span>
      </div>
    </div>
  );
}
