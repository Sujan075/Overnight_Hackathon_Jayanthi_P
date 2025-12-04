import { AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { FraudAlert } from '@/types/fraud';
import { formatDistanceToNow } from 'date-fns';

interface AlertCardProps {
  alert: FraudAlert;
  onResolve?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export function AlertCard({ alert, onResolve, onDismiss }: AlertCardProps) {
  const severityConfig = {
    low: { variant: 'info' as const, icon: Clock, cardVariant: 'default' as const },
    medium: { variant: 'warning' as const, icon: AlertTriangle, cardVariant: 'warning' as const },
    high: { variant: 'danger' as const, icon: AlertTriangle, cardVariant: 'danger' as const },
    critical: { variant: 'risk' as const, icon: XCircle, cardVariant: 'danger' as const },
  };

  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <Card
      variant={config.cardVariant}
      className={cn(
        'transition-all',
        alert.severity === 'critical' && 'animate-pulse',
        alert.resolved && 'opacity-60'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'rounded-lg p-2',
              alert.severity === 'critical'
                ? 'bg-destructive/20'
                : alert.severity === 'high'
                ? 'bg-destructive/10'
                : alert.severity === 'medium'
                ? 'bg-warning/20'
                : 'bg-info/20'
            )}
          >
            <Icon
              className={cn(
                'h-5 w-5',
                alert.severity === 'critical' || alert.severity === 'high'
                  ? 'text-destructive'
                  : alert.severity === 'medium'
                  ? 'text-warning'
                  : 'text-info'
              )}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold truncate">{alert.message}</h4>
              <Badge variant={config.variant} className="shrink-0">
                {alert.severity.toUpperCase()}
              </Badge>
              {alert.resolved && (
                <Badge variant="success" className="shrink-0">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Resolved
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{alert.description}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
              </span>
              {!alert.resolved && (
                <div className="flex gap-2">
                  <Button size="sm" variant="glow" onClick={() => onResolve?.(alert.id)}>
                    Mark Resolved
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onDismiss?.(alert.id)}>
                    Dismiss
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
