import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function StatsCard({ title, value, change, icon: Icon, variant = 'default' }: StatsCardProps) {
  const variantStyles = {
    default: 'border-border',
    success: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5',
    danger: 'border-destructive/30 bg-destructive/5',
  };

  const iconStyles = {
    default: 'bg-primary/20 text-primary',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    danger: 'bg-destructive/20 text-destructive',
  };

  return (
    <Card className={cn('transition-all hover:shadow-glow-sm', variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
            {change && (
              <p
                className={cn(
                  'mt-1 text-sm',
                  change.type === 'increase' ? 'text-success' : 'text-destructive'
                )}
              >
                {change.type === 'increase' ? '↑' : '↓'} {Math.abs(change.value)}%{' '}
                <span className="text-muted-foreground">vs last week</span>
              </p>
            )}
          </div>
          <div className={cn('rounded-lg p-3', iconStyles[variant])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
